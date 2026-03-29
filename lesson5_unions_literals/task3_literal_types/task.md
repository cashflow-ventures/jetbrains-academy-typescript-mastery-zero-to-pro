# Literal Types

You've seen that TypeScript has types like `string`, `number`, and `boolean`. But TypeScript can
be much more specific than that. Instead of saying "any string," you can say "exactly this string."
These are called **literal types** — types that represent a single, specific value.

## Core Concept

A literal type is a type that represents exactly one value. TypeScript supports three kinds of
literal types: string literals, numeric literals, and boolean literals.

```typescript
// This variable can ONLY hold the string "hello"
let greeting: "hello" = "hello";
// greeting = "hi";  // Error: Type '"hi"' is not assignable to type '"hello"'

// This variable can ONLY hold the number 42
let answer: 42 = 42;
// answer = 43;  // Error: Type '43' is not assignable to type '42'

// This variable can ONLY hold true
let enabled: true = true;
// enabled = false;  // Error: Type 'false' is not assignable to type 'true'
```

On their own, literal types aren't very useful — a variable that can only hold one value is
basically a constant. The real power comes when you combine literal types with **unions** to
create a set of allowed values:

```typescript
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}

move("north");   // OK
// move("up");   // Error: Argument of type '"up"' is not assignable to type 'Direction'
```

## How It Works

### String Literal Types

String literal types are the most common. They let you define a fixed set of allowed string values:

```typescript
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function setTheme(color: Color, size: Size): void {
    console.log(`Theme: ${color}, ${size}`);
}

setTheme("red", "large");    // OK
// setTheme("purple", "xl"); // Error on both arguments
```

This is much safer than using plain `string` — the compiler catches typos and invalid values
at compile time.

### Numeric Literal Types

Numeric literals work the same way:

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

type HttpSuccessCode = 200 | 201 | 204;
type HttpErrorCode = 400 | 401 | 403 | 404 | 500;
type HttpStatusCode = HttpSuccessCode | HttpErrorCode;
```

### Boolean Literal Types

Boolean literals are `true` and `false`. They're less common on their own but appear in
conditional types and discriminated unions:

```typescript
type LoadingState = { isLoading: true; data: undefined }
                  | { isLoading: false; data: string };
```

### Literal Inference with `const` and `let`

TypeScript infers literal types for `const` declarations but widens to the base type for `let`:

```typescript
const name = "Alice";   // Type: "Alice" (literal)
let greeting = "Hello"; // Type: string (widened)

const count = 42;       // Type: 42 (literal)
let total = 42;         // Type: number (widened)
```

This makes sense: a `const` can never change, so TypeScript knows the exact value. A `let` might
be reassigned, so TypeScript uses the wider type to allow other values.

## Common Pitfalls

- **Confusing literal types with values.** The type `"hello"` is not the same as the value
  `"hello"`. The type describes what values are allowed; the value is the actual data.
- **Forgetting that `let` widens literals.** If you need a literal type from a `let` variable,
  use a type annotation: `let dir: "north" = "north";` or use `as const` (covered later).
- **Using literal types where a general type is needed.** If a function should accept any string,
  use `string`, not a union of every possible string value.

## Key Takeaways

- Literal types represent exactly one value: `"hello"`, `42`, `true`.
- Combine literals with unions to create sets of allowed values: `"red" | "green" | "blue"`.
- `const` declarations infer literal types; `let` declarations widen to the base type.
- Literal unions are a type-safe alternative to magic strings and numbers.
- String literal unions are often preferred over enums for simple value sets.

<div class="hint">
Literal types are one reason TypeScript is so expressive. In many languages, you'd need an enum
to restrict a value to a fixed set. In TypeScript, a simple union of string literals does the
same job with less ceremony — and the values are just plain strings at runtime, with no extra
JavaScript code generated.
</div>
