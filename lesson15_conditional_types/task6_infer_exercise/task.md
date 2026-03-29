# infer Keyword Exercise

Practice using `infer` to extract types from within larger type structures.
You will build utility types that unwrap containers and extract function
signatures, along with runtime functions that mirror the same logic.

## Instructions

1. In `task.ts`, implement the type alias `UnpackPromise<T>` that extracts the
   resolved type from a `Promise`. If `T` is not a `Promise`, return `T` unchanged.

2. Implement the type alias `ElementType<T>` that extracts the element type from
   an array. If `T` is not an array, return `T` unchanged.

3. Implement the type alias `ReturnOf<T>` that extracts the return type of a
   function type. If `T` is not a function, return `never`.

4. Implement the function `unwrapArray(value)` that takes a value of type
   `T | T[]` and always returns `T[]`. If the value is already an array,
   return it; otherwise wrap it in an array.

5. Implement the function `getReturnValue(fn)` that takes a zero-argument
   function and returns the result of calling it.

## Example

```typescript
// Type-level
type A = UnpackPromise<Promise<string>>;  // string
type B = ElementType<number[]>;           // number
type C = ReturnOf<() => boolean>;         // boolean

// Runtime
unwrapArray("hello");       // ["hello"]
unwrapArray([1, 2, 3]);     // [1, 2, 3]
getReturnValue(() => 42);   // 42
```

<div class="hint">
For `UnpackPromise`, use `T extends Promise<infer U> ? U : T`.
For `ElementType`, use `T extends (infer E)[] ? E : T`.
For `ReturnOf`, use `T extends (...args: any[]) => infer R ? R : never`.
</div>
