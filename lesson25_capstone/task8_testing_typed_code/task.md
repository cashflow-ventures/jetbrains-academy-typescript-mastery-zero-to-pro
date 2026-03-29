# Testing Typed Code

Writing TypeScript gives you compile-time confidence that your types are correct — but types
alone don't guarantee your runtime logic is right. A well-tested TypeScript project combines
**runtime tests** (unit and integration) with **compile-time assertions** that verify your
type-level code behaves as expected. This task covers the strategies, patterns, and tools you
need to test typed code thoroughly using Jest and ts-jest.

## Core Concept

Testing TypeScript code operates on two distinct levels:

1. **Runtime testing** — verifying that functions produce correct values when executed.
   This is traditional unit/integration testing with Jest, but with TypeScript-aware tooling.
2. **Compile-time testing** — verifying that your types accept what they should and reject
   what they shouldn't. This uses `@ts-expect-error` directives and type-level assertions
   that fail at compile time rather than at runtime.

Both levels are essential. Runtime tests catch logic bugs; compile-time tests catch type
design bugs. A branded `UserId` type that accidentally accepts raw strings is a type bug
that no `expect()` call will find — you need a compile-time assertion for that.

### The Testing Stack

The standard TypeScript testing stack for this course is:

```typescript
// jest.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
};
```

`ts-jest` compiles your `.ts` test files on the fly, so you write tests in TypeScript with
full type checking. This means a type error in your test file is itself a test failure —
the test won't even compile.

## How It Works

### Unit Testing with Typed Mocks

When testing a service that depends on an interface, you create a **typed mock** that
satisfies the interface contract. TypeScript ensures your mock matches the real shape:

```typescript
interface UserRepository {
    findById(id: string): User | undefined;
    save(user: User): void;
}

// Typed mock — TypeScript enforces the shape
const mockRepo: UserRepository = {
    findById: jest.fn().mockReturnValue({ id: "u1", name: "Alice" }),
    save: jest.fn(),
};

// Now inject the mock into the service under test
const service = new UserService(mockRepo);
const result = service.getUser("u1");

expect(result).toEqual({ id: "u1", name: "Alice" });
expect(mockRepo.findById).toHaveBeenCalledWith("u1");
```

The key advantage over untyped mocks: if `UserRepository` adds a new method, TypeScript
will flag every mock that doesn't implement it. Your tests stay in sync with your interfaces
automatically.

### Partial Mocks with `Partial<T>`

For interfaces with many methods, you often only need to mock the ones your test exercises.
Use `Partial<T>` combined with a type assertion:

```typescript
interface Logger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    debug(msg: string): void;
}

// Only mock what the test needs
const mockLogger = {
    error: jest.fn(),
} as unknown as Logger;

// Better: use a helper that makes partial mocking type-safe
function createMock<T>(partial: Partial<T>): T {
    return partial as T;
}

const logger = createMock<Logger>({ error: jest.fn() });
```

### Interface-Based Mocking (Dependency Injection)

The cleanest testing pattern is **constructor injection with interfaces**. Your service
depends on an interface, not a concrete class, so tests substitute any implementation:

```typescript
interface EmailSender {
    send(to: string, subject: string, body: string): Promise<boolean>;
}

class NotificationService {
    constructor(private readonly emailSender: EmailSender) {}

    async notifyUser(email: string, message: string): Promise<boolean> {
        return this.emailSender.send(email, "Notification", message);
    }
}

// In tests — no real email service needed
const fakeSender: EmailSender = {
    send: jest.fn().mockResolvedValue(true),
};
const service = new NotificationService(fakeSender);
```

This pattern eliminates the need for complex mocking libraries — plain objects that match
the interface are all you need.

### Compile-Time Type Testing

Type-level code (conditional types, mapped types, branded types) needs its own tests.
Since types are erased at runtime, you test them at compile time using two techniques:

**Technique 1: `@ts-expect-error` for negative tests**

```typescript
type UserId = string & { readonly __brand: "UserId" };

function acceptUserId(id: UserId): void {}

// ✅ This should compile — correct usage
const validId = "abc" as UserId;
acceptUserId(validId);

// @ts-expect-error — raw string should NOT be assignable to UserId
acceptUserId("raw-string");
```

If the line after `@ts-expect-error` compiles successfully (meaning the type *does* accept
it), TypeScript reports an error: "Unused '@ts-expect-error' directive." This turns your
negative type test into a compile-time failure — exactly what you want.

**Technique 2: Assignability assertions for positive tests**

```typescript
type IsString<T> = T extends string ? true : false;

// Positive assertion — these lines must compile
const check1: IsString<string> = true;
const check2: IsString<"hello"> = true;

// Negative assertion — these must NOT compile
// @ts-expect-error
const check3: IsString<number> = true;
```

