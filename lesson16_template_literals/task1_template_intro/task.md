# Template Literal Types Introduction

Template literal types bring the power of JavaScript's template literal strings to the
type system. They let you construct new string literal types by interpolating other types
inside backtick-delimited templates — and when combined with union types, they produce
every possible combination automatically.

## Core Concept

A template literal type uses the same backtick syntax as JavaScript template strings,
but operates entirely at the type level:

```typescript
type Greeting = `Hello, ${string}`;
```

This type matches any string that starts with `"Hello, "`. But the real power emerges
when you interpolate specific literal types or unions:

```typescript
type Color = "red" | "green" | "blue";
type Shade = "light" | "dark";

type ColorVariant = `${Shade}-${Color}`;
// "light-red" | "light-green" | "light-blue" |
// "dark-red"  | "dark-green"  | "dark-blue"
```

TypeScript computes the full Cartesian product of all union members. Two unions with
2 and 3 members produce 2 × 3 = 6 resulting string literals.

## How It Works

### Basic Syntax

Template literal types accept any type that is assignable to `string | number | bigint | boolean | null | undefined`:

```typescript
type EventName = `on${string}`;          // matches "onClick", "onHover", etc.
type Port = `port:${number}`;            // matches "port:3000", "port:8080", etc.
type Toggle = `is${boolean}`;            // "istrue" | "isfalse"
```

When you use a broad type like `string` or `number`, the result is a pattern type that
matches infinitely many strings. When you use specific literals or unions, you get a
finite set of exact string literals.

### Union Expansion

The most common use case is combining string literal unions to generate all valid
combinations:

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiVersion = "v1" | "v2";

type ApiEndpoint = `/${ApiVersion}/${string}`;
// Matches "/v1/users", "/v2/orders", etc.

type MethodLabel = `${HttpMethod} request`;
// "GET request" | "POST request" | "PUT request" | "DELETE request"
```

Each union member is substituted independently, and the results are collected into
a new union. This is called *distributive expansion*.

### Combining Multiple Unions

When a template contains multiple union-typed placeholders, TypeScript produces every
combination:

```typescript
type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank = "A" | "K" | "Q" | "J" | "10";

type Card = `${Rank} of ${Suit}`;
// "A of hearts" | "A of diamonds" | ... | "10 of spades"
// 5 × 4 = 20 total members
```

Be mindful of the size — two unions of 10 members each produce 100 string literals.
TypeScript caps union expansion at around 100,000 members before raising an error.

### Practical Example: CSS Properties

Template literal types are perfect for modeling string-based APIs:

```typescript
type CSSUnit = "px" | "em" | "rem" | "%";
type CSSValue = `${number}${CSSUnit}`;

function setWidth(value: CSSValue): void {
    console.log(`Setting width to ${value}`);
}

setWidth("100px");   // OK
setWidth("1.5em");   // OK
// setWidth("100");  // Error — missing unit
```

### Building Event Names

A classic use case is generating event handler names from a base set:

```typescript
type DOMEvent = "click" | "scroll" | "mouseover";
type EventHandler = `on${Capitalize<DOMEvent>}`;
// "onClick" | "onScroll" | "onMouseover"
```

Here `Capitalize` is one of TypeScript's intrinsic string manipulation types — you will
learn about those in the next task.

## Common Pitfalls

- **Explosive union size**: Combining large unions can produce enormous types. `A | B | ... (50 members)` × `X | Y | ... (50 members)` = 2,500 members. Keep unions small or use `string` as a fallback.
- **Forgetting that `number` is broad**: `\`port:${number}\`` matches `"port:3.14"` and `"port:-1"` too — it is a pattern type, not a validator.
- **Template literals are not runtime strings**: These types exist only at compile time. They do not create or validate strings at runtime — you still need runtime checks for user input.

## Key Takeaways

- Template literal types use `` `${A}_${B}` `` syntax to construct string literal types.
- Interpolating unions produces the Cartesian product of all members.
- They work with `string`, `number`, `bigint`, `boolean`, `null`, and `undefined`.
- Use them to model string-based APIs, event names, CSS values, and route patterns.
- Combine with intrinsic types like `Capitalize` for case transformations.

<div class="hint">
Template literal types were introduced in TypeScript 4.1. They are the type-level
equivalent of JavaScript's tagged template literals — but instead of producing runtime
strings, they produce compile-time string literal types. Think of them as a "string
type constructor" that lets you build precise string types from smaller pieces.
</div>
