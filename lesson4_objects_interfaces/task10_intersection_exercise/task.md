# Intersection Types Exercise

Practice combining multiple types using intersection (`&`) to build a rich product type from
smaller, reusable building blocks.

## Instructions

1. Define a `WithId` type with an `id` property (number).

2. Define a `WithTimestamps` type with `createdAt` (string) and `updatedAt` (string).

3. Define a `BaseProduct` type with `name` (string) and `price` (number).

4. Define a `Product` type as the intersection of `WithId`, `WithTimestamps`, and `BaseProduct`.

5. Implement `createProduct` — takes `id`, `name`, `price`, and a `timestamp` string. Returns a
   `Product` with `createdAt` and `updatedAt` both set to the timestamp.

6. Implement `applyDiscount` — takes a `Product` and a `discountPercent` (0-100). Returns a new
   `Product` with the discounted price, rounded to 2 decimal places. All other properties stay
   the same.

7. Implement `summarizeProduct` — takes a `Product` and returns a string in the format:
   `"name - $price (id: id)"`.

8. Export all types and functions.

## Example

```typescript
const p = createProduct(1, "Widget", 29.99, "2024-01-15");
// { id: 1, name: "Widget", price: 29.99, createdAt: "2024-01-15", updatedAt: "2024-01-15" }

applyDiscount(p, 10);
// { ...p, price: 26.99 }

summarizeProduct(p);
// "Widget - $29.99 (id: 1)"
```

<div class="hint">
To round a number to 2 decimal places, use `Math.round(value * 100) / 100`. To create a new
object with one property changed, use the spread operator: `{ ...original, price: newPrice }`.
</div>
