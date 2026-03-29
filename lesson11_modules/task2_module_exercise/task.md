# Module Exercise

Practice organizing code with ES module exports. You'll create typed interfaces,
functions, and constants — all properly exported so they can be imported by other modules.

## Instructions

1. Export an interface `Product` with properties:
   - `id` of type `number`
   - `name` of type `string`
   - `price` of type `number`

2. Export a function `createProduct` that takes `id: number`, `name: string`, and
   `price: number`, and returns a `Product` object.

3. Export a function `formatPrice` that takes a `Product` and returns a string in the
   format `"ProductName: $XX.XX"` (price formatted to exactly 2 decimal places).

4. Export a constant `DEFAULT_PRODUCT` of type `Product` with `id: 0`,
   `name: "Unknown"`, `price: 0`.

5. Export a function `getExpensiveProducts` that takes an array of `Product` and a
   `minPrice: number`, and returns a new array containing only products whose price
   is greater than or equal to `minPrice`.

## Example

```typescript
const p = createProduct(1, "Widget", 9.99);
// { id: 1, name: "Widget", price: 9.99 }

formatPrice(p);
// "Widget: $9.99"

getExpensiveProducts([p, DEFAULT_PRODUCT], 5);
// [{ id: 1, name: "Widget", price: 9.99 }]
```

<div class="hint">
Use `toFixed(2)` to format the price to two decimal places. Remember that `toFixed`
returns a string, so you can embed it directly in a template literal.
</div>
