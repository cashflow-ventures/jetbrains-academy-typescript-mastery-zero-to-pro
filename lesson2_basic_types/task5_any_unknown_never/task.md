# The `any`, `unknown`, and `never` Types

Beyond the primitives, TypeScript has three special types that play unique roles in the type
system. Understanding when and why to use each one is critical to writing safe, expressive code.

## Core Concept

| Type | What it means | When to use |
|------|--------------|-------------|
| `any` | Opt out of type checking entirely | Migration from JS, quick prototyping (avoid in production) |
| `unknown` | A value of unknown type — must narrow before use | Accepting external/untrusted data safely |
| `never` | A value that can never exist | Exhaustiveness checks, functions that never return |

### `any` — The Escape Hatch

A variable typed as `any` can hold any value, and you can do anything with it — call methods,
access properties, assign it to any other type. TypeScript won't check any of it.

```typescript
let data: any = "hello";
data = 42;           // OK
data = { x: 1 };    // OK
data.foo.bar.baz;    // OK at compile time — but crashes at runtime!
data.toUpperCase();  // OK at compile time — works only if data is a string
```

Using `any` effectively disables TypeScript for that variable. It's useful when migrating
JavaScript code incrementally, but in new TypeScript code you should almost always prefer
`unknown`.

### `unknown` — The Safe Alternative

Like `any`, a variable typed as `unknown` can hold any value. The key difference: you **cannot**
do anything with an `unknown` value until you narrow its type.

```typescript
let input: unknown = "hello";

// input.toUpperCase(); // Error: Object is of type 'unknown'

// You must narrow first
if (typeof input === "string") {
    console.log(input.toUpperCase()); // OK — TypeScript knows it's a string here
}
```

This makes `unknown` the type-safe counterpart to `any`. Use it whenever you receive data
from an external source (API responses, user input, JSON parsing) and need to validate it
before use.

### `never` — The Impossible Type

The `never` type represents values that can never occur. It appears in two main scenarios:

1. **Functions that never return** — they throw an error or loop forever.
2. **Exhaustiveness checking** — ensuring you've handled every case in a union.

```typescript
// A function that always throws never returns
function throwError(message: string): never {
    throw new Error(message);
}

// Exhaustiveness check with never
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI * 10 * 10;
        case "square":
            return 10 * 10;
        default:
            // If all cases are handled, shape is 'never' here
            const exhaustive: never = shape;
            return exhaustive;
    }
}
```

If you later add `"triangle"` to the `Shape` union but forget to add a case, TypeScript will
error on the `const exhaustive: never = shape` line because `shape` would be `"triangle"`,
which is not assignable to `never`.

## How It Works

Think of these types in terms of what they allow:

- `any`: allows everything — no checking at all
- `unknown`: allows assignment of any value, but requires narrowing before use
- `never`: allows nothing — no value can ever be `never`

In type theory terms:
- `any` is both a top type and a bottom type (it breaks the type system)
- `unknown` is the true top type (every type is assignable to `unknown`)
- `never` is the true bottom type (`never` is assignable to every type)

```typescript
// unknown accepts any value
const a: unknown = 42;
const b: unknown = "hello";
const c: unknown = { x: 1 };

// never accepts no value
// const d: never = 42; // Error: Type 'number' is not assignable to type 'never'
```

## Common Pitfalls

- **Reaching for `any` when `unknown` would work.** If you need to accept any value, use
  `unknown` and narrow it. Reserve `any` for genuine escape-hatch scenarios.
- **Forgetting to narrow `unknown` before use.** TypeScript will block you from using an
  `unknown` value directly — that's the whole point. Use `typeof`, `instanceof`, or custom
  type guards to narrow it.
- **Confusing `never` with `void`.** A `void` function returns `undefined` (it completes
  normally). A `never` function never completes — it throws or loops forever.
- **Not using `never` for exhaustiveness.** The `default: never` pattern is one of the most
  powerful ways to catch missing cases at compile time.

## Key Takeaways

- `any` disables type checking — use it sparingly and only during migration.
- `unknown` is the safe way to accept any value — it forces you to narrow before use.
- `never` represents impossible values — use it for exhaustiveness checks and functions that never return.
- Prefer `unknown` over `any` in all new code.
- The `never` exhaustiveness pattern catches missing union cases at compile time.

<div class="hint">
A good rule of thumb: if you're writing `any` in new TypeScript code, stop and ask yourself
if `unknown` would work instead. In almost every case, it will — and your code will be safer
for it. The TypeScript team themselves recommend `unknown` over `any` in the official handbook.
</div>

<div class="hint">
The `never` type is also what TypeScript infers for impossible intersections. For example,
`string & number` evaluates to `never` because no value can be both a string and a number
at the same time.
</div>
