# Disposable and AsyncDisposable

TypeScript 5.2 introduces two new interfaces — `Disposable` and
`AsyncDisposable` — that standardize how objects declare their cleanup logic.
Any object that implements one of these interfaces can be used with the `using`
keyword for automatic, deterministic resource management.

## Core Concept

The `Disposable` interface requires a single method keyed by the well-known
symbol `Symbol.dispose`. When an object implements this method, it is telling
consumers: "I hold a resource that must be released, and here is how to do it."

```typescript
// The Disposable interface (built into TypeScript 5.2+ lib)
interface Disposable {
    [Symbol.dispose](): void;
}

// The AsyncDisposable interface for async cleanup
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

You implement `Disposable` by adding a `[Symbol.dispose]()` method to your
class or object. This is the cleanup hook that will be called automatically
when the resource goes out of scope.

```typescript
class DatabaseConnection implements Disposable {
    private closed = false;

    constructor(private url: string) {
        console.log(`Connected to ${url}`);
    }

    query(sql: string): string[] {
        if (this.closed) throw new Error("Connection closed");
        return [`result from: ${sql}`];
    }

    [Symbol.dispose](): void {
        if (!this.closed) {
            this.closed = true;
            console.log(`Disconnected from ${this.url}`);
        }
    }
}
```

## How It Works

The two interfaces serve different use cases:

- **`Disposable`** — for synchronous cleanup. The `[Symbol.dispose]()` method
  returns `void`. Use this for file handles, locks, timers, and in-memory
  resources.
- **`AsyncDisposable`** — for asynchronous cleanup. The
  `[Symbol.asyncDispose]()` method returns `Promise<void>`. Use this for
  database connections, network sockets, and anything that requires an async
  shutdown sequence.

A class can implement both interfaces if it needs to support both synchronous
and asynchronous disposal contexts:

```typescript
class ManagedSocket implements Disposable, AsyncDisposable {
    [Symbol.dispose](): void {
        this.closeSync();
    }

    async [Symbol.asyncDispose](): Promise<void> {
        await this.closeAsync();
    }

    private closeSync(): void {
        console.log("Socket closed (sync)");
    }

    private async closeAsync(): Promise<void> {
        // Graceful async shutdown
        console.log("Socket closed (async)");
    }
}
```

Plain objects can also be disposable — you do not need a class:

```typescript
function createTimer(ms: number): Disposable & { elapsed(): number } {
    const start = Date.now();
    return {
        elapsed(): number {
            return Date.now() - start;
        },
        [Symbol.dispose](): void {
            console.log(`Timer disposed after ${Date.now() - start}ms`);
        },
    };
}
```

## Common Pitfalls

- **Forgetting to make `[Symbol.dispose]` idempotent.** Disposal may be called
  more than once (e.g., manual call followed by automatic). Guard with a
  `closed` flag.
- **Throwing inside `[Symbol.dispose]`.** If disposal throws, it can mask the
  original error. Keep disposal logic simple and defensive.
- **Using `AsyncDisposable` where `Disposable` is expected.** The `using`
  keyword works with `Disposable`; `await using` works with `AsyncDisposable`.
  Mixing them up causes a compile-time error.
- **Not exporting the symbol method.** When writing a class, ensure
  `[Symbol.dispose]()` is public — it must be callable by the runtime.

## Key Takeaways

- `Disposable` requires `[Symbol.dispose](): void` for synchronous cleanup.
- `AsyncDisposable` requires `[Symbol.asyncDispose](): Promise<void>` for
  async cleanup.
- Both classes and plain objects can implement these interfaces.
- Disposal methods should be idempotent — safe to call multiple times.
- These interfaces are the foundation for the `using` and `await using`
  declarations covered in the next task.

<div class="hint">
`Symbol.dispose` and `Symbol.asyncDispose` are new well-known symbols added
to the ECMAScript specification alongside this proposal. They work just like
`Symbol.iterator` and `Symbol.asyncIterator` — they are unique, non-string
property keys that enable protocol-based behavior.
</div>
