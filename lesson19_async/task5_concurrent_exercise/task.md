# Concurrent Exercise

Now it is time to put `Promise.all` and `Promise.allSettled` to work with
proper TypeScript types. You will build functions that run multiple async
operations concurrently and handle both success and failure cases with
full type safety.

## Instructions

1. In `task.ts`, implement `fetchAll<T>(tasks: Promise<T>[]): Promise<T[]>` —
   a thin wrapper around `Promise.all` that returns all resolved values.

2. Implement `settleAll<T>(tasks: Promise<T>[]): Promise<SettledResult<T>[]>` —
   uses `Promise.allSettled` and maps each outcome to a simpler `SettledResult<T>`
   type (defined for you). For fulfilled results, return `{ status: "ok", value }`.
   For rejected results, extract the error message (if the reason is an `Error`,
   use its `message`; otherwise convert to string) and return `{ status: "fail", error }`.

3. Implement `partitionSettled<T>(results: SettledResult<T>[]): Partitioned<T>` —
   splits an array of `SettledResult<T>` into `{ values: T[], errors: string[] }`.
   Collect all `"ok"` values into `values` and all `"fail"` error messages into `errors`.

4. Implement `fetchWithFallback<T>(primary: Promise<T>, fallback: Promise<T>): Promise<T>` —
   tries the primary promise first. If it rejects, return the fallback result instead.

## Example

```typescript
await fetchAll([Promise.resolve(1), Promise.resolve(2)]);
// [1, 2]

const settled = await settleAll([Promise.resolve("a"), Promise.reject(new Error("boom"))]);
// [{ status: "ok", value: "a" }, { status: "fail", error: "boom" }]

partitionSettled(settled);
// { values: ["a"], errors: ["boom"] }

await fetchWithFallback(Promise.reject(new Error("down")), Promise.resolve("backup"));
// "backup"
```

<div class="hint">
For `settleAll`, use `Promise.allSettled` and then `.map()` over the results.
Check `result.status === "fulfilled"` to distinguish outcomes. Remember that
the `reason` field on rejected results is `unknown` — narrow it before use.
</div>
