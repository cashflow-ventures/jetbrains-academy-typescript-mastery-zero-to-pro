# Distributive Conditional Types Exercise

Practice controlling how conditional types distribute over unions. You will
build types that leverage distribution and types that deliberately prevent it.

## Instructions

1. In `task.ts`, implement the type alias `MyExclude<T, U>` that removes from `T`
   all members assignable to `U`. This should use distribution (naked type parameter).

2. Implement the type alias `MyExtract<T, U>` that extracts from `T` all members
   assignable to `U`. This should also use distribution.

3. Implement the type alias `IsNever<T>` that resolves to `true` if `T` is `never`,
   and `false` otherwise. You must prevent distribution to handle `never` correctly.

4. Implement the function `excludeValues<T>(values: T[], excluded: T[]): T[]` that
   returns a new array with all values from `excluded` removed.

5. Implement the function `extractValues<T>(values: T[], kept: T[]): T[]` that
   returns a new array containing only values that appear in `kept`.

## Example

```typescript
// Type-level
type A = MyExclude<"a" | "b" | "c", "a">;     // "b" | "c"
type B = MyExtract<string | number | boolean, number | boolean>;
// number | boolean
type C = IsNever<never>;  // true
type D = IsNever<string>; // false

// Runtime
excludeValues([1, 2, 3, 4], [2, 4]);   // [1, 3]
extractValues([1, 2, 3, 4], [2, 4]);    // [2, 4]
```

<div class="hint">
For `MyExclude`, return `never` when `T extends U` (this removes the member).
For `IsNever`, wrap both sides in tuples: `[T] extends [never]` to prevent
distribution over the empty union.
</div>
