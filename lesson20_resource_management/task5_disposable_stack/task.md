# DisposableStack and AsyncDisposableStack

When you manage a dynamic number of resources — resources created in a loop,
conditionally acquired, or collected from different sources — individual `using`
declarations are not enough. The `DisposableStack` and `AsyncDisposableStack`
classes let you aggregate multiple disposable resources into a single container
that disposes them all in reverse order.

## Core Concept

A `DisposableStack` is itself `Disposable`. You push resources onto it, and
when the stack is disposed, every resource is cleaned up in LIFO (last in,
first out) order. This is the same reverse-order guarantee that multiple
`using` declarations provide, but it works for a dynamic number of resources.

```typescript
function processFiles(paths: string[]): string[] {
    using stack = new DisposableStack();
    const handles = paths.map((p) => {
        const h = new FileHandle(p);
        stack.use(h); // register for cleanup
        return h;
    });
    return handles.map((h) => h.read());
    // All handles disposed in reverse order when stack is disposed
}
```

## How It Works

`DisposableStack` provides several methods for registering resources:

- **`use(value)`** — adds a `Disposable` to the stack and returns it. This is
  the most common method.
- **`adopt(value, onDispose)`** — adds any value and a custom cleanup callback.
  Useful for resources that do not implement `Disposable`.
- **`defer(callback)`** — registers a cleanup callback without a resource.
  Similar to Go's `defer`.
- **`move()`** — transfers ownership of all registered resources to a new
  `DisposableStack`, leaving the original empty. Useful when you want to
  return resources to a caller.

```typescript
function setupResources(): DisposableStack {
    const stack = new DisposableStack();

    // use() — register a Disposable
    const db = stack.use(new DatabaseConnection("localhost"));

    // adopt() — custom cleanup for non-Disposable values
    const tempDir = "/tmp/work-12345";
    stack.adopt(tempDir, (dir) => {
        console.log(`Removing temp dir: ${dir}`);
    });

    // defer() — arbitrary cleanup callback
    stack.defer(() => {
        console.log("Final cleanup step");
    });

    return stack.move(); // transfer ownership to caller
}
```

`AsyncDisposableStack` is the async counterpart. It implements
`AsyncDisposable` and its `use()` method accepts `AsyncDisposable` resources.
Disposal awaits each cleanup in reverse order.

```typescript
async function batchProcess(): Promise<void> {
    await using stack = new AsyncDisposableStack();
    const conn1 = stack.use(await connectDb("db1"));
    const conn2 = stack.use(await connectDb("db2"));
    // Both connections closed in reverse order
}
```

## Common Pitfalls

- **Forgetting to dispose the stack itself.** If you create a `DisposableStack`
  without `using`, you must call `dispose()` manually — otherwise nothing gets
  cleaned up.
- **Using `move()` and then disposing the original.** After `move()`, the
  original stack is empty. Disposing it is safe but does nothing. The new
  stack owns the resources.
- **Mixing sync and async.** `DisposableStack.use()` only accepts `Disposable`.
  For `AsyncDisposable` resources, use `AsyncDisposableStack`.
- **Assuming disposal order is FIFO.** It is LIFO — the last resource added
  is disposed first, matching the natural "stack unwind" pattern.

## Key Takeaways

- `DisposableStack` aggregates multiple `Disposable` resources for batch
  cleanup.
- Resources are disposed in reverse order (LIFO) — last added, first disposed.
- `use()` registers a `Disposable`, `adopt()` adds custom cleanup, `defer()`
  adds a bare callback.
- `move()` transfers ownership to a new stack, useful for returning resources.
- `AsyncDisposableStack` is the async equivalent for `AsyncDisposable`
  resources.
- Both stack classes are themselves disposable, so they compose with `using`.

<div class="hint">
Think of `DisposableStack` as a programmatic version of multiple `using`
declarations. Where `using` is great for a fixed, known set of resources,
`DisposableStack` shines when the number of resources is determined at
runtime — like opening N files from a directory listing or creating a
connection pool of configurable size.
</div>
