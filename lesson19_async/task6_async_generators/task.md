# Async Generators

Async generators combine two powerful JavaScript features: generators (which
produce values lazily) and async/await (which handles asynchronous operations).
TypeScript types them with the `AsyncGenerator<Y, R, N>` interface, giving you
full type safety over yielded values, the return value, and values passed back
in via `.next()`. Combined with `for await...of`, async generators are the
ideal tool for streaming data, paginated APIs, and event-driven sequences.

## Core Concept

An async generator function is declared with `async function*`. It can `yield`
values asynchronously and is consumed with `for await...of`:

```typescript
async function* countUp(limit: number): AsyncGenerator<number> {
    for (let i = 1; i <= limit; i++) {
        await new Promise((r) => setTimeout(r, 10));
        yield i;
    }
}

// Consuming with for await...of
async function main(): Promise<void> {
    for await (const n of countUp(3)) {
        console.log(n); // 1, 2, 3
    }
}
```

## How It Works

### The `AsyncGenerator<Y, R, N>` Interface

TypeScript's `AsyncGenerator` has three type parameters:

```typescript
interface AsyncGenerator<Y = unknown, R = any, N = unknown> {
    next(value?: N): Promise<IteratorResult<Y, R>>;
    return(value?: R): Promise<IteratorResult<Y, R>>;
    throw(e?: any): Promise<IteratorResult<Y, R>>;
    [Symbol.asyncIterator](): AsyncGenerator<Y, R, N>;
}
```

- `Y` (Yield) — the type of values produced by `yield`
- `R` (Return) — the type of the value returned by `return`
- `N` (Next) — the type of values passed into `.next(value)`

In most cases you only need `Y`:

```typescript
async function* fibonacci(): AsyncGenerator<number> {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
```

### `AsyncIterable<T>` and `AsyncIterableIterator<T>`

When you write `for await...of`, TypeScript checks that the value implements
`AsyncIterable<T>` (has a `[Symbol.asyncIterator]()` method). Async generators
automatically implement this interface:

```typescript
async function consume(source: AsyncIterable<string>): Promise<string[]> {
    const items: string[] = [];
    for await (const item of source) {
        items.push(item);
    }
    return items;
}
```

Using `AsyncIterable<T>` as a parameter type is more flexible than
`AsyncGenerator<T>` — it accepts any async iterable, not just generators.

### Passing Values with `.next()`

You can send values back into a generator via `.next(value)`. The `N` type
parameter controls what type `.next()` accepts:

```typescript
async function* accumulator(): AsyncGenerator<number, void, number> {
    let total = 0;
    while (true) {
        const input: number = yield total;
        total += input;
    }
}

async function demo(): Promise<void> {
    const gen = accumulator();
    console.log((await gen.next()).value);    // 0
    console.log((await gen.next(10)).value);  // 10
    console.log((await gen.next(5)).value);   // 15
}
```

### Async Generator Delegation

Just like regular generators, async generators support `yield*` to delegate
to another async iterable:

```typescript
async function* merged<T>(
    ...sources: AsyncIterable<T>[]
): AsyncGenerator<T> {
    for (const source of sources) {
        yield* source;
    }
}
```

## Common Pitfalls

- **Forgetting `await` in `for await...of`**: Using `for...of` on an async
  generator gives you `Promise` objects instead of resolved values.
- **Infinite generators without break**: An async generator that never returns
  will loop forever in `for await...of`. Always provide a termination condition
  or use `break`.
- **Ignoring the `N` type parameter**: If your generator accepts values via
  `.next()`, specify the `N` parameter explicitly for type safety.
- **Using `AsyncGenerator<T>` as a parameter type**: Prefer `AsyncIterable<T>`
  for function parameters — it is more general and accepts any async iterable.

## Key Takeaways

- `async function*` creates an async generator that yields values asynchronously.
- `AsyncGenerator<Y, R, N>` types the yield, return, and next-input values.
- `for await...of` consumes any `AsyncIterable<T>`.
- Prefer `AsyncIterable<T>` over `AsyncGenerator<T>` in function parameter types.
- Use `yield*` to delegate to other async iterables.
- Async generators are ideal for paginated data, streaming, and lazy sequences.

<div class="hint">
Async generators are the async counterpart of synchronous generators. If you
understand `function*` and `Generator<Y, R, N>`, the async versions work
identically — just with `Promise` wrappers around each `.next()` call. The
`for await...of` loop handles the unwrapping automatically.
</div>
