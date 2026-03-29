# Distributive Conditional Types

When you pass a union type to a conditional type, something surprising happens: TypeScript
evaluates the condition for each member of the union individually and combines the results.
This behavior is called distribution, and understanding it is essential for writing correct
conditional types.

## Core Concept

A conditional type `T extends U ? X : Y` is distributive when `T` is a naked type parameter.
"Naked" means the type parameter appears directly — not wrapped in a tuple, array, or other
type constructor. When a union is passed, TypeScript splits it apart:

```typescript
type IsString<T> = T extends string ? true : false;

// string | number distributes:
type Result = IsString<string | number>;
// = IsString<string> | IsString<number>
// = true | false
// = boolean
```

Each union member is evaluated independently, and the results are unioned back together.

## How It Works

### Distribution in Action

Consider the built-in `Exclude` type:

```typescript
type Exclude<T, U> = T extends U ? never : T;

type Result = Exclude<"a" | "b" | "c", "a" | "c">;
// Step 1: "a" extends "a" | "c" ? never : "a"  → never
// Step 2: "b" extends "a" | "c" ? never : "b"  → "b"
// Step 3: "c" extends "a" | "c" ? never : "c"  → never
// Combined: never | "b" | never = "b"
```

TypeScript processes each member of the input union separately, then unions the results.
Since `never` is the empty type, it disappears from the final union.

### When Distribution Happens

Distribution occurs only when ALL of these conditions are met:

1. The checked type is a **naked type parameter** (e.g., `T`, not `T[]` or `[T]`)
2. The type parameter receives a **union type** as its argument
3. The conditional type is in a **generic context** (uses a type parameter)

```typescript
// Distributes — T is naked
type ToArray<T> = T extends any ? T[] : never;
type Result1 = ToArray<string | number>;  // string[] | number[]

// Does NOT distribute — T is wrapped in a tuple
type ToArray2<T> = [T] extends [any] ? T[] : never;
type Result2 = ToArray2<string | number>;  // (string | number)[]
```

Notice the critical difference: `ToArray` produces `string[] | number[]` (a union of arrays),
while `ToArray2` produces `(string | number)[]` (a single array of the union).

### Preventing Distribution with `[T] extends [U]`

Sometimes distribution is not what you want. Wrapping both sides of the `extends` check
in square brackets (a one-element tuple) prevents distribution:

```typescript
type IsNever<T> = T extends never ? true : false;
type IsNeverSafe<T> = [T] extends [never] ? true : false;

type A = IsNever<never>;      // never (unexpected!)
type B = IsNeverSafe<never>;  // true (correct!)
```

The first version distributes over `never`. Since `never` is the empty union (zero members),
there is nothing to distribute over, and the result is `never` — not `true` or `false`.
The tuple-wrapped version avoids distribution and correctly evaluates to `true`.

### The `never` Trap

The `never` type is the empty union — it has zero members. When a distributive conditional
type receives `never`, it distributes over zero members and produces `never`:

```typescript
type Example<T> = T extends string ? "yes" : "no";

type R = Example<never>;  // never — not "yes" or "no"!
```

This is one of the most common sources of confusion with conditional types. Always use
the `[T] extends [never]` pattern when you need to detect `never` specifically.

## Common Pitfalls

- **Unexpected `boolean` results**: `IsString<string | number>` gives `boolean` (which is `true | false`), not `true` or `false`. This is distribution at work — each member evaluates separately.
- **The `never` disappearing act**: Passing `never` to a distributive conditional type always produces `never`, regardless of the branches. Use tuple wrapping to handle `never` correctly.
- **Accidental distribution**: When you want to check a union as a whole (e.g., "is this type exactly `string | number`?"), you must prevent distribution with `[T] extends [U]`.

## Key Takeaways

- Conditional types distribute over union types when the checked type is a naked type parameter.
- Distribution evaluates each union member independently and unions the results.
- Wrap both sides in tuples `[T] extends [U]` to prevent distribution.
- `never` is the empty union — distributive conditional types over `never` produce `never`.
- Built-in types like `Exclude` and `Extract` rely on distribution to filter union members.

<div class="hint">
A helpful mental model: distribution is like `Array.map()` for unions. Just as
`[1, 2, 3].map(fn)` applies `fn` to each element, `SomeType<A | B | C>` applies
the conditional to each member. And just as mapping over an empty array gives an
empty array, distributing over `never` (the empty union) gives `never`.
</div>
