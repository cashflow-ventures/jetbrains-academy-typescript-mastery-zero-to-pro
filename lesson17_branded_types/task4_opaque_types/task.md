# Opaque Types

Opaque types take the branded type concept further by hiding the internal
representation entirely. With opaque types, consumers of a module cannot see or
depend on the underlying type — they can only create and use values through the
module's exported functions. This provides true encapsulation at the type level.

## Core Concept

An opaque type uses a `unique symbol` declared in module scope to create a brand
that is impossible to replicate outside the module:

```typescript
// currency.ts
declare const CurrencyBrand: unique symbol;

export type USD = number & { readonly [CurrencyBrand]: "USD" };
export type EUR = number & { readonly [CurrencyBrand]: "EUR" };

export function usd(amount: number): USD {
    return amount as USD;
}

export function eur(amount: number): EUR {
    return amount as EUR;
}

export function addUSD(a: USD, b: USD): USD {
    return (a + b) as USD;
}
```

Because `CurrencyBrand` is declared but not exported, no other module can create
the same symbol type. The only way to obtain a `USD` value is through the `usd()`
constructor — the type is *opaque* to the outside world.

## How It Works

### Unique Symbol as a Module-Scoped Key

The `unique symbol` type is TypeScript's way of creating a symbol type that is
guaranteed to be distinct from every other symbol type. When you declare one inside
a module without exporting it, it becomes impossible for external code to reference:

```typescript
// Inside the module:
declare const tag: unique symbol;
type MyOpaque = string & { readonly [tag]: "MyOpaque" };

// Outside the module:
// There is no way to access `tag`, so you cannot construct
// `string & { readonly [tag]: "MyOpaque" }` manually.
// The only way to get a MyOpaque value is through exported functions.
```

This is stronger than the `Brand<T, B>` pattern from the previous task, where
anyone could write `"hello" as Brand<string, "UserId">` to bypass the brand.
With opaque types, the cast is impossible because the symbol type is inaccessible.

### Branded vs Opaque: The Spectrum

| Feature | Type Alias | Branded | Opaque |
|---------|-----------|---------|--------|
| Compile-time safety | None | Yes | Yes |
| Bypass via `as` cast | N/A | Possible | Impossible from outside |
| Validation enforced | No | Optional | Enforced by module |
| Runtime overhead | None | None | None |

Branded types are a pragmatic middle ground — they catch accidental misuse but
can be bypassed with a deliberate cast. Opaque types are stricter — the module
controls all creation and manipulation of values.

### Pattern: Opaque Module

A well-structured opaque type module exports:
1. The opaque type itself
2. Constructor function(s) that validate and brand
3. Operation functions that work with the opaque type
4. An "unwrap" function if consumers need the raw value

```typescript
// temperature.ts
declare const TemperatureBrand: unique symbol;

export type Celsius = number & { readonly [TemperatureBrand]: "Celsius" };
export type Fahrenheit = number & { readonly [TemperatureBrand]: "Fahrenheit" };

export function celsius(value: number): Celsius {
    if (value < -273.15) {
        throw new Error("Temperature below absolute zero");
    }
    return value as Celsius;
}

export function fahrenheit(value: number): Fahrenheit {
    if (value < -459.67) {
        throw new Error("Temperature below absolute zero");
    }
    return value as Fahrenheit;
}

export function celsiusToFahrenheit(c: Celsius): Fahrenheit {
    return ((c * 9) / 5 + 32) as Fahrenheit;
}

export function toNumber(temp: Celsius | Fahrenheit): number {
    return temp as number;
}
```

Consumers import the type and functions, but can never forge a `Celsius` value
without going through the `celsius()` constructor.

### When to Use Opaque Types

Use opaque types when:
- The module owns the domain concept entirely (e.g., currency, temperature, IDs)
- You want to guarantee that all values are validated
- You want to prevent external code from bypassing validation with `as` casts
- You are building a library where type safety is critical

Use simpler branded types when:
- You need quick nominal-like safety without full encapsulation
- The type is used across many modules and strict opacity would be cumbersome
- You trust consumers not to bypass the brand deliberately

## Common Pitfalls

- **Exporting the symbol**: If you export the `unique symbol`, the type is no longer
  opaque — external code can construct values directly. Keep the symbol private.
- **Forgetting arithmetic re-branding**: Operations like `a + b` on branded numbers
  return plain `number`. You must re-cast the result: `(a + b) as USD`.
- **Over-engineering**: Not every type needs to be opaque. Reserve this pattern for
  types where incorrect values could cause real harm (financial amounts, security
  tokens, validated inputs).

## Key Takeaways

- Opaque types use a non-exported `unique symbol` as the brand key.
- External code cannot forge opaque values — only the module's constructors can create them.
- This enforces validation at the boundary with no runtime overhead.
- Opaque types are stricter than branded types — use them when encapsulation matters.
- Export the type, constructors, operations, and optionally an unwrap function.

<div class="hint">
The opaque type pattern is inspired by ML-family languages (OCaml, Haskell) where
abstract types are a first-class feature. In those languages, a module can export a
type without revealing its representation. TypeScript's `unique symbol` trick achieves
a similar effect — the type is exported, but its internal structure is hidden behind
a symbol that only the defining module can access.
</div>
