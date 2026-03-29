# Discriminated Unions

You've seen union types and literal types separately. Now it's time to combine them into one of
TypeScript's most powerful patterns: **discriminated unions** (also called tagged unions). This
pattern lets you model data that can take different shapes, with TypeScript automatically
narrowing to the right shape based on a shared "tag" property.

## Core Concept

A discriminated union is a union of object types where each type has a common property (the
**discriminant** or **tag**) with a unique literal value. TypeScript uses this tag to narrow
the union in `switch` statements and `if` checks.

```typescript
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // TypeScript knows shape is Circle here
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            // TypeScript knows shape is Rectangle here
            return shape.width * shape.height;
    }
}
```

The `kind` property is the discriminant. Each member of the union has a different literal value
for `kind`, so TypeScript can determine which type you're working with by checking that one
property.

## How It Works

### The Three Requirements

For a discriminated union to work, you need:

1. **A common property** — every member of the union has the same property name (e.g., `kind`,
   `type`, `tag`, `status`).
2. **Literal types** — the common property uses literal types (string literals are most common).
3. **Unique values** — each member has a different literal value for the common property.

```typescript
// Each type has a "type" property with a unique string literal
type TextMessage = { type: "text"; content: string };
type ImageMessage = { type: "image"; url: string; width: number; height: number };
type VideoMessage = { type: "video"; url: string; duration: number };

type Message = TextMessage | ImageMessage | VideoMessage;
```

### Narrowing with `switch`

The `switch` statement is the most natural way to handle discriminated unions:

```typescript
function renderMessage(msg: Message): string {
    switch (msg.type) {
        case "text":
            return `Text: ${msg.content}`;
        case "image":
            return `Image: ${msg.url} (${msg.width}x${msg.height})`;
        case "video":
            return `Video: ${msg.url} (${msg.duration}s)`;
    }
}
```

Inside each `case`, TypeScript narrows `msg` to the specific type that matches. You get full
autocomplete and type safety for the properties of that specific variant.

### Exhaustiveness Checking

One of the biggest benefits of discriminated unions is **exhaustiveness checking**. If you add
a new variant to the union but forget to handle it, TypeScript can catch the mistake:

```typescript
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

function getMessagePreview(msg: Message): string {
    switch (msg.type) {
        case "text":
            return msg.content.slice(0, 50);
        case "image":
            return "[Image]";
        case "video":
            return "[Video]";
        default:
            return assertNever(msg); // Compile error if a case is missing
    }
}
```

If you later add an `AudioMessage` to the union but forget to add a `case "audio"` branch,
TypeScript will report an error at the `assertNever` call because `msg` won't be `never` — it
could still be `AudioMessage`.

### Real-World Use Cases

Discriminated unions are everywhere in real TypeScript code:

- **API responses**: `{ status: "success"; data: T } | { status: "error"; message: string }`
- **Redux actions**: `{ type: "ADD_TODO"; text: string } | { type: "TOGGLE_TODO"; id: number }`
- **State machines**: `{ state: "idle" } | { state: "loading" } | { state: "done"; result: T }`
- **AST nodes**: `{ kind: "literal"; value: number } | { kind: "binary"; op: string; left: Node; right: Node }`

## Common Pitfalls

- **Forgetting the discriminant property.** Without a shared tag, TypeScript can't narrow the
  union automatically. You'd need manual `in` checks or type guards instead.
- **Using non-literal types for the tag.** The discriminant must be a literal type (`"circle"`,
  not `string`). If the tag is typed as `string`, narrowing won't work.
- **Not handling all cases.** Without exhaustiveness checking, adding a new variant silently
  falls through. Always use a `default: assertNever(x)` pattern or enable `noImplicitReturns`.

## Key Takeaways

- Discriminated unions combine union types with literal types for type-safe branching.
- Every member shares a common "tag" property with a unique literal value.
- `switch` on the tag property to narrow to the specific type in each branch.
- Use exhaustiveness checking (`never`) to catch unhandled cases at compile time.
- This pattern is ideal for modeling data with multiple shapes: API responses, events, state machines.

<div class="hint">
The discriminated union pattern is sometimes called an "algebraic data type" (ADT) — a concept
from functional programming languages like Haskell and Rust. TypeScript's implementation is
particularly elegant because it works with plain JavaScript objects and requires no special
syntax beyond what you already know: object types, literal types, and unions.
</div>
