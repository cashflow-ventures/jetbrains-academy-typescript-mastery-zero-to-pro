# Assertion Functions

Custom type guards narrow types inside `if` blocks, but sometimes you want a different pattern:
**assert that a condition is true, and throw if it isn't**. TypeScript supports this with
**assertion functions** — functions whose return type is `asserts param is Type`. After calling
an assertion function, TypeScript narrows the type for all subsequent code, not just inside a
branch.

## Core Concept

An assertion function either throws an error or returns normally. If it returns, TypeScript
treats the assertion as proven and narrows the type:

```typescript
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error(`Expected string, got ${typeof value}`);
    }
}

function processInput(input: unknown): string {
    assertIsString(input);
    // After the assertion, input is narrowed to string
    return input.toUpperCase();
}
```

The key difference from a type guard (`value is string`) is that assertion functions don't
return a boolean — they either throw or succeed. The narrowing applies to everything after
the call, not just inside an `if` block.

## How It Works

### The `asserts` Syntax

There are two forms of assertion signatures:

```typescript
// Form 1: asserts param is Type — narrows to a specific type
function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number" || Number.isNaN(value)) {
        throw new Error("Not a valid number");
    }
}

// Form 2: asserts param — just asserts truthiness (non-null/undefined)
function assertDefined<T>(value: T | null | undefined): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error("Value is null or undefined");
    }
}
```

The second form is especially useful for eliminating `null` and `undefined` from a type.

### Practical Usage

Assertion functions are great for validation at the boundaries of your code — parsing config,
validating API input, or checking preconditions:

```typescript
interface Config {
    port: number;
    host: string;
}

function assertValidConfig(value: unknown): asserts value is Config {
    if (typeof value !== "object" || value === null) {
        throw new Error("Config must be an object");
    }
    if (!("port" in value) || typeof (value as Config).port !== "number") {
        throw new Error("Config must have a numeric port");
    }
    if (!("host" in value) || typeof (value as Config).host !== "string") {
        throw new Error("Config must have a string host");
    }
}

function startServer(rawConfig: unknown): void {
    assertValidConfig(rawConfig);
    // rawConfig is now Config
    console.log(`Starting on ${rawConfig.host}:${rawConfig.port}`);
}
```

### Combining with Generics

Assertion functions work well with generics for reusable validation:

```typescript
function assertDefined<T>(
    value: T | null | undefined,
    name: string
): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(`${name} must be defined`);
    }
}

function processUser(name: string | null, age: number | undefined): string {
    assertDefined(name, "name");
    assertDefined(age, "age");
    // Both are narrowed: name is string, age is number
    return `${name} is ${age} years old`;
}
```

## Common Pitfalls

- **Must throw, never return a value**: If an assertion function returns without throwing,
  TypeScript assumes the assertion passed. If your logic is wrong and you don't throw when
  you should, you'll get incorrect narrowing.
- **Can't be used in expressions**: Unlike type guards (which return `boolean`), assertion
  functions can't be used in `if` conditions or ternaries. They're statements, not expressions.
- **Arrow functions need explicit annotation**: Arrow functions can be assertion functions, but
  you must annotate the type explicitly — TypeScript won't infer assertion signatures.
- **Only narrows after the call**: The narrowing applies to code after the assertion call,
  not inside the function itself.

## Key Takeaways

- Assertion functions use `asserts param is Type` to narrow types after the call.
- They throw on failure instead of returning `false` — there's no `else` branch.
- `asserts value is T` narrows to a specific type; `asserts value` just asserts truthiness.
- They're ideal for validation at boundaries: config parsing, API input, preconditions.
- Combine with generics for reusable `assertDefined<T>()` patterns.

<div class="hint">
Assertion functions are similar to Node.js's `assert()` or testing frameworks' `expect()`.
The difference is that TypeScript's type system understands them and narrows types accordingly.
If you've ever written `if (!x) throw new Error()`, an assertion function is the type-safe
version of that pattern.
</div>
