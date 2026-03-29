# Type Arithmetic Exercise

Implement tuple-based arithmetic at the type level and provide runtime
helper functions that mirror the type-level operations.

## Instructions

1. In `task.ts`, implement `BuildTuple<N>` that recursively constructs
   a tuple of `N` `unknown` elements.

2. Implement `Length<T>` that extracts the `"length"` property of a
   readonly tuple as a numeric literal type.

3. Implement `Add<A, B>` that adds two non-negative integers by
   spreading two tuples and reading the combined length.

4. Implement the function `tupleLength<T extends readonly unknown[]>(tuple: T): number`
   that returns the length of a tuple at runtime.

5. Implement the function `addPositive(a: number, b: number): number`
   that adds two non-negative integers. Throw an error if either
   argument is negative.

6. Implement the function `rangeArray(n: number): number[]` that
   returns an array `[0, 1, 2, ..., n-1]`. Return `[]` for `n <= 0`.

## Example

```typescript
type T = BuildTuple<4>;     // [unknown, unknown, unknown, unknown]
type L = Length<[1,2,3]>;   // 3
type S = Add<3, 5>;         // 8

tupleLength([1, 2, 3] as const);  // 3
addPositive(3, 5);                // 8
rangeArray(4);                    // [0, 1, 2, 3]
```

<div class="hint">
`BuildTuple` uses a recursive pattern with an accumulator:
`Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>`.
For `Add`, spread both tuples: `[...BuildTuple<A>, ...BuildTuple<B>]["length"]`.
</div>
