# Generic Constraints Exercise

Practice constraining generic type parameters so your functions can safely access
specific properties while remaining flexible.

## Instructions

1. Implement the `longest` function. It takes two arguments of the same type `T`,
   where `T` must have a `length` property (type `number`). Return whichever argument
   has the greater `length`. If they're equal, return the first one.

2. Implement the `mergeObjects` function. It takes two objects of types `T` and `U`
   (both constrained to `object`) and returns a new object that combines all properties
   from both. Use the spread operator.

3. Implement the `getProperty` function. It takes an object of type `T` and a key of
   type `K` (constrained to `keyof T`). Return the value at that key.

4. Implement the `filterByProperty` function. It takes an array of items of type `T`
   (where `T` must have a `name` property of type `string`), and a `searchName` string.
   Return a new array containing only items whose `name` matches `searchName`.

## Example

```typescript
longest("hello", "hi");                    // "hello"
longest([1, 2, 3], [4, 5]);               // [1, 2, 3]

mergeObjects({ a: 1 }, { b: 2 });         // { a: 1, b: 2 }

getProperty({ x: 10, y: 20 }, "x");       // 10

const people = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Alice", age: 35 },
];
filterByProperty(people, "Alice");
// [{ name: "Alice", age: 30 }, { name: "Alice", age: 35 }]
```

<div class="hint">
For `longest`, the constraint is `T extends { length: number }`. This allows strings,
arrays, and any object with a numeric `length` property.
</div>

<div class="hint">
For `mergeObjects`, constrain both `T` and `U` to `object`. The return type is `T & U`
(an intersection), and you can use `{ ...a, ...b }` to combine them.
</div>

<div class="hint">
For `getProperty`, use two type parameters: `T` for the object and `K extends keyof T`
for the key. The return type is `T[K]` — an indexed access type.
</div>
