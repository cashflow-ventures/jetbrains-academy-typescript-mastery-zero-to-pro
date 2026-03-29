# The `satisfies` Operator

TypeScript 4.9 introduced the `satisfies` operator to solve a long-standing tension: when you
add a type annotation to a variable, TypeScript validates the value but **widens** the inferred
type. You lose the narrow, specific type that TypeScript would have inferred on its own. The
`satisfies` operator lets you have both: type validation *and* narrow inference.

## Core Concept

Consider this common scenario:

```typescript
type ColorConfig = Record<string, string | number[]>;

// With a type annotation — validates but widens
const colors: ColorConfig = {
    primary: "red",
    secondary: [0, 128, 255],
};

// colors.primary is string | number[] — too wide!
// colors.primary.toUpperCase(); // Error: Property 'toUpperCase' does not exist on string | number[]
```

The type annotation ensures the object matches `ColorConfig`, but TypeScript forgets that
`primary` is specifically a `string` and `secondary` is specifically a `number[]`. Both are
widened to `string | number[]`.

Now with `satisfies`:

```typescript
const colors = {
    primary: "red",
    secondary: [0, 128, 255],
} satisfies ColorConfig;

// colors.primary is "red" — literal type preserved!
colors.primary.toUpperCase(); // OK — TypeScript knows it's a string
// colors.secondary is number[] — specific type preserved!
colors.secondary.map(n => n * 2); // OK — TypeScript knows it's number[]
```

The `satisfies` operator validates that the value matches the type but preserves the narrower
inferred type for each property.

## How It Works

### Type Annotation vs `satisfies`

Here's the key difference:

- **Type annotation** (`const x: Type = value`): The variable's type IS `Type`. TypeScript
  forgets anything more specific about the value.
- **`satisfies`** (`const x = value satisfies Type`): TypeScript checks that `value` matches
  `Type`, but the variable's type is whatever TypeScript infers from the value itself.

```typescript
type Theme = { mode: "light" | "dark"; fontSize: number };

// Annotation: theme.mode is "light" | "dark"
const theme1: Theme = { mode: "dark", fontSize: 14 };

// satisfies: theme.mode is "dark" (literal)
const theme2 = { mode: "dark" as const, fontSize: 14 } satisfies Theme;
```

### Error Detection

`satisfies` catches the same errors as a type annotation — missing properties, wrong types,
excess properties (in some cases):

```typescript
type Config = { host: string; port: number };

// Error: Property 'port' is missing
// const bad = { host: "localhost" } satisfies Config;

// Error: Type 'string' is not assignable to type 'number'
// const bad2 = { host: "localhost", port: "3000" } satisfies Config;
```

### Combining with `as const`

The `satisfies` operator pairs beautifully with `as const` for maximum type precision:

```typescript
type Route = { path: string; method: "GET" | "POST" };

const routes = {
    home: { path: "/", method: "GET" },
    login: { path: "/login", method: "POST" },
} as const satisfies Record<string, Route>;

// routes.home.method is "GET" (not "GET" | "POST")
// routes.login.path is "/login" (not string)
```

The `as const` makes everything readonly with literal types, and `satisfies` validates that the
structure matches the expected type. You get the best of both worlds.

### When to Use `satisfies`

Use `satisfies` when you want to:
- Validate that a value matches a type without losing specific type information
- Keep literal types on object properties while ensuring the overall shape is correct
- Combine with `as const` for fully typed configuration objects
- Ensure a value conforms to an interface while preserving autocomplete for specific values

## Common Pitfalls

- **Thinking `satisfies` replaces type annotations.** It doesn't — use type annotations when
  you *want* the wider type (e.g., for mutable variables that will hold different values).
- **Forgetting that `satisfies` doesn't make properties readonly.** Unlike `as const`, the
  `satisfies` operator alone doesn't add `readonly`. Combine with `as const` if you need both.
- **Using `satisfies` on simple primitives.** It's most useful for objects and arrays where
  property-level type narrowing matters. For `const x = 42 satisfies number`, a plain annotation
  works just as well.

## Key Takeaways

- `satisfies` validates a value against a type while preserving the narrower inferred type.
- Type annotations widen; `satisfies` preserves specificity.
- Combine `as const satisfies Type` for readonly + validated + literal types.
- Use it for configuration objects, route tables, theme definitions — anywhere you want both
  validation and precise types.
- Available since TypeScript 4.9.

<div class="hint">
The `satisfies` operator was one of the most requested TypeScript features, with over 600 thumbs-up
on the GitHub issue. It was designed by the TypeScript team after years of community feedback about
the tension between type safety and type inference. The syntax was chosen to read naturally:
"this value satisfies this type."
</div>
