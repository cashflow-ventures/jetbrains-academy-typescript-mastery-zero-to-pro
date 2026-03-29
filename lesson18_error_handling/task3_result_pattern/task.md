# The Result Pattern

Exceptions are invisible in TypeScript's type system — a function signature cannot
express which errors it might throw. The Result pattern solves this by encoding
success and failure directly in the return type, making error handling explicit,
composable, and fully type-safe.

## Core Concept

Instead of throwing exceptions, functions return a discriminated union that is
either a success value or an error value:

```typescript
type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };
```

The caller *must* check the `ok` discriminant before accessing the value or error.
TypeScript's control flow analysis narrows the type automatically:

```typescript
function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return { ok: false, error: "Division by zero" };
    }
    return { ok: true, value: a / b };
}

const result = divide(10, 0);
if (result.ok) {
    console.log(result.value); // TypeScript knows: number
} else {
    console.log(result.error); // TypeScript knows: string
}
```

## How It Works

### Why Avoid Exceptions?

Exceptions have three fundamental problems in TypeScript:

1. **Invisible in types**: `function parse(s: string): User` tells you nothing about
   what errors it might throw. The caller has no way to know without reading the
   implementation.

2. **Unchecked by default**: Forgetting to wrap a call in `try/catch` is not a
   compiler error. The exception propagates silently until it crashes the process.

3. **Non-composable**: Chaining operations that might fail requires nested
   `try/catch` blocks, which quickly becomes unreadable.

The Result pattern fixes all three:

```typescript
// The return type TELLS you this can fail with a string error
function parseAge(input: string): Result<number, string> {
    const n = Number(input);
    if (isNaN(n)) return { ok: false, error: `'${input}' is not a number` };
    if (n < 0) return { ok: false, error: "Age cannot be negative" };
    if (n > 150) return { ok: false, error: "Age seems unrealistic" };
    return { ok: true, value: n };
}
```

### Helper Functions

Creating result objects manually is verbose. Helper functions make it clean:

```typescript
function ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}

// Usage becomes concise
function parseAge(input: string): Result<number, string> {
    const n = Number(input);
    if (isNaN(n)) return err(`'${input}' is not a number`);
    if (n < 0) return err("Age cannot be negative");
    return ok(n);
}
```

### Composing Results with `map` and `flatMap`

The real power of Result comes from composable transformations:

```typescript
function mapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => U
): Result<U, E> {
    if (result.ok) return ok(fn(result.value));
    return result;
}

function flatMapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
): Result<U, E> {
    if (result.ok) return fn(result.value);
    return result;
}
```

`map` transforms the success value. `flatMap` chains operations that themselves
return Results — avoiding nested `if (result.ok)` checks:

```typescript
const result = flatMapResult(
    parseAge("25"),
    (age) => age >= 18 ? ok(age) : err("Must be 18 or older")
);
```

### When to Use Exceptions vs Result

| Use Exceptions | Use Result |
|---------------|------------|
| Truly unexpected failures (out of memory, assertion violations) | Expected, recoverable failures (validation, not found, parse errors) |
| Framework boundaries (Express error middleware) | Business logic and domain operations |
| Third-party library errors you cannot control | Functions where callers need to handle specific error cases |

## Common Pitfalls

- **Overusing Result for everything**: Not every function needs a Result. Use it for
  operations with *expected* failure modes. Unexpected bugs should still throw.
- **Ignoring the error branch**: The whole point is to force handling. If you always
  unwrap with `result.value!`, you have gained nothing.
- **Making error types too broad**: `Result<User, string>` is better than
  `Result<User, Error>`, but `Result<User, ValidationError | NotFoundError>` is best —
  it tells the caller exactly what can go wrong.
- **Mixing Result and exceptions**: Pick one pattern per layer. A function that
  returns `Result` should not also throw.

## Key Takeaways

- The Result pattern encodes success/failure in the return type as a discriminated union.
- `ok()` and `err()` helpers make creating results concise.
- `map` transforms success values; `flatMap` chains fallible operations.
- TypeScript's control flow analysis narrows Result types automatically via the `ok` discriminant.
- Use Result for expected, recoverable errors; use exceptions for truly unexpected failures.
- The next tasks will have you implement and use this pattern hands-on.

<div class="hint">
This pattern is inspired by Rust's `Result<T, E>`, Haskell's `Either a b`, and
Swift's `Result<Success, Failure>`. While TypeScript does not have built-in
pattern matching like these languages, discriminated unions with `if/else` or
`switch` provide the same exhaustive checking capability.
</div>
