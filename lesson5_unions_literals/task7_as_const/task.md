# `as const` Assertions

You've seen that `const` declarations infer literal types for primitive values. But what about
objects and arrays? When you write `const colors = ["red", "green", "blue"]`, TypeScript infers
`string[]` — not the specific tuple `["red", "green", "blue"]`. The `as const` assertion fixes
this by telling TypeScript to infer the narrowest possible type for an entire expression.

## Core Concept

The `as const` assertion (also called a **const assertion**) makes TypeScript treat a value as
deeply readonly with literal types at every level:

```typescript
// Without as const — types are widened
const colors = ["red", "green", "blue"];
// Type: string[]

// With as const — types are narrowed to literals
const colorsConst = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]
```

Notice two things happened:
1. The array became a **readonly tuple** — you can't push, pop, or modify it.
2. Each element became a **literal type** — `"red"`, not `string`.

This works on objects too:

```typescript
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retries: 3 }
```

Every property is `readonly` and every value is a literal type.

## How It Works

### Literal Inference for Objects

Without `as const`, object properties are inferred with widened types:

```typescript
const settings = {
    theme: "dark",
    fontSize: 14,
    debug: false,
};
// Type: { theme: string; fontSize: number; debug: boolean }

const settingsConst = {
    theme: "dark",
    fontSize: 14,
    debug: false,
} as const;
// Type: { readonly theme: "dark"; readonly fontSize: 14; readonly debug: false }
```

With `as const`, TypeScript knows that `settingsConst.theme` is exactly `"dark"`, not just any
string. This is crucial when you need to pass these values to functions that expect literal types.

### Readonly Tuples

`as const` turns arrays into readonly tuples:

```typescript
const point = [10, 20] as const;
// Type: readonly [10, 20]

// point.push(30);  // Error: Property 'push' does not exist on type 'readonly [10, 20]'
// point[0] = 5;    // Error: Cannot assign to '0' because it is a read-only property

// But you can read values just fine
const x = point[0]; // Type: 10
const y = point[1]; // Type: 20
```

### Deriving Types from `as const` Values

One of the most powerful uses of `as const` is deriving union types from constant values:

```typescript
const DIRECTIONS = ["north", "south", "east", "west"] as const;
type Direction = typeof DIRECTIONS[number];
// Type: "north" | "south" | "east" | "west"

const STATUS_CODES = { OK: 200, NOT_FOUND: 404, ERROR: 500 } as const;
type StatusCode = typeof STATUS_CODES[keyof typeof STATUS_CODES];
// Type: 200 | 404 | 500
```

This pattern lets you define your values once and derive the type from them — no duplication
between runtime values and types.

### Nested `as const`

The assertion applies recursively to all nested objects and arrays:

```typescript
const menu = {
    items: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
    ],
} as const;
// Every nested property is readonly with literal types
// menu.items[0].label is type "Home", not string
```

## Common Pitfalls

- **Trying to mutate `as const` values.** The `readonly` modifier prevents all mutations. If you
  need to modify the data, create a mutable copy first.
- **Using `as const` on mutable variables.** `as const` works best with `const` declarations.
  Using it with `let` is technically allowed but defeats the purpose since the variable can be
  reassigned.
- **Forgetting `as const` changes the type.** Functions expecting `string[]` won't accept a
  `readonly ["red", "green"]`. You may need to adjust function signatures to accept
  `readonly string[]`.

## Key Takeaways

- `as const` makes TypeScript infer the narrowest possible type: literal types and readonly.
- Arrays become readonly tuples with literal element types.
- Object properties become readonly with literal value types.
- Use `typeof value[number]` to derive a union type from an `as const` array.
- The assertion applies recursively to all nested structures.
- `as const` is a compile-time assertion — it generates no extra JavaScript code.

<div class="hint">
The `as const` assertion was introduced in TypeScript 3.4. Before that, developers had to write
verbose type annotations to get literal inference on objects and arrays. It's one of the most
commonly used TypeScript features in modern codebases — you'll see it everywhere in configuration
objects, route definitions, and constant lookup tables.
</div>
