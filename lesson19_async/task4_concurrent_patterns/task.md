# Concurrent Patterns

When you need to run multiple async operations at the same time, JavaScript
provides four static methods on `Promise`: `all`, `race`, `allSettled`, and
`any`. Each has different behavior when promises resolve or reject — and
TypeScript types each one differently. Understanding these type signatures
is critical for writing correct concurrent code.

## Core Concept

All four methods accept an iterable of promises and return a single promise.
The difference is in how they handle success and failure, and what type the
resulting promise carries:

```typescript
// Promise.all — all must succeed, returns tuple of results
const [a, b] = await Promise.all([
    Promise.resolve(42),
    Promise.resolve("hello"),
]);
// a: number, b: string

// Promise.race — first to settle wins
const first = await Promise.race([
    new Promise<number>((r) => setTimeout(() => r(1), 100)),
    new Promise<number>((r) => setTimeout(() => r(2), 50)),
]);
// first: number (value is 2, the faster one)
```

## How It Works

### `Promise.all<T>`

`Promise.all` takes an array (or tuple) of promises and returns a promise that
resolves when *all* input promises resolve. If *any* promise rejects, the
returned promise rejects immediately with that error.

TypeScript preserves tuple types:

```typescript
async function loadDashboard(): Promise<[number[], string, boolean]> {
    return Promise.all([
        fetchNumbers(),    // Promise<number[]>
        fetchTitle(),      // Promise<string>
        checkStatus(),     // Promise<boolean>
    ]);
}
// Return type is Promise<[number[], string, boolean]>
```

The key insight: when you pass a tuple of promises with different types,
TypeScript infers a tuple result — not a union array. This gives you precise
types for each element when you destructure.

### `Promise.allSettled<T>`

`Promise.allSettled` waits for *all* promises to settle (resolve or reject)
and never short-circuits. It returns an array of `PromiseSettledResult<T>`
objects:

```typescript
type PromiseSettledResult<T> =
    | { status: "fulfilled"; value: T }
    | { status: "rejected"; reason: unknown };
```

This is a discriminated union — you narrow on the `status` field:

```typescript
const results = await Promise.allSettled([
    Promise.resolve(42),
    Promise.reject(new Error("fail")),
    Promise.resolve("ok"),
]);

for (const result of results) {
    if (result.status === "fulfilled") {
        console.log(result.value); // number | string
    } else {
        console.log(result.reason); // unknown
    }
}
```

### `Promise.race<T>`

`Promise.race` resolves or rejects as soon as the *first* promise settles.
The return type is the union of all input promise types:

```typescript
const winner = await Promise.race([
    fetchFast(),   // Promise<string>
    fetchSlow(),   // Promise<number>
]);
// winner: string | number
```

A common pattern is using `race` for timeouts:

```typescript
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), ms)
    );
    return Promise.race([promise, timeout]);
}
```

Note that the timeout promise is typed as `Promise<never>` — since `never`
is the bottom type, it does not widen the union. The result is still `Promise<T>`.

### `Promise.any<T>`

`Promise.any` resolves as soon as the *first* promise fulfills. It only rejects
if *all* promises reject, throwing an `AggregateError`:

```typescript
try {
    const fastest = await Promise.any([
        fetchFromCDN1(),   // Promise<string>
        fetchFromCDN2(),   // Promise<string>
    ]);
    // fastest: string
} catch (error) {
    if (error instanceof AggregateError) {
        console.log(error.errors); // array of individual errors
    }
}
```

## Common Pitfalls

- **Using `Promise.all` when you need partial results**: If one promise fails,
  `Promise.all` rejects immediately and you lose all results. Use `allSettled`
  when you need results from promises that might fail independently.
- **Forgetting tuple inference**: `Promise.all([p1, p2])` preserves tuple types
  only when TypeScript can infer a tuple. If you build the array dynamically
  (e.g., with `.map()`), you get a union array instead.
- **Ignoring `AggregateError`**: `Promise.any` throws `AggregateError` when all
  promises reject. Always handle this specific error type.
- **Race conditions with `Promise.race`**: The losing promises still run to
  completion — `race` does not cancel them. Be aware of side effects.

## Key Takeaways

- `Promise.all` — all must succeed; returns a typed tuple matching input types.
- `Promise.allSettled` — all settle; returns `PromiseSettledResult<T>[]` discriminated union.
- `Promise.race` — first to settle wins; returns union of input types.
- `Promise.any` — first to fulfill wins; rejects with `AggregateError` if all fail.
- Use `Promise<never>` for timeout promises to avoid widening the result type.
- TypeScript preserves tuple types in `Promise.all` for precise destructuring.

<div class="hint">
A useful mental model: `Promise.all` is an AND operation (all must succeed),
`Promise.any` is an OR operation (at least one must succeed), `Promise.race`
is a FIRST operation (first to finish, success or failure), and
`Promise.allSettled` is a COLLECT operation (gather all outcomes regardless).
</div>
