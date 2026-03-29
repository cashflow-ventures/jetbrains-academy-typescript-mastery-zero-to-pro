# Resource Management

Explicit resource management is a critical pattern for handling connections, file handles,
and other finite resources. TypeScript 5.2 introduced the `using` keyword and the
`Disposable` interface built on `Symbol.dispose`. In this exercise you'll simulate
the Disposable pattern by defining `Symbol.dispose` yourself and building a generic
resource pool that tracks, acquires, releases, and disposes of managed resources.

## Instructions

1. In `task.ts`, declare `Symbol.dispose` if it doesn't already exist (polyfill) and
   export a `Disposable` interface with a `[Symbol.dispose](): void` method.

2. Export a `ManagedResource` class that implements `Disposable`:
   - A readonly `id: string` property (set via constructor)
   - An `isOpen: boolean` property, initially `true`
   - A `[Symbol.dispose]()` method that sets `isOpen` to `false`

3. Export a `ResourcePool<T extends Disposable>` class with:
   - A private collection of **available** resources and **active** (checked-out) resources
   - A constructor that accepts an array of `T` resources as the initial pool
   - `acquire(): T` — removes a resource from the available set and moves it to active.
     Throws an `Error` with message `"No resources available"` if the pool is empty.
   - `release(resource: T): void` — moves a resource from active back to available.
     Throws an `Error` with message `"Resource not active"` if the resource is not
     currently active.
   - `get activeCount(): number` — returns the number of currently active resources
   - `get availableCount(): number` — returns the number of available resources
   - `disposeAll(): void` — calls `[Symbol.dispose]()` on **every** resource (both
     active and available), then clears both collections

## Example

```typescript
const r1 = new ManagedResource("conn-1");
const r2 = new ManagedResource("conn-2");
const pool = new ResourcePool([r1, r2]);

pool.availableCount; // 2
pool.activeCount;    // 0

const conn = pool.acquire();
conn.id;              // "conn-1"
pool.availableCount;  // 1
pool.activeCount;     // 1

pool.release(conn);
pool.availableCount;  // 2
pool.activeCount;     // 0

pool.disposeAll();
r1.isOpen; // false
r2.isOpen; // false
pool.availableCount; // 0
pool.activeCount;    // 0
```

<div class="hint">
Use two arrays (or Sets) inside `ResourcePool` — one for available resources and one
for active resources. `acquire` shifts from available to active; `release` does the
reverse. `disposeAll` iterates both collections, calls `[Symbol.dispose]()` on each
resource, then empties both. Remember to polyfill `Symbol.dispose` at the top of
your file so the symbol exists at runtime.
</div>
