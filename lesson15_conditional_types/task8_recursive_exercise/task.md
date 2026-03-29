# Recursive Conditional Types Exercise

Practice building recursive conditional types that transform deeply nested
structures. You will implement `DeepReadonly` and a runtime `flatten` function
that mirrors the type-level `Flatten` concept.

## Instructions

1. In `task.ts`, implement the type alias `DeepReadonly<T>` that makes every
   property of `T` readonly at all nesting levels. For arrays, produce a
   `readonly` array with deeply readonly elements. For primitives, return
   the type unchanged.

2. Implement the type alias `Flatten<T>` that recursively unwraps nested
   array types to their innermost element type. For example, `number[][]`
   becomes `number`. Non-array types are returned unchanged.

3. Implement the function `deepFreeze<T>(obj: T): DeepReadonly<T>` that
   recursively freezes an object and all its nested objects. Use
   `Object.freeze` at each level.

4. Implement the function `flattenArray(arr: unknown[]): unknown[]` that
   takes a potentially nested array and returns a flat one-dimensional array.

## Example

```typescript
// Type-level
type A = Flatten<number[][][]>;  // number
type B = Flatten<string[]>;      // string

// Runtime
deepFreeze({ a: { b: 1 } });
// Returns a deeply frozen object

flattenArray([1, [2, [3, 4]], 5]);  // [1, 2, 3, 4, 5]
flattenArray([[["a"]], "b"]);       // ["a", "b"]
```

<div class="hint">
For `DeepReadonly`, check if `T` is an array first with `T extends (infer E)[]`,
then check `T extends object` for the general case, and return `T` for primitives.
For `flattenArray`, use recursion: if an element is an array, flatten it recursively
and spread the results.
</div>
