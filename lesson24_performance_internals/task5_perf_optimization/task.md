# Performance Optimization Exercise

You've learned why deep recursion, distributive conditional types, and chained
mapped types slow the TypeScript compiler. Now put that knowledge to work:
refactor three slow type patterns into performant equivalents that produce
identical results.

## Instructions

1. In `task.ts`, implement `ReverseAccum<T>` — a tail-recursive type that
   reverses a tuple using an accumulator parameter. The naive version recurses
   once per element without an accumulator, hitting the depth limit on long
   tuples. Your version must use an `Acc` parameter that builds the result
   as it goes, keeping recursion depth proportional to tuple length but
   avoiding redundant intermediate instantiations.

2. Implement `IsIncluded<T, U>` — a non-distributive conditional type that
   checks whether type `T` is assignable to type `U`. Wrap both sides in
   tuples (`[T] extends [U]`) to prevent TypeScript from distributing over
   union members. This avoids the exponential blowup that occurs when a
   bare `T extends U` receives a union.

3. Implement `FlatMerge<A, B>` — a single-pass mapped type that merges two
   object types. Properties from `B` override those from `A`. Instead of
   chaining `Omit<A, keyof B> & B` (which creates two mapped types plus an
   intersection the checker must flatten), produce the result in one mapped
   type over `keyof A | keyof B`.

4. Implement the runtime function `reverseTuple<T>(tuple: T): unknown[]`
   that reverses an array. This mirrors the type-level `ReverseAccum`.

5. Implement the runtime function `isIncludedIn<T>(value: T, candidates: T[]): boolean`
   that returns `true` if `value` is found in `candidates` using strict equality.

6. Implement the runtime function `flatMerge<A, B>(a: A, b: B): A & B`
   that merges two objects, with properties from `b` overriding `a`.

## Example

```typescript
type Rev = ReverseAccum<[1, 2, 3]>;       // [3, 2, 1]
type Inc = IsIncluded<"a" | "b", string>; // true (not distributed)
type Mrg = FlatMerge<{ x: 1; y: 2 }, { y: 99; z: 3 }>;
// { x: 1; y: 99; z: 3 }

reverseTuple([1, 2, 3]);                  // [3, 2, 1]
isIncludedIn(2, [1, 2, 3]);              // true
flatMerge({ x: 1 }, { y: 2 });          // { x: 1, y: 2 }
```

<div class="hint">
For `ReverseAccum`, peel the first element off with `[infer Head, ...infer Tail]`
and prepend it to the accumulator: `ReverseAccum<Tail, [Head, ...Acc]>`. The base
case is when `T` is empty — return `Acc`. For `FlatMerge`, map over
`keyof A | keyof B` and use a conditional to pick from `B` first, then `A`.
</div>
