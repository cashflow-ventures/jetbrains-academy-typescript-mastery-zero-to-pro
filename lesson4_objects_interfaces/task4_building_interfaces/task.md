# Building Interfaces

Time to put interfaces into practice. You'll define a `User` interface, extend it to create an
`Admin` interface, and write functions that work with both.

## Instructions

1. Define a `User` interface with the following properties:
   - `id` (number)
   - `name` (string)
   - `email` (string)
   - `active` (boolean)

2. Define an `Admin` interface that extends `User` and adds:
   - `permissions` (string array)

3. Implement `createUser` — takes `id`, `name`, `email` and returns a `User` with `active` set
   to `true`.

4. Implement `createAdmin` — takes `id`, `name`, `email`, and `permissions` (string array) and
   returns an `Admin` with `active` set to `true`.

5. Implement `summarizeUser` — takes a `User` and returns a string in the format:
   `"name (email) - active"` or `"name (email) - inactive"`.

6. Export both interfaces and all three functions.

## Example

```typescript
const user = createUser(1, "Alice", "alice@example.com");
// { id: 1, name: "Alice", email: "alice@example.com", active: true }

const admin = createAdmin(2, "Bob", "bob@example.com", ["read", "write"]);
// { id: 2, name: "Bob", email: "bob@example.com", active: true, permissions: ["read", "write"] }

summarizeUser(user);  // "Alice (alice@example.com) - active"
```

<div class="hint">
Remember that `Admin extends User` means an `Admin` has all the properties of a `User` plus
the additional `permissions` property. Any function that accepts a `User` can also accept an
`Admin` — this is structural typing in action.
</div>
