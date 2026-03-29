# Variance Exercise

Practice applying variance annotations and understanding how covariance and contravariance
affect assignability in generic types.

## Instructions

1. Export an interface `ReadonlyStore<T>` annotated with the correct variance (`out T`).
   It should have a single method `getValue(): T`. This is covariant — a `ReadonlyStore<Dog>`
   should be assignable to `ReadonlyStore<Animal>`.

2. Export an interface `Comparator<T>` annotated with the correct variance (`in T`).
   It should have a single method `compare(a: T, b: T): number`. This is contravariant —
   a `Comparator<Animal>` should be assignable to `Comparator<Dog>`.

3. Export a function `createReadonlyStore` that takes a value of type `T` and returns
   a `ReadonlyStore<T>` whose `getValue` returns that value.

4. Export a function `createComparator` that takes a key-extraction function
   `(item: T) => number` and returns a `Comparator<T>` that compares two items by
   subtracting their extracted numeric values (`a - b` ordering).

## Example

```typescript
const store = createReadonlyStore("hello");
store.getValue(); // "hello"

const byLength = createComparator((s: string) => s.length);
byLength.compare("hi", "hello"); // negative (2 - 5 = -3)
```

<div class="hint">
Remember: `out T` means T only appears in output positions (return types).
`in T` means T only appears in input positions (parameters). The compiler will
error if you violate these constraints.
</div>
