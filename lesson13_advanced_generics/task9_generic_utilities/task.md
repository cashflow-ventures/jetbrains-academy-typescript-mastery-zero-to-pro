# Generic Utilities

Combine everything you have learned about advanced generics — multiple type parameters,
`keyof`, indexed access, constraints, and inference — to build a set of reusable utility
functions.

## Instructions

1. Implement `groupByKey` — takes an array of objects `T[]` and a key `K extends keyof T`
   where `T[K]` extends `string`. Groups the objects by the value at that key and returns
   a `Record<string, T[]>`.

2. Implement `zip` — takes two arrays of types `A` and `B`. Returns an array of `[A, B]`
   tuples, pairing elements at the same index. The result length equals the shorter array.

3. Implement `pluck` — takes an array of objects `T[]` and a key `K extends keyof T`.
   Returns an array of `T[K]` values extracted from each object.

## Example

```typescript
const people = [
    { name: "Alice", dept: "eng" },
    { name: "Bob", dept: "eng" },
    { name: "Carol", dept: "hr" },
];

groupByKey(people, "dept");
// { eng: [{ name: "Alice", dept: "eng" }, { name: "Bob", dept: "eng" }],
//   hr: [{ name: "Carol", dept: "hr" }] }

zip([1, 2, 3], ["a", "b"]);  // [[1, "a"], [2, "b"]]

pluck(people, "name");        // ["Alice", "Bob", "Carol"]
```

<div class="hint">
For `groupByKey`, you need the constraint that `T[K]` is a string so it can be used
as a Record key. Use `T[K] extends string` in the constraint or cast the value with
`String(...)`.
</div>
