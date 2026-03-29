# Error Handling Patterns

Error handling is one of the most important aspects of writing robust software, yet
TypeScript's approach to errors has a surprising gap: the `catch` clause. Unlike
function parameters and return types, caught errors have historically been untyped —
and even today, they default to `unknown`. Understanding how to work with errors
in a type-safe way is essential for building reliable TypeScript applications.

## Core Concept

JavaScript's `try/catch` mechanism is the primary way to handle runtime errors.
TypeScript adds type safety on top, but with an important caveat — the `catch`
clause variable is typed as `unknown` (since TypeScript 4.4 with `useUnknownInCatchVariables`):

```typescript
try {
    JSON.parse("not valid json");
} catch (error) {
    // `error` is `unknown` — you must narrow before using it
    if (error instanceof SyntaxError) {
        console.log(error.message); // Now TS knows it's a SyntaxError
    }
}
```

Before TypeScript 4.4, caught errors were implicitly `any`, which meant you could
access any property without checks — a recipe for runtime crashes.

## How It Works

### Why `catch` Uses `unknown`

In JavaScript, *anything* can be thrown — not just `Error` objects:

```typescript
throw "oops";              // string
throw 42;                  // number
throw { code: "FAIL" };    // plain object
throw new Error("real");   // Error instance
throw undefined;           // even undefined!
```

Because the compiler cannot predict what will be thrown, `unknown` is the only
honest type for a catch variable. You must narrow it before use:

```typescript
try {
    riskyOperation();
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
        console.log(error.stack);
    } else if (typeof error === "string") {
        console.log(`String error: ${error}`);
    } else {
        console.log("Unknown error type", error);
    }
}
```

### Custom Error Classes

JavaScript's built-in `Error` class is generic. In real applications, you want
errors that carry structured information about *what* went wrong:

```typescript
class AppError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly statusCode: number
    ) {
        super(message);
        this.name = "AppError";
        // Fix prototype chain for instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class ValidationError extends AppError {
    constructor(
        message: string,
        public readonly field: string
    ) {
        super(message, "VALIDATION_ERROR", 400);
        this.name = "ValidationError";
    }
}

class NotFoundError extends AppError {
    constructor(resource: string, id: string) {
        super(`${resource} with id '${id}' not found`, "NOT_FOUND", 404);
        this.name = "NotFoundError";
    }
}
```

With custom error classes, you can use `instanceof` to narrow and handle each
error type differently:

```typescript
try {
    processRequest(data);
} catch (error: unknown) {
    if (error instanceof ValidationError) {
        console.log(`Validation failed on field: ${error.field}`);
    } else if (error instanceof NotFoundError) {
        console.log(`Resource missing: ${error.message}`);
    } else if (error instanceof AppError) {
        console.log(`App error [${error.code}]: ${error.message}`);
    } else {
        console.log("Unexpected error", error);
    }
}
```

### The `Object.setPrototypeOf` Fix

When extending `Error` in TypeScript (especially when targeting ES5), the prototype
chain can break, causing `instanceof` checks to fail. The `Object.setPrototypeOf(this, new.target.prototype)`
call in the constructor fixes this. Always include it in custom error classes.

## Common Pitfalls

- **Assuming `catch (e)` is an `Error`**: In strict mode, `e` is `unknown`. Always
  narrow with `instanceof Error` before accessing `.message` or `.stack`.
- **Forgetting `Object.setPrototypeOf`**: Without it, `instanceof` checks on custom
  error subclasses may fail when compiling to ES5.
- **Catching too broadly**: A bare `catch` that swallows all errors hides bugs.
  Always re-throw errors you do not know how to handle.
- **Throwing non-Error values**: Throwing strings or plain objects loses the stack
  trace. Always throw `Error` instances or subclasses.
- **Not setting `this.name`**: The `name` property is used in stack traces. Set it
  to the class name for readable debugging output.

## Key Takeaways

- The `catch` variable is `unknown` in strict TypeScript — always narrow before use.
- Custom error classes let you carry structured data (codes, fields, status codes).
- Use `instanceof` to discriminate between error types in catch blocks.
- Always call `Object.setPrototypeOf(this, new.target.prototype)` in custom error constructors.
- Prefer throwing `Error` subclasses over raw strings or objects.
- In the next tasks, we will explore the Result pattern as an alternative to exceptions.

<div class="hint">
TypeScript does not support Java-style checked exceptions or `throws` clauses in
function signatures. This means the compiler cannot tell you which errors a function
might throw. This limitation is one of the key motivations for the Result pattern,
which encodes errors in the return type instead of relying on exceptions.
</div>
