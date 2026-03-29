# Async Generators Exercise

Async generators shine when you need to lazily produce data from asynchronous
sources. In this exercise you will build a typed async paginator that fetches
pages of data on demand, and utility functions for working with async iterables.

## Instructions

1. In `task.ts`, implement `asyncRange(start: number, end: number): AsyncGenerator<number>` —
   yields integers from `start` to `end` (inclusive). Each yield should be
   asynchronous (wrap in a resolved promise).

2. Implement `asyncMap<T, U>(source: AsyncIterable<T>, fn: (item: T) => U): AsyncGenerator<U>` —
   applies `fn` to each item from the source and yields the result.

3. Implement `asyncTake<T>(source: AsyncIterable<T>, count: number): AsyncGenerator<T>` —
   yields at most `count` items from the source, then stops.

4. Implement `collectAsync<T>(source: AsyncIterable<T>): Promise<T[]>` —
   collects all items from an async iterable into an array.

5. Implement `paginate<T>(fetchPage: (page: number) => Promise<T[]>): AsyncGenerator<T>` —
   calls `fetchPage` starting from page 0, incrementing each time. Yields each
   item from the returned array. Stops when `fetchPage` returns an empty array.

## Example

```typescript
await collectAsync(asyncRange(1, 3));                    // [1, 2, 3]
await collectAsync(asyncMap(asyncRange(1, 3), (n) => n * 10)); // [10, 20, 30]
await collectAsync(asyncTake(asyncRange(1, 100), 3));    // [1, 2, 3]

const fetcher = (page: number) =>
    Promise.resolve(page < 2 ? [`item_${page}`] : []);
await collectAsync(paginate(fetcher));                   // ["item_0", "item_1"]
```

<div class="hint">
For `paginate`, use a `while (true)` loop that calls `fetchPage`, checks if
the result is empty, and breaks if so. Use `yield` inside the loop to emit
each item from the page array. Remember to increment the page number.
</div>
