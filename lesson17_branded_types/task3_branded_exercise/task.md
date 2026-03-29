# Branded Types Exercise

Practice creating branded types with smart constructors that validate input
before branding. You will build three distinct branded string types and
constructor functions that enforce domain rules at the boundary.

## Instructions

1. In `task.ts`, define a `Brand` utility type that takes a base type `T` and
   a brand tag string `B`, producing `T & { readonly __brand: B }`.

2. Using `Brand`, define three branded types:
   - `UserId` — a branded `string` with tag `"UserId"`
   - `OrderId` — a branded `string` with tag `"OrderId"`
   - `Email` — a branded `string` with tag `"Email"`

3. Implement `createUserId(id: string): UserId` — returns the branded value.
   Throws an `Error` with message `"UserId cannot be empty"` if the input is
   an empty string.

4. Implement `createOrderId(id: string): OrderId` — returns the branded value.
   Throws an `Error` with message `"OrderId cannot be empty"` if the input is
   an empty string.

5. Implement `createEmail(input: string): Email` — validates that the input
   contains exactly one `@` with non-empty parts on both sides (use the regex
   `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Throws an `Error` with message
   `"Invalid email: <input>"` if validation fails. Returns the branded value
   on success.

6. Implement `formatUserEmail(userId: UserId, email: Email): string` — returns
   a string in the format `"User <userId> <email>"`.

## Example

```typescript
const uid = createUserId("user-42");
const oid = createOrderId("order-99");
const em = createEmail("alice@example.com");

formatUserEmail(uid, em); // "User user-42 <alice@example.com>"

createUserId("");                // throws "UserId cannot be empty"
createEmail("not-an-email");     // throws "Invalid email: not-an-email"
```

<div class="hint">
The `Brand` utility type uses an intersection: `T & { readonly __brand: B }`.
For the constructor functions, validate first, then cast with `as`. Remember
that `as UserId` is a compile-time-only operation — it does not change the
runtime value.
</div>
