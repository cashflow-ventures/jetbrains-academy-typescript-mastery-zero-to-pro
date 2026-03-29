# Type Challenges

Five curated type challenges ranging from Easy to Hard. Each challenge
requires you to implement a type alias and a corresponding runtime
function that demonstrates the concept. These challenges test your
mastery of conditional types, mapped types, recursion, and `infer`.

## Instructions

Implement all five challenges in `task.ts`:

### Challenge 1: DeepPick\<T, Path\> (Easy)
Pick a nested property from an object type using a dot-separated path
string. Implement `deepGet(obj, path)` that retrieves the value at
runtime.

### Challenge 2: TupleToUnion\<T\> (Easy)
Convert a tuple type `[A, B, C]` into a union `A | B | C`.
Implement `tupleToUnion(tuple)` at runtime.

### Challenge 3: Reverse\<T\> (Medium)
Reverse a tuple type. `[1, 2, 3]` → `[3, 2, 1]`.
Implement `reverseTuple(tuple)` at runtime.

### Challenge 4: FlattenDepth\<T, Depth\> (Hard)
Flatten a nested tuple to a specified depth.
Implement `flattenToDepth(arr, depth)` at runtime.

### Challenge 5: IsNever\<T\> (Easy)
Detect whether a type is `never`. Return `true` or `false`.
Implement `isNeverValue(value)` that checks if a value is undefined
(as a proxy, since `never` has no runtime representation).

## Example

```typescript
type D = DeepPick<{ a: { b: { c: number } } }, "a.b.c">;  // number
type U = TupleToUnion<[1, "hello", true]>;  // 1 | "hello" | true
type R = Reverse<[1, 2, 3]>;  // [3, 2, 1]
type F = FlattenDepth<[[1, [2]], [3]], 1>;  // [1, [2], 3]
type N = IsNever<never>;  // true

deepGet({ a: { b: 42 } }, "a.b");  // 42
tupleToUnion([1, "hello", true]);   // [1, "hello", true] (returns array)
reverseTuple([1, 2, 3]);           // [3, 2, 1]
flattenToDepth([[1, [2]], [3]], 1); // [1, [2], 3]
```

<div class="hint">
For `DeepPick`, split the path on "." and recursively index into the type.
For `Reverse`, use a recursive pattern: `T extends [infer First, ...infer Rest]
? [...Reverse<Rest>, First] : []`. For `FlattenDepth`, use a counter tuple
to track remaining depth.
</div>
