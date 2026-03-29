# The Structural Typing Problem

TypeScript uses *structural typing* — two types are compatible if they have the same
shape, regardless of their names. This is powerful and flexible, but it creates a
dangerous blind spot: types that represent completely different domain concepts can be
silently interchanged when they share the same underlying structure.

## Core Concept

Consider a system that uses string identifiers for users and orders:

```typescript
type UserId = string;
type OrderId = string;

function getUser(id: UserId): void {
    console.log(`Fetching user ${id}`);
}

function getOrder(id: OrderId): void {
    console.log(`Fetching order ${id}`);
}

const userId: UserId = "user-abc-123";
const orderId: OrderId = "order-xyz-789";

// BUG: No error! TypeScript sees both as plain strings.
getUser(orderId);   // Passes an OrderId where UserId is expected
getOrder(userId);   // Passes a UserId where OrderId is expected
```

Both `UserId` and `OrderId` are just aliases for `string`. TypeScript's structural
type system sees them as identical — they have the same shape (a string), so they are
freely assignable to each other. The compiler cannot catch the mix-up.

## How It Works

### Why Structural Typing Allows This

In a *nominal* type system (like Java or C#), two types with different names are
distinct even if their structures match. TypeScript deliberately chose structural
typing because it models how JavaScript actually works — duck typing. If it looks
like a string and behaves like a string, TypeScript treats it as a string.

This works well for most cases, but falls apart when you have multiple values of the
same primitive type that carry different *semantic meaning*:

| Variable | Type | Meaning |
|----------|------|---------|
| `userId` | `string` | Identifies a user |
| `orderId` | `string` | Identifies an order |
| `email` | `string` | An email address |
| `usd` | `number` | US dollars |
| `eur` | `number` | Euros |

All strings are interchangeable. All numbers are interchangeable. The compiler has
no way to distinguish them.

### The Real-World Danger

This is not a theoretical problem. In production codebases, accidental ID swaps are
a common source of bugs:

```typescript
type CustomerId = string;
type ProductId = string;
type InvoiceId = string;

function chargeCustomer(customerId: CustomerId, invoiceId: InvoiceId): void {
    // Imagine this hits a database...
    console.log(`Charging ${customerId} for invoice ${invoiceId}`);
}

const custId: CustomerId = "cust-001";
const prodId: ProductId = "prod-999";
const invId: InvoiceId = "inv-555";

// Oops — passing a ProductId as a CustomerId. No compiler error!
chargeCustomer(prodId, invId);
```

The function happily accepts a `ProductId` where a `CustomerId` is expected because
both are `string`. This bug will only surface at runtime — possibly in production,
possibly charging the wrong entity.

### What We Want: Nominal-Like Behavior

The goal is to make TypeScript reject `getUser(orderId)` at compile time. We want
the compiler to treat `UserId` and `OrderId` as *incompatible* types, even though
both are strings underneath.

This is exactly what **branded types** and **opaque types** solve. They add a
phantom property to the type that makes each one structurally unique — without
affecting the runtime value at all.

## Common Pitfalls

- **Assuming type aliases provide safety**: `type UserId = string` creates zero
  additional type safety. It is purely documentation — the compiler ignores the alias
  name entirely.
- **Relying on variable names**: Naming a variable `userId` does not prevent it from
  being passed where an `orderId` is expected. Only the *type* matters to the compiler.
- **Thinking this only affects IDs**: Currency amounts, coordinates, timestamps,
  percentages — any primitive that carries domain meaning is vulnerable.

## Key Takeaways

- TypeScript's structural type system treats type aliases for the same primitive as identical.
- `type UserId = string` and `type OrderId = string` are fully interchangeable.
- This creates a class of bugs where semantically different values are silently swapped.
- Branded and opaque types (covered in the next tasks) solve this by making each type structurally unique.
- The fix is purely at the type level — no runtime overhead.

<div class="hint">
This problem is sometimes called the "primitive obsession" code smell — using raw
primitives (`string`, `number`) for domain concepts instead of distinct types. In
languages with nominal typing, you would create a `UserId` class. In TypeScript,
branded types achieve the same compile-time safety without the runtime cost of
wrapping values in objects.
</div>
