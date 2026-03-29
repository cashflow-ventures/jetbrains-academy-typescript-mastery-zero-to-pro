# Exclude, Extract, and NonNullable

While `Pick` and `Omit` work on object properties, `Exclude`, `Extract`, and `NonNullable`
work on **union types**. They filter the members of a union based on assignability, letting
you narrow or reshape unions without manually listing every member.

## Core Concept

```typescript
// Simplified definitions
type Exclude<T, U>    = T extends U ? never : T;
type Extract<T, U>    = T extends U ? T : never;
type NonNullable<T>   = T extends null | undefined ? never : T;
```

These are **conditional types** that distribute over unions. For each member of `T`, the
condition is checked independently:

```typescript
type AllEvents = "click" | "scroll" | "keydown" | "keyup";

type MouseEvents = Extract<AllEvents, "click" | "scroll">;
// "click" | "scroll"

type KeyboardEvents = Exclude<AllEvents, "click" | "scroll">;
// "keydown" | "keyup"
```

## How It Works

### Exclude — remove members from a union

`Exclude<T, U>` keeps only the members of `T` that are **not** assignable to `U`:

```typescript
type Primitive = string | number | boolean | null | undefined;

// Remove null and undefined
type DefinedPrimitive = Exclude<Primitive, null | undefined>;
// string | number | boolean

// Remove string
type NonString = Exclude<Primitive, string>;
// number | boolean | null | undefined
```

### Extract — keep only matching members

`Extract<T, U>` is the opposite — it keeps only the members of `T` that **are** assignable to `U`:

```typescript
type Mixed = string | number | (() => void) | boolean;

// Keep only function types
type Functions = Extract<Mixed, Function>;
// () => void

// Keep only primitives assignable to string | number
type StringOrNumber = Extract<Mixed, string | number>;
// string | number
```

### NonNullable — strip null and undefined

`NonNullable<T>` is a specialized `Exclude` that removes `null` and `undefined`:

```typescript
type MaybeString = string | null | undefined;

type DefiniteString = NonNullable<MaybeString>;
// string
```

This is equivalent to `Exclude<T, null | undefined>` but more readable and idiomatic.

### Practical example: filtering event types

```typescript
type AppEvent =
    | { type: "user_login"; userId: string }
    | { type: "user_logout"; userId: string }
    | { type: "page_view"; url: string }
    | { type: "error"; message: string };

// Extract only user-related events
type UserEvent = Extract<AppEvent, { type: "user_login" | "user_logout" }>;
// { type: "user_login"; userId: string } | { type: "user_logout"; userId: string }

// Exclude error events
type NonErrorEvent = Exclude<AppEvent, { type: "error" }>;
```

## Common Pitfalls

- **Distribution is automatic**: `Exclude<"a" | "b" | "c", "a">` checks each member
  individually. This is usually what you want, but can be surprising with complex types.
- **`Exclude` and `Extract` work on unions, not object keys**: To exclude object properties,
  use `Omit`. To filter union members, use `Exclude`/`Extract`.
- **`NonNullable` does not affect nested properties**: `NonNullable<{ name: string | null }>`
  is still `{ name: string | null }` — it only strips `null`/`undefined` from the top-level union.

## Key Takeaways

- `Exclude<T, U>` removes union members assignable to `U`.
- `Extract<T, U>` keeps only union members assignable to `U`.
- `NonNullable<T>` removes `null` and `undefined` from a union.
- All three are conditional types that distribute over unions.
- Use them to reshape unions without manually listing every member.

<div class="hint">
Think of `Exclude` as a filter that removes items, and `Extract` as a filter that keeps items.
`NonNullable` is just `Exclude<T, null | undefined>` with a friendlier name.
</div>
