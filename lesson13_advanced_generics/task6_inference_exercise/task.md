# Inference Exercise

Practice writing generic functions where TypeScript infers complex types from arguments
and callbacks — no explicit type arguments needed by the caller.

## Instructions

1. Implement `createPair` — takes two arguments of potentially different types and returns
   a tuple `[T, U]`. TypeScript should infer both `T` and `U` from the arguments.

2. Implement `pipeline` — takes an initial value of type `T`, a first transform
   `(value: T) => U`, and a second transform `(value: U) => V`. Returns the final
   value of type `V`. TypeScript should infer all three type parameters.

3. Implement `groupBy` — takes an array of `T` and a key-extraction function
   `(item: T) => string`. Returns a `Record<string, T[]>` where items are grouped
   by the string key returned by the function.

## Example

```typescript
createPair("hello", 42);           // ["hello", 42]

pipeline(
    "  Hello  ",
    (s) => s.trim(),
    (s) => s.length
);                                  // 5

groupBy(
    [{ name: "Alice", dept: "eng" }, { name: "Bob", dept: "eng" }, { name: "Carol", dept: "hr" }],
    (p) => p.dept
);
// { eng: [{ name: "Alice", dept: "eng" }, { name: "Bob", dept: "eng" }], hr: [{ name: "Carol", dept: "hr" }] }
```

<div class="hint">
For `pipeline`, chain the two functions: pass the initial value through the first function,
then pass that result through the second. TypeScript infers each intermediate type automatically.
</div>
