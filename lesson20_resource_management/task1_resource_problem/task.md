# The Resource Cleanup Problem

Every non-trivial application works with resources that must be released when
you are done with them — file handles, database connections, network sockets,
timers, and locks. Forgetting to clean up leads to memory leaks, data
corruption, and exhausted connection pools. In JavaScript and TypeScript the
traditional tool for guaranteed cleanup is `try/finally`, but it is surprisingly
easy to get wrong.

## Core Concept

The fundamental problem is that cleanup code must run regardless of whether the
"happy path" completes or an error is thrown. The `try/finally` pattern handles
this, but it introduces several pain points that grow with the number of
resources you manage.

```typescript
// A simple try/finally — looks fine for one resource
function readConfig(path: string): string {
    const handle = openFile(path);
    try {
        return handle.read();
    } finally {
        handle.close(); // always runs
    }
}
```

The pattern above works, but watch what happens when you need two resources:

```typescript
function copyFile(src: string, dest: string): void {
    const reader = openFile(src);
    try {
        const writer = openFile(dest);
        try {
            writer.write(reader.read());
        } finally {
            writer.close();
        }
    } finally {
        reader.close();
    }
}
```

Each additional resource adds another level of nesting. With three or four
resources the code becomes deeply indented and hard to follow. Worse, if
`writer.close()` itself throws, the original error is silently swallowed.

## How It Works

The `try/finally` approach has three structural weaknesses:

1. **Nesting explosion** — every resource adds a new `try/finally` block,
   increasing indentation and cognitive load.
2. **Error masking** — if the `finally` block throws, the original error from
   the `try` block is lost. JavaScript does not aggregate errors automatically.
3. **Ordering mistakes** — resources must be released in reverse acquisition
   order. Manual code makes it easy to swap the order or forget a resource
   entirely.

Other languages solved this long ago:

- **C#** has `IDisposable` and the `using` statement (since C# 1.0, 2002).
- **Python** has context managers and the `with` statement (since Python 2.5, 2006).
- **Java** has `AutoCloseable` and try-with-resources (since Java 7, 2011).
- **Go** has `defer` for stack-based cleanup.

TypeScript 5.2 (2023) finally brings an equivalent: the **Explicit Resource
Management** proposal (TC39 Stage 3). It introduces the `Disposable` and
`AsyncDisposable` interfaces together with the `using` and `await using`
declarations.

## Common Pitfalls

- **Forgetting to close a resource in an early-return branch.** If a function
  has multiple `return` statements before the `finally`, it is easy to add a
  new return path that skips cleanup.
- **Assuming `finally` is enough.** A thrown error inside `finally` replaces
  the original error, making debugging extremely difficult.
- **Closing resources in the wrong order.** If resource B depends on resource A,
  closing A first can cause B's close to fail or corrupt data.
- **Leaking on construction failure.** If opening the second resource throws,
  the first resource's cleanup may never run if the code is not structured
  carefully.

## Key Takeaways

- `try/finally` guarantees cleanup runs, but it does not compose well for
  multiple resources.
- Nested `try/finally` blocks are verbose, error-prone, and mask errors.
- Other languages solved this with language-level resource management decades
  ago.
- TypeScript 5.2 introduces `Disposable`, `AsyncDisposable`, and the `using`
  keyword to bring the same pattern to the JavaScript ecosystem.

<div class="hint">
The Explicit Resource Management proposal is TC39 Stage 3 and shipped in
TypeScript 5.2. It is also available in V8 (Chrome 134+) and Deno. Node.js
support is landing incrementally. Even before full runtime support, the pattern
is valuable because TypeScript checks the types at compile time.
</div>
