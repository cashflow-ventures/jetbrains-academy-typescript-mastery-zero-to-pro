# UnionToTuple Exercise

Implement the full `UnionToTuple` pipeline from scratch. You will build
`LastOfUnion`, `UnionToTuple`, and a runtime helper that demonstrates
the concept by converting a set of keys into an array.

## Instructions

1. In `task.ts`, implement `UnionToIntersection<U>` using contravariant
   function parameter inference.

2. Implement `LastOfUnion<U>` that extracts the last member of a union
   by converting union members to an intersection of functions and
   inferring the return type of the last overload.

3. Implement `UnionToTuple<U>` that recursively peels off the last
   member of the union and prepends it to an accumulator tuple.
   Base case: `[U] extends [never]` returns the accumulator.

4. Implement the function `objectKeys<T extends object>(obj: T): (keyof T)[]`
   that returns `Object.keys(obj)` cast to `(keyof T)[]`.

5. Implement the function `unionSize<T extends object>(obj: T): number`
   that returns the number of keys in the object.

## Example

```typescript
type T = UnionToTuple<"x" | "y" | "z">;  // ["x", "y", "z"]

objectKeys({ a: 1, b: 2 });  // ["a", "b"]
unionSize({ a: 1, b: 2, c: 3 });  // 3
```

<div class="hint">
For `LastOfUnion`, first distribute the union into `() => U` functions,
then use `UnionToIntersection` to get an overloaded function, then
`infer Last` from the return type. Remember to use `[U] extends [never]`
(not bare `U extends never`) to prevent distribution in the base case.
</div>