**Technique 3: `Expect` and `Equal` helper types**

For more complex type-level tests, define reusable assertion helpers:

```typescript
type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
        ? true
        : false;

type Expect<T extends true> = T;

// Usage — compile-time test suite
type _test1 = Expect<Equal<ReturnType<typeof add>, number>>;
type _test2 = Expect<Equal<IsString<string>, true>>;
type _test3 = Expect<Equal<IsString<number>, false>>;
```

If any `Equal` check returns `false`, the `Expect` constraint fails and TypeScript reports
a compile error. This pattern is used extensively in the
[type-challenges](https://github.com/type-challenges/type-challenges) community.

### Testing Generic Functions

Generic functions require tests that exercise multiple type instantiations:

```typescript
function identity<T>(value: T): T {
    return value;
}

describe("identity", () => {
    test("preserves string type and value", () => {
        const result: string = identity("hello");
        expect(result).toBe("hello");
    });

    test("preserves number type and value", () => {
        const result: number = identity(42);
        expect(result).toBe(42);
    });

    test("preserves object structure", () => {
        const obj = { name: "Alice" };
        const result: { name: string } = identity(obj);
        expect(result).toBe(obj); // same reference
    });
});
```

Notice the explicit type annotations on `result`. These are compile-time assertions — if
`identity` returned the wrong type, the annotation would cause a compile error before the
test even runs.

### Testing Branded Types

Branded types need both runtime tests (validation logic) and compile-time tests (type
rejection):

```typescript
type Email = string & { readonly __brand: "Email" };

function createEmail(input: string): Email {
    if (!input.includes("@")) throw new Error("Invalid email");
    return input as Email;
}

// Runtime tests — validation logic
describe("createEmail", () => {
    test("accepts valid email", () => {
        expect(() => createEmail("a@b.com")).not.toThrow();
    });

    test("rejects invalid email", () => {
        expect(() => createEmail("not-an-email")).toThrow("Invalid email");
    });
});

// Compile-time tests — type safety (in a separate .ts file or at module level)
const validEmail: Email = createEmail("a@b.com");
// @ts-expect-error — raw string must not be assignable to Email
const badEmail: Email = "raw@string.com";
```

## Common Pitfalls

- **Mocking too much.** If every dependency is mocked, your test verifies the mock wiring,
  not the actual behavior. Prefer integration tests for service-to-service interactions and
  reserve mocks for external I/O (databases, HTTP, file system).

- **Forgetting `@ts-expect-error` tests.** Runtime tests alone can't verify that your
  branded types or conditional types reject invalid inputs. Without compile-time assertions,
  a refactor could silently widen a type and no test would catch it.

- **Using `any` in test code.** It's tempting to use `any` to bypass type errors in tests,
  but this defeats the purpose. If your test code uses `any`, it can't catch type regressions.
  Use `unknown` and narrow, or fix the type mismatch properly.

- **Not testing the unhappy path.** TypeScript's type system can model error states
  (`Result<T, E>`, discriminated unions), but you still need runtime tests that verify error
  branches execute correctly.

- **Over-relying on `as` assertions in mocks.** Every `as` cast is a place where you're
  telling TypeScript "trust me." Minimize casts by using interface-based mocking where the
  mock naturally satisfies the type.

## Key Takeaways

- TypeScript testing operates on two levels: runtime (Jest `expect()`) and compile-time
  (`@ts-expect-error`, assignability assertions).
- Typed mocks use interfaces to ensure mocks stay in sync with production code — if the
  interface changes, the mock breaks at compile time.
- The `createMock<T>(partial)` pattern lets you mock only the methods a test needs while
  keeping full type safety.
- Dependency injection via constructor interfaces is the cleanest path to testable TypeScript
  code — no mocking libraries required.
- Branded types and conditional types need compile-time tests using `@ts-expect-error` and
  `Expect<Equal<...>>` helpers to verify they reject invalid types.
- Generic functions should be tested with multiple type instantiations, using explicit type
  annotations on results as compile-time assertions.

<div class="hint">
The `Equal` type helper uses a clever trick: it compares two types by checking if a
generic function constrained to one type is assignable to a generic function constrained
to the other. This catches subtle differences that `extends` checks miss, like the
difference between `{ a: string } & { b: number }` and `{ a: string; b: number }`.
The pattern originates from the type-challenges community and is now a standard tool
in type-level testing.
</div>

<div class="hint">
When using `ts-jest`, your test files are type-checked during compilation. This means
a type error in a test file causes the test to fail before any `expect()` runs. You
can leverage this by adding explicit type annotations in your test code — they act as
free compile-time assertions on top of your runtime checks.
</div>
