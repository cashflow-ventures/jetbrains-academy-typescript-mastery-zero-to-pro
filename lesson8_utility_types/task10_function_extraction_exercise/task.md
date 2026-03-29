# Function Type Extraction Exercise

Practice using `ReturnType` and `Parameters` to derive types from existing functions.

## Instructions

1. The `createOrder` function is provided. Do not modify it.
2. Define and export a type alias `OrderResult` that equals the return type of `createOrder`
   (use `ReturnType`).
3. Define and export a type alias `OrderArgs` that equals the parameter types of `createOrder`
   (use `Parameters`).
4. Implement `wrapCreateOrder` — it accepts the same arguments as `createOrder` (use a rest
   parameter typed with `OrderArgs`), calls `createOrder`, and returns the result with an
   extra `processedAt: Date` field.
5. Implement `getFirstArg` — a generic function that takes any function type and an args tuple,
   and returns the first element. Signature:
   `getFirstArg<T extends (...args: any[]) => any>(args: Parameters<T>): Parameters<T>[0]`

## Example

```typescript
const order = wrapCreateOrder("item-1", 3, 29.99);
// { id: string, item: string, quantity: number, total: number, processedAt: Date }

getFirstArg<typeof createOrder>(["item-1", 3, 29.99]); // "item-1"
```

<div class="hint">
Use `...args: OrderArgs` as the parameter for `wrapCreateOrder`, then spread `args`
into `createOrder(...args)`.
</div>
