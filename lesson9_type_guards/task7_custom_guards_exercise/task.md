# Custom Type Guards Exercise

Practice writing user-defined type guard functions with the `param is Type` return type.

## Instructions

1. Implement `isString` — a type guard that takes `unknown` and returns `value is string`.

2. Implement `isNumber` — a type guard that takes `unknown` and returns `value is number`.
   It should return `false` for `NaN`.

3. The `User` and `Admin` interfaces are provided. `Admin` extends `User` with a `permissions`
   array.

4. Implement `isUser` — a type guard that takes `unknown` and returns `value is User`.
   Check that the value is an object with `name` (string) and `email` (string) properties.

5. Implement `isAdmin` — a type guard that takes `unknown` and returns `value is Admin`.
   Check that the value is a valid `User` AND has a `permissions` property that is an array.

6. Implement `filterByType` — a generic function that takes an array of `unknown` values and
   a type guard function, and returns only the values that pass the guard. The return type
   should be `T[]`.

## Example

```typescript
isString("hello");     // true
isString(42);          // false
isNumber(42);          // true
isNumber(NaN);         // false

isUser({ name: "Alice", email: "a@b.com" });  // true
isAdmin({ name: "Alice", email: "a@b.com", permissions: ["read"] }); // true

filterByType([1, "a", 2, "b", true], isString); // ["a", "b"]
filterByType([1, "a", 2, "b", true], isNumber); // [1, 2]
```

<div class="hint">
For `isUser`, check `typeof value === "object" && value !== null` first, then check
for the required properties using `"name" in value` and `typeof` checks on each field.
For `filterByType`, use `Array.prototype.filter` with the guard function.
</div>
