# Function Overloads

Some functions behave differently depending on what you pass them. TypeScript's function
overloads let you define multiple call signatures for a single function, giving callers
precise type information for each usage pattern.

## Core Concept

A **function overload** consists of two parts:

1. **Overload signatures** — one or more declarations that describe the different ways the
   function can be called. These are what callers see.
2. **Implementation signature** — the single function body that handles all cases. This is
   hidden from callers.

```typescript
// Overload signatures (what callers see)
function padLeft(value: string, padding: number): string;
function padLeft(value: string, padding: string): string;

// Implementation signature (handles all cases)
function padLeft(value: string, padding: number | string): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}

padLeft("hello", 4);       // "    hello" — number overload
padLeft("hello", ">>> ");  // ">>> hello" — string overload
```

The overload signatures tell TypeScript: "this function can be called with a `number` or
a `string` as the second argument." The implementation handles both cases with a type guard.

## How It Works

- Overload signatures are listed first, one per line, without a function body.
- The implementation signature comes last, with a body that handles all overloads.
- Callers can only use the overload signatures — the implementation signature is not directly
  callable.
- The implementation signature must be compatible with all overload signatures.

Here's a more practical example — a function that returns different types based on input:

```typescript
function parseInput(input: string): string;
function parseInput(input: number): number;
function parseInput(input: string | number): string | number {
    if (typeof input === "string") {
        return input.trim();
    }
    return Math.round(input);
}

const trimmed: string = parseInput("  hello  "); // "hello"
const rounded: number = parseInput(3.7);          // 4
```

Without overloads, the return type would be `string | number` for both calls. With overloads,
TypeScript knows that passing a `string` returns a `string`, and passing a `number` returns
a `number`.

### When to Use Overloads

Overloads are most useful when:

- The return type depends on the input type
- The function accepts different argument counts with different behavior
- You want to provide precise types for each calling pattern

```typescript
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: string): HTMLElement {
    return document.createElement(tag);
}
```

## Common Pitfalls

- **Forgetting the implementation signature.** The overload signatures alone don't provide
  a function body. You must include the implementation signature with the actual logic.
- **Making the implementation signature too narrow.** The implementation must accept all
  parameter types from all overloads. If overload 1 takes `string` and overload 2 takes
  `number`, the implementation must accept `string | number`.
- **Using overloads when a union type would suffice.** If the return type doesn't change
  based on input, a simple union parameter is cleaner than overloads:
  ```typescript
  // Prefer this when return type is always the same
  function log(value: string | number): void { ... }
  ```
- **Overload order matters.** TypeScript resolves overloads top-to-bottom. Put more specific
  signatures before more general ones.

## Key Takeaways

- Overload signatures define the different ways a function can be called.
- The implementation signature handles all cases and is not directly visible to callers.
- Use overloads when the return type depends on the input type.
- The implementation must be compatible with all overload signatures.
- Prefer simple union types when overloads aren't needed.

<div class="hint">
A common alternative to overloads is using generics with conditional types. For example,
instead of overloading `parse(input: string): string` and `parse(input: number): number`,
you could write `parse<T extends string | number>(input: T): T`. Generics are often
simpler, but overloads give you more control when the relationship between input and output
types is complex.
</div>
