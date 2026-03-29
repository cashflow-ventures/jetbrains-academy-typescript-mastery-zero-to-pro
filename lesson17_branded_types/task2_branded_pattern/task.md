# The Branded Type Pattern

Branded types solve the structural typing problem by adding a phantom property to a
type — a property that exists only at the type level and is erased at runtime. This
makes two types with the same underlying structure *structurally incompatible*, giving
you nominal-like behavior in TypeScript's structural type system.

## Core Concept

The branded type pattern intersects a primitive type with an object type containing a
unique readonly property called a "brand":

```typescript
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };
```

Each `unique symbol` is distinct, so `UserId` and `OrderId` are now structurally
different — even though both are based on `string`. The compiler will reject any
attempt to use one where the other is expected.

## How It Works

### The Intersection Trick

When you write `string & { readonly __brand: unique symbol }`, you create a type
that is simultaneously a `string` *and* an object with a `__brand` property. No
runtime value actually has this shape — it is a phantom type. You use type assertions
to create values of this type:

```typescript
// Declare branded types with unique symbols
declare const userIdBrand: unique symbol;
declare const orderIdBrand: unique symbol;

type UserId = string & { readonly [userIdBrand]: typeof userIdBrand };
type OrderId = string & { readonly [orderIdBrand]: typeof orderIdBrand };

// Constructor functions that "brand" a plain string
function createUserId(id: string): UserId {
    return id as UserId;
}

function createOrderId(id: string): OrderId {
    return id as OrderId;
}

const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

// Now the compiler catches the mistake!
// getUser(orderId); // Error: Argument of type 'OrderId' is not
//                   // assignable to parameter of type 'UserId'
```

### A Simpler Brand Helper

In practice, you can define a reusable `Brand` utility type:

```typescript
declare const __brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [__brand]: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
type Email = Brand<string, "Email">;
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;
```

This approach uses a string literal as the brand tag instead of a unique symbol per
type. It is slightly less strict (you could theoretically forge the brand string),
but it is simpler and widely used in production codebases.

### Validation at the Boundary

The real power of branded types comes from combining them with validation. Instead
of blindly casting, you validate the input before branding:

```typescript
type Email = Brand<string, "Email">;

function createEmail(input: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        throw new Error(`Invalid email: ${input}`);
    }
    return input as Email;
}

// Once branded, the value is guaranteed to be valid
function sendEmail(to: Email, subject: string): void {
    console.log(`Sending "${subject}" to ${to}`);
}

const email = createEmail("alice@example.com"); // Validates + brands
sendEmail(email, "Welcome!");                   // Type-safe
// sendEmail("not-an-email", "Oops");           // Error at compile time
```

The constructor function acts as a *smart constructor* — it validates the raw input
and returns a branded value. After this point, any function that accepts `Email` is
guaranteed to receive a validated email address.

### Branded Types Are Still Primitives at Runtime

A crucial property of branded types is that they have zero runtime overhead. The
brand exists only in the type system:

```typescript
const userId = createUserId("user-123");

console.log(typeof userId);        // "string"
console.log(userId.toUpperCase()); // "USER-123" — all string methods work
console.log(userId.length);        // 8
```

The `as UserId` cast does not wrap the value in an object or add any property. It
simply tells the compiler to treat the string as a `UserId`. At runtime, it is still
a plain string.

## Common Pitfalls

- **Forgetting to use constructor functions**: If you allow `as UserId` casts
  everywhere, you lose the validation guarantee. Restrict branding to dedicated
  constructor functions and keep the `as` cast in one place.
- **Using the same brand string for different types**: `Brand<string, "Id">` used
  for both `UserId` and `OrderId` defeats the purpose — they would be the same type.
  Always use distinct brand tags.
- **Over-branding**: Not every string needs a brand. Use branded types for values
  that cross module boundaries or represent distinct domain concepts. Local variables
  rarely need branding.

## Key Takeaways

- Branded types add a phantom property via intersection: `T & { readonly __brand: B }`.
- The brand makes structurally identical types incompatible at compile time.
- Constructor functions validate input and apply the brand via `as` cast.
- Branded values are still plain primitives at runtime — zero overhead.
- Use a `Brand<T, B>` utility type for consistency across your codebase.

<div class="hint">
The branded type pattern is sometimes called "nominal typing emulation" or "tagged
types." It is used extensively in libraries like `io-ts`, `zod`, and `Effect`. Some
teams also use the term "newtype" (borrowed from Haskell) for the same concept.
The key insight is that `unique symbol` creates a type that can never be duplicated,
making each brand truly unique.
</div>
