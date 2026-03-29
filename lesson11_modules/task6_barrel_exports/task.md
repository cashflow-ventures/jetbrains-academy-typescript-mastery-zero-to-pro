# Barrel Exports

A **barrel** is an `index.ts` file that re-exports selected items from multiple modules,
creating a single convenient entry point. In this exercise, you'll simulate the barrel
pattern by creating types and functions that would normally live in separate files, then
building a barrel-style aggregation function.

## Instructions

1. Export an interface `User` with properties `id: number`, `name: string`, `email: string`.

2. Export an interface `Product` with properties `id: number`, `title: string`,
   `price: number`.

3. Export a function `createUser` that takes `id`, `name`, and `email` (all typed) and
   returns a `User`.

4. Export a function `createProduct` that takes `id`, `title`, and `price` (all typed)
   and returns a `Product`.

5. Export a function `formatUser` that takes a `User` and returns a string:
   `"User(id): name <email>"` — e.g., `"User(1): Alice <alice@test.com>"`.

6. Export a function `formatProduct` that takes a `Product` and returns a string:
   `"Product(id): title - $XX.XX"` (price to 2 decimal places).

7. Export a function `createBarrelSummary` that takes an array of `User` and an array
   of `Product`, and returns an object `{ userCount: number; productCount: number;
   summary: string }` where `summary` is `"X user(s), Y product(s)"`.

## Example

```typescript
const user = createUser(1, "Alice", "alice@test.com");
formatUser(user);  // "User(1): Alice <alice@test.com>"

const product = createProduct(10, "Widget", 29.99);
formatProduct(product);  // "Product(10): Widget - $29.99"

createBarrelSummary([user], [product]);
// { userCount: 1, productCount: 1, summary: "1 user(s), 1 product(s)" }
```

<div class="hint">
In a real project, `User` and `Product` would live in separate files. The barrel
`index.ts` would re-export them: `export { User, createUser } from "./user"` and
`export { Product, createProduct } from "./product"`. Here we keep everything in one
file to focus on the export patterns.
</div>
