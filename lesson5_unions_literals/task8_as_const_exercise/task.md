# `as const` Exercise

Now you'll use `as const` to create typed constant values and derive union types from them.
This is a common pattern for defining configuration objects and lookup tables.

## Instructions

1. Create a `ROLES` constant array using `as const` with the values `"admin"`, `"editor"`,
   and `"viewer"`. Then derive a `Role` type from it using `typeof ROLES[number]`.

2. Create an `HTTP_METHODS` constant object using `as const` with properties:
   `GET: "GET"`, `POST: "POST"`, `PUT: "PUT"`, `DELETE: "DELETE"`.
   Then derive an `HttpMethod` type from its values using
   `typeof HTTP_METHODS[keyof typeof HTTP_METHODS]`.

3. Implement `isValidRole` — it takes an `unknown` value and returns `true` if the value
   is one of the `ROLES` values. Use the `ROLES` array to check membership.

4. Implement `getMethodDescription` — it takes an `HttpMethod` and returns a description:
   - `"GET"` → `"Retrieve data"`
   - `"POST"` → `"Create data"`
   - `"PUT"` → `"Update data"`
   - `"DELETE"` → `"Remove data"`

5. Export `ROLES`, `HTTP_METHODS`, `Role`, `HttpMethod`, `isValidRole`, and `getMethodDescription`.

## Example

```typescript
type Role = typeof ROLES[number]; // "admin" | "editor" | "viewer"

isValidRole("admin");   // returns true
isValidRole("guest");   // returns false

getMethodDescription("GET");  // returns "Retrieve data"
```

<div class="hint">
To check if an unknown value is in a readonly array, you can cast the array to
`readonly string[]` and use `.includes()`. For the type derivation, remember that
`typeof arr[number]` gives you a union of all element types in a tuple.
</div>
