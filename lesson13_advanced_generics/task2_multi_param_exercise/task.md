# Multi-Param Exercise

Practice writing generic functions that use multiple type parameters to transform data
in a type-safe way.

## Instructions

1. Implement `mapArray` — a generic function that takes an array of `T` and a callback
   `(item: T) => U`, and returns an array of `U`. This is your own typed version of `Array.map`.

2. Implement `zipWith` — a generic function that takes two arrays (of types `A` and `B`)
   and a combiner function `(a: A, b: B) => C`. It returns an array of `C` by applying the
   combiner to pairs of elements at the same index. The result length equals the shorter array.

3. Implement `objectFromEntries` — a generic function that takes an array of `[K, V]` tuples
   (where `K extends string`) and returns a `Record<string, V>` built from those entries.

## Example

```typescript
mapArray([1, 2, 3], (n) => n * 2);          // [2, 4, 6]
mapArray(["a", "b"], (s) => s.toUpperCase()); // ["A", "B"]

zipWith([1, 2], ["a", "b"], (n, s) => `${n}${s}`); // ["1a", "2b"]

objectFromEntries([["x", 1], ["y", 2]]);    // { x: 1, y: 2 }
```

<div class="hint">
For `zipWith`, iterate up to `Math.min(arr1.length, arr2.length)` to handle arrays
of different lengths safely.
</div>
