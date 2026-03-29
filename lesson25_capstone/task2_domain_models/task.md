# Domain Models

In any production TypeScript project, the domain layer is the foundation. It defines the
core types that flow through every other layer — services, API handlers, state management.
A well-typed domain model catches entire categories of bugs at compile time.

In this exercise you'll build a complete domain model that combines branded types,
interfaces, discriminated unions, generics, and utility functions — all techniques
you've learned throughout this course.

## Instructions

1. In `task.ts`, create branded types `UserId` and `ProductId` using the
   `string & { readonly __brand: ... }` pattern. Export factory functions
   `createUserId(id: string): UserId` and `createProductId(id: string): ProductId`.

2. Define and export a `User` interface with:
   - `id: UserId`
   - `name: string`
   - `email: string`
   - `role: "admin" | "customer"`

3. Define and export a `Product` interface with:
   - `id: ProductId`
   - `name: string`
   - `price: number`
   - `category: "electronics" | "clothing" | "food"`

4. Define and export an `OrderItem` interface with:
   - `productId: ProductId`
   - `quantity: number`
   - `unitPrice: number`

5. Define and export an `OrderStatus` discriminated union type:
   - `{ status: "pending" }`
   - `{ status: "shipped"; trackingNumber: string }`
   - `{ status: "delivered"; deliveredAt: string }`
   - `{ status: "cancelled"; reason: string }`

6. Define and export an `Order` interface with:
   - `id: string`
   - `userId: UserId`
   - `items: OrderItem[]`
   - `orderStatus: OrderStatus`

7. Export a `calculateOrderTotal(order: Order): number` function that sums
   `quantity * unitPrice` for every item in the order.

8. Define and export a generic `Result<T, E>` type:
   - Success: `{ ok: true; value: T }`
   - Failure: `{ ok: false; error: E }`

   Export helper functions:
   - `ok<T>(value: T): Result<T, never>`
   - `err<E>(error: E): Result<never, E>`

## Example

```typescript
const userId = createUserId("u-1");
const productId = createProductId("p-1");

const order: Order = {
    id: "order-1",
    userId,
    items: [
        { productId, quantity: 2, unitPrice: 29.99 },
        { productId: createProductId("p-2"), quantity: 1, unitPrice: 9.99 },
    ],
    orderStatus: { status: "pending" },
};

calculateOrderTotal(order); // 69.97

const success = ok(42);       // { ok: true, value: 42 }
const failure = err("oops");  // { ok: false, error: "oops" }
```

<div class="hint">
Start with the branded types and factory functions — they're the simplest pieces.
Then build up the interfaces one at a time. The `calculateOrderTotal` function is
just a reduce over `order.items`. For `Result`, remember that `never` is the bottom
type — `Result<number, never>` means "always succeeds".
</div>
