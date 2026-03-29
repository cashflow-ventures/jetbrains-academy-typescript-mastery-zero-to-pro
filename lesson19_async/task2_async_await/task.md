# Async/Await

The `async`/`await` syntax makes asynchronous code read like synchronous code,
and TypeScript ensures every `async` function returns a properly typed `Promise<T>`.
In this exercise you will write async functions with explicit return types and
handle errors in a type-safe way.

## Instructions

1. In `task.ts`, implement `delayedValue<T>(value: T, ms: number): Promise<T>` —
   returns a promise that resolves to `value` after `ms` milliseconds.

2. Implement `fetchUserById(id: number): Promise<User>` — simulates an async
   lookup. If `id` is positive, resolve with `{ id, name: "User_" + id, active: true }`.
   If `id` is zero or negative, throw an `Error` with message `"Invalid user id"`.

3. Implement `safeGetUserName(id: number): Promise<string>` — calls `fetchUserById`
   and returns the user's `name`. If the call throws, catch the error and return
   `"Unknown"` instead.

4. Implement `processSequential(ids: number[]): Promise<string[]>` — takes an
   array of user ids, calls `safeGetUserName` for each one **sequentially**
   (one after another, not in parallel), and returns an array of names.

## Example

```typescript
await delayedValue("hello", 50);       // "hello" (after 50ms)
await fetchUserById(3);                // { id: 3, name: "User_3", active: true }
await safeGetUserName(-1);             // "Unknown"
await processSequential([1, -1, 2]);   // ["User_1", "Unknown", "User_2"]
```

<div class="hint">
Remember: an `async` function always returns a `Promise`. If you declare the
return type as `Promise<string>`, TypeScript checks that every code path
returns a `string` (or throws). Use `try/catch` inside async functions to
handle errors — the caught error is `unknown` in strict mode.
</div>
