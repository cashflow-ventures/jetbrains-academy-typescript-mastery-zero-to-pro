# keyof Exercise

Practice using `keyof` and indexed access types to build type-safe object utilities.

## Instructions

1. Implement `getProperty` — takes an object `obj` of type `T` and a `key` of type
   `K extends keyof T`. Returns the value `obj[key]` with the precise type `T[K]`.

2. Implement `setProperty` — takes an object `obj` of type `T`, a `key` of type
   `K extends keyof T`, and a `value` of type `T[K]`. Sets `obj[key] = value` and
   returns the modified object.

3. Implement `pluckProperty` — takes an array of objects of type `T` and a `key` of type
   `K extends keyof T`. Returns an array of `T[K]` values extracted from each object.

## Example

```typescript
const user = { name: "Alice", age: 30 };

getProperty(user, "name");  // "Alice"
getProperty(user, "age");   // 30

setProperty(user, "age", 31); // { name: "Alice", age: 31 }

const users = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
];
pluckProperty(users, "name"); // ["Alice", "Bob"]
```

<div class="hint">
The constraint `K extends keyof T` ensures only valid keys are accepted.
The return type `T[K]` gives the compiler the exact property type — not a broad union.
</div>
