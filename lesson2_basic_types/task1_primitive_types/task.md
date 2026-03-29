# Primitive Types Overview

TypeScript inherits all of JavaScript's primitive types and gives you the tools to annotate them
explicitly. Understanding these building blocks is essential — every complex type you'll build
later is composed of primitives at its core.

## Core Concept

TypeScript has seven primitive types that map directly to JavaScript's runtime primitives:

| Type | Description | Example |
|------|-------------|---------|
| `string` | Textual data | `"hello"`, `'world'`, `` `template` `` |
| `number` | All numeric values (integer and floating-point) | `42`, `3.14`, `0xff` |
| `boolean` | Logical true/false | `true`, `false` |
| `null` | Intentional absence of a value | `null` |
| `undefined` | Variable declared but not assigned | `undefined` |
| `bigint` | Arbitrarily large integers | `9007199254740991n` |
| `symbol` | Unique, immutable identifiers | `Symbol("id")` |

Each primitive has a corresponding type annotation in TypeScript:

```typescript
const name: string = "Alice";
const age: number = 30;
const active: boolean = true;
const nothing: null = null;
const missing: undefined = undefined;
const huge: bigint = 9007199254740991n;
const id: symbol = Symbol("id");
```

## How It Works

### string, number, boolean — The Big Three

These are the types you'll use most often. TypeScript's `number` type covers integers, floats,
`Infinity`, `-Infinity`, and `NaN` — there's no separate `int` or `float` type.

```typescript
const title: string = "TypeScript Mastery";
const price: number = 29.99;
const isFree: boolean = false;

// Template literals are strings too
const message: string = `The course "${title}" costs $${price}`;
```

### null and undefined

In TypeScript with `strict` mode enabled (which this course uses), `null` and `undefined` are
their own distinct types. You cannot assign `null` to a `string` variable or `undefined` to a
`number` variable without explicitly allowing it.

```typescript
let username: string = "Alice";
// username = null;      // Error: Type 'null' is not assignable to type 'string'
// username = undefined; // Error: Type 'undefined' is not assignable to type 'string'

// To allow null, use a union type (covered in Lesson 5)
let nickname: string | null = "Ali";
nickname = null; // OK
```

### bigint

JavaScript's `number` type can safely represent integers up to `2^53 - 1`. For anything larger,
use `bigint`. You create a bigint by appending `n` to an integer literal or calling `BigInt()`.

```typescript
const maxSafeInt: number = Number.MAX_SAFE_INTEGER; // 9007199254740991
const beyondSafe: bigint = 9007199254740992n;       // No precision loss

// bigint and number are NOT interchangeable
// const mixed = beyondSafe + 1; // Error: can't mix bigint and number
const mixed: bigint = beyondSafe + 1n; // OK — both are bigint
```

### symbol

Symbols are unique identifiers. Every call to `Symbol()` creates a value that is guaranteed to
be different from every other symbol, even if they share the same description string.

```typescript
const sym1: symbol = Symbol("description");
const sym2: symbol = Symbol("description");
console.log(sym1 === sym2); // false — every symbol is unique
```

Symbols are commonly used as object property keys when you need to avoid name collisions.

## Common Pitfalls

- **Using `String`, `Number`, `Boolean` (uppercase) as types.** These refer to the wrapper
  objects, not the primitives. Always use lowercase: `string`, `number`, `boolean`.
- **Mixing `bigint` and `number` in arithmetic.** TypeScript (and JavaScript) won't let you
  add a `bigint` to a `number` directly. You must convert one to match the other.
- **Assuming `null` and `undefined` are the same.** They have different semantics: `null` means
  "intentionally empty," while `undefined` means "not yet assigned." In strict mode, they are
  separate types.
- **Forgetting that `NaN` is a `number`.** `typeof NaN === "number"` is true in JavaScript,
  and TypeScript's `number` type includes `NaN`.

## Key Takeaways

- TypeScript has seven primitive types: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, and `symbol`.
- Always use lowercase type names (`string`, not `String`).
- With `strict` mode, `null` and `undefined` are not assignable to other types without explicit union types.
- `bigint` handles integers beyond `Number.MAX_SAFE_INTEGER`.
- Every `symbol` is unique, even if created with the same description.

<div class="hint">
You might wonder why there's no `int` or `float` type in TypeScript. That's because JavaScript
itself uses a single `number` type (IEEE 754 double-precision floating-point) for all numeric
values. TypeScript mirrors JavaScript's runtime types — it doesn't invent new ones.
</div>

<div class="hint">
The `bigint` type was introduced in ES2020 and TypeScript 3.2. If your `tsconfig.json` targets
an older version (like ES5), you won't be able to use `bigint` literals. This course targets
ES2022, so you're all set.
</div>
