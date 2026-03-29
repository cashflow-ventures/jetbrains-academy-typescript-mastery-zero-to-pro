# Refactor to Branded Types

Practice refactoring a function that takes multiple plain string parameters
into one that uses branded types for safety. You will create branded types
for different kinds of identifiers and a validated positive integer type.

## Instructions

1. In `task.ts`, define a `Brand` utility type: `T & { readonly __brand: B }`.

2. Define the following branded types using `Brand`:
   - `CustomerId` — branded `string` with tag `"CustomerId"`
   - `ProductId` — branded `string` with tag `"ProductId"`
   - `Quantity` — branded `number` with tag `"Quantity"`

3. Implement `createCustomerId(id: string): CustomerId` — throws `Error` with
   message `"CustomerId cannot be empty"` if the input is empty.

4. Implement `createProductId(id: string): ProductId` — throws `Error` with
   message `"ProductId cannot be empty"` if the input is empty.

5. Implement `createQuantity(n: number): Quantity` — throws `Error` with
   message `"Quantity must be a positive integer"` if `n` is not a positive
   integer (use `Number.isInteger(n) && n > 0`).

6. Implement `createOrder(customerId: CustomerId, productId: ProductId, quantity: Quantity): Order`
   where `Order` is:
   ```typescript
   interface Order {
       customerId: CustomerId;
       productId: ProductId;
       quantity: Quantity;
       total: number;
   }
   ```
   The `total` field should be the numeric value of `quantity` multiplied by `9.99`
   (a fixed unit price).

7. Implement `orderSummary(order: Order): string` — returns a string in the format:
   `"Order: <quantity>x <productId> for customer <customerId> = $<total>"`
   where `<total>` is formatted to 2 decimal places.

## Example

```typescript
const cid = createCustomerId("cust-1");
const pid = createProductId("prod-42");
const qty = createQuantity(3);

const order = createOrder(cid, pid, qty);
orderSummary(order);
// "Order: 3x prod-42 for customer cust-1 = $29.97"
```

<div class="hint">
For `createQuantity`, remember that `Number.isInteger(n)` checks for whole numbers
and `n > 0` ensures positivity. In `createOrder`, cast `quantity` to `number` to
perform arithmetic: `(quantity as number) * 9.99`. Use `.toFixed(2)` for the total
in `orderSummary`.
</div>
