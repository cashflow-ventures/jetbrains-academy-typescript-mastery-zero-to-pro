# The `using` Keyword

The `using` declaration is the centerpiece of Explicit Resource Management in
TypeScript 5.2. It binds a `Disposable` value to a block scope and guarantees
that `[Symbol.dispose]()` is called when execution leaves that scope — whether
normally or via an exception. Its async counterpart, `await using`, does the
same for `AsyncDisposable` resources.

## Core Concept

A `using` declaration looks like a `const` declaration, but with the `using`
keyword instead. When the enclosing block ends, TypeScript (and the runtime)
automatically calls `[Symbol.dispose]()` on the bound value.

```typescript
function processFile(path: string): string {
    using handle = new FileHandle(path);
    // handle is available here
    const data = handle.read();
    return data;
    // [Symbol.dispose]() is called automatically here
    // even if handle.read() throws
}
```

Compare this with the equivalent `try/finally`:

```typescript
function processFileLegacy(path: string): string {
    const handle = new FileHandle(path);
    try {
        const data = handle.read();
        return data;
    } finally {
        handle.close();
    }
}
```

The `using` version is shorter, flatter, and impossible to get wrong — you
cannot forget the cleanup, and the compiler enforces that the value is
`Disposable`.

## How It Works

The `using` keyword has several important behaviors:

**Scope-based cleanup:** The disposal happens at the end of the enclosing
block — a function body, an `if` block, a `for` loop body, or any `{}`
block.

```typescript
function demo(): void {
    {
        using resource = acquireResource();
        resource.doWork();
    } // [Symbol.dispose]() called here

    console.log("Resource already cleaned up");
}
```

**Multiple resources:** When multiple `using` declarations appear in the same
scope, they are disposed in **reverse** order (LIFO — last in, first out),
just like a stack unwind:

```typescript
function multiResource(): void {
    using a = openResource("A");
    using b = openResource("B");
    using c = openResource("C");
    // work with a, b, c
} // disposes c, then b, then a
```

**`await using` for async disposal:** When the resource implements
`AsyncDisposable`, use `await using` inside an `async` function:

```typescript
async function queryDatabase(): Promise<string[]> {
    await using conn = await connectToDb("postgres://localhost/mydb");
    const rows = await conn.query("SELECT * FROM users");
    return rows;
    // [Symbol.asyncDispose]() is awaited here
}
```

**Error suppression:** If the `try` body throws and `[Symbol.dispose]()` also
throws, both errors are preserved in a `SuppressedError` object. The original
error is accessible via `SuppressedError.error` and the disposal error via
`SuppressedError.suppressed`. This solves the error-masking problem of
`try/finally`.

```typescript
// SuppressedError structure:
// {
//   error: <original error>,
//   suppressed: <disposal error>,
//   message: string
// }
```

## Common Pitfalls

- **Using `using` with a non-Disposable value.** TypeScript will report a
  compile-time error if the value does not have `[Symbol.dispose]()`.
- **Expecting `using` to work like `let`.** A `using` binding is `const` — you
  cannot reassign it.
- **Forgetting `await` in `await using`.** Without `await`, the async disposal
  will not be awaited, leading to unhandled promise rejections.
- **Assuming runtime support.** As of 2024, not all runtimes support `using`
  natively. You may need a polyfill or downlevel compilation. TypeScript
  handles the type checking regardless.

## Key Takeaways

- `using` declares a `Disposable` binding that is automatically cleaned up at
  scope exit.
- `await using` does the same for `AsyncDisposable` in async contexts.
- Multiple `using` declarations dispose in reverse order (LIFO).
- `SuppressedError` preserves both the original and disposal errors.
- The compiler enforces that only `Disposable`/`AsyncDisposable` values can be
  used with `using`/`await using`.

<div class="hint">
The `using` keyword is a declaration, not a statement. It follows the same
scoping rules as `const` — block-scoped, no hoisting, no reassignment. Think
of it as "`const` with automatic cleanup."
</div>

<div class="hint">
If you need to support older runtimes, you can polyfill `Symbol.dispose` and
`Symbol.asyncDispose`. TypeScript will still type-check your code correctly
even if the runtime does not yet support the `using` syntax natively.
</div>
