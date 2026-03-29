# Transaction Manager

In this exercise you will build a transaction manager that coordinates multiple
resources using the disposable stack pattern. The manager acquires resources,
executes operations, and guarantees that all resources are released in reverse
order — even if an operation fails.

## Instructions

1. In `task.ts`, implement the `ManagedResource` class:
   - Constructor takes `name: string` and starts in an open state.
   - `operate(action: string): string` — returns `"{name}: {action}"` if open,
     throws `Error("{name} is closed")` if closed.
   - `dispose(): void` — marks the resource as closed. Must be idempotent.
   - `isClosed(): boolean` — returns whether the resource has been disposed.

2. Implement `TransactionManager`:
   - Constructor takes no arguments. Internally maintains an array of acquired
     `ManagedResource` instances.
   - `acquire(name: string): ManagedResource` — creates a new `ManagedResource`,
     stores it, and returns it.
   - `execute(action: string): string[]` — calls `operate(action)` on every
     acquired resource and returns the results as an array.
   - `rollback(): void` — disposes all acquired resources in **reverse** order
     (last acquired first). After rollback, the internal list should be empty.
   - `getResources(): ManagedResource[]` — returns a copy of the internal
     resource array.

3. Implement `runTransaction(names: string[], action: string): TransactionResult`:
   - Creates a `TransactionManager`, acquires a resource for each name,
     executes the action, then rolls back.
   - Returns `{ results: string[]; allClosed: boolean }` where `allClosed`
     is `true` only if every resource is closed after rollback.

## Example

```typescript
const mgr = new TransactionManager();
const db = mgr.acquire("DB");
const cache = mgr.acquire("Cache");
mgr.execute("COMMIT");  // ["DB: COMMIT", "Cache: COMMIT"]
mgr.rollback();          // disposes Cache first, then DB
db.isClosed();           // true

runTransaction(["A", "B"], "SAVE");
// { results: ["A: SAVE", "B: SAVE"], allClosed: true }
```

<div class="hint">
The `rollback` method should iterate the resources in reverse order. You can
use `Array.prototype.reverse()` on a copy, or iterate from the end with a
decrementing index. Remember to clear the internal array after disposal.
</div>
