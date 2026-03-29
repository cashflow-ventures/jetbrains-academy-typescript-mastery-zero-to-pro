# Readonly and Optional Deep Dive

You've seen `readonly` and `?` on individual properties. In this exercise you'll work with
readonly arrays, readonly object properties, and optional chaining to safely access nested
optional data.

## Instructions

1. Define a `ReadonlyPoint` interface with `readonly x` (number) and `readonly y` (number).

2. Implement `distanceFromOrigin` — takes a `ReadonlyPoint` and returns the distance from (0, 0).
   Use the formula: `Math.sqrt(x * x + y * y)`.

3. Define a `UserProfile` interface with:
   - `name` (string)
   - `email` (string)
   - `address` (optional object with `street` (string), `city` (string), `zip` (optional string))

4. Implement `getCity` — takes a `UserProfile` and returns the city if the address exists,
   or `"Unknown"` if it doesn't.

5. Implement `freezeArray` — takes a `readonly number[]` and returns the sum of all elements.
   The function must not modify the array.

6. Export the `ReadonlyPoint` interface, `UserProfile` interface, and all three functions.

## Example

```typescript
distanceFromOrigin({ x: 3, y: 4 }); // returns 5

const profile: UserProfile = { name: "Alice", email: "a@b.com" };
getCity(profile); // returns "Unknown"

const profileWithAddr: UserProfile = {
    name: "Bob",
    email: "b@c.com",
    address: { street: "123 Main", city: "Portland" },
};
getCity(profileWithAddr); // returns "Portland"

freezeArray([1, 2, 3, 4]); // returns 10
```

<div class="hint">
Use optional chaining (`?.`) to safely access nested optional properties. For example,
`user.address?.city` returns `undefined` if `address` is missing, instead of throwing an error.
</div>
