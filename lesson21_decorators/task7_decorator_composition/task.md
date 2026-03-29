# Decorator Composition

When multiple decorators are stacked on a single method, they compose like nested function calls. Understanding execution order is critical for building reliable decorator pipelines. In this exercise you will compose validation and logging decorators and observe their interaction.

## Instructions

1. Implement the `validate` decorator factory. It takes a `validator: (...args: any[]) => boolean` function. When the decorated method is called, the validator runs first on the arguments. If it returns `false`, throw an `Error` with message `"Validation failed for {methodName}"`. If it returns `true`, call the original method normally.

2. Implement the `log` decorator. It should push a string into the exported `callLog` array each time the decorated method is called. The format is `"called {methodName}"`. The log entry should be added **before** calling the original method. Return the original result unchanged.

3. Implement the `OrderService` class:
   - `createOrder(item: string, quantity: number): string` — decorated with both `@log` and `@validate(...)`. The validator checks that `quantity > 0`. Returns `"Order: {quantity}x {item}"`.
   - `cancelOrder(orderId: string): string` — decorated with `@log`. Returns `"Cancelled: {orderId}"`.

4. Apply decorators in this order (top to bottom): `@log` then `@validate(...)` on `createOrder`. Remember: decorators apply bottom-to-top, so `@validate` wraps first, then `@log` wraps the validated version. This means `@log` executes first in the call chain, before validation.

## Example

```typescript
const svc = new OrderService();
svc.createOrder("Widget", 3);  // "Order: 3x Widget"
callLog; // ["called createOrder"]

svc.createOrder("Gadget", -1); // throws "Validation failed for createOrder"
// callLog still has the entry because log runs before validate
```

<div class="hint">
Decorator execution order: when stacked as `@A` then `@B` (top to bottom), `B` applies first
(closest to the method), then `A` wraps the result. So the call flows through `A` → `B` → original.
With `@log` on top and `@validate` below, log runs first in the call chain, then validate checks.
</div>
