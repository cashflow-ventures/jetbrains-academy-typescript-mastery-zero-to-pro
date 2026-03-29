# Generic Inference Patterns

One of TypeScript's most impressive features is its ability to *infer* generic type parameters
from the arguments you pass. Understanding where and how inference happens lets you design APIs
that feel effortless to use — callers rarely need to write angle brackets.

## Core Concept

When you call a generic function, TypeScript examines each argument and tries to figure out
what type each parameter should be. This process is called **type argument inference**.

```typescript
function identity<T>(value: T): T {
    return value;
}

// T is inferred as string — no angle brackets needed
const result = identity("hello");
```

The compiler looks at the *inference sites* — the positions in the function signature where
a type parameter appears — and works backward from the actual argument types.

## How It Works

### Inference Sites

A type parameter can appear in multiple positions. Each position is an inference site:

```typescript
function merge<T>(a: T, b: T): T {
    return { ...a, ...b };
}

// Both arguments are inference sites for T
// TS unifies them: T = { x: number } & { y: number }
```

When a parameter appears in multiple sites, TypeScript tries to find a common type that
satisfies all of them.

### Callback Return Type Inference

TypeScript can infer type parameters from callback return types — this is how `Array.map`
works so well:

```typescript
function transform<T, U>(items: T[], fn: (item: T) => U): U[] {
    return items.map(fn);
}

// T inferred from items (number), U inferred from callback return (string)
const result = transform([1, 2, 3], (n) => String(n)); // string[]
```

The compiler infers `T = number` from the array, then uses that to type the callback
parameter `n`, and finally infers `U = string` from the callback's return expression.

### Inference from Context (Contextual Typing)

When a generic function receives a callback, TypeScript provides contextual types to the
callback parameters:

```typescript
function createHandler<E>(handler: (event: E) => void): (event: E) => void {
    return handler;
}

// E is inferred from the parameter type annotation in the callback
const onClick = createHandler((event: MouseEvent) => {
    console.log(event.clientX);
});
```

### Inference with Constraints

Constraints interact with inference. The inferred type must satisfy the constraint:

```typescript
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

// T inferred as string (which has .length)
const result = longest("hello", "hi"); // string
```

### When Inference Fails

Sometimes TypeScript cannot infer a parameter and falls back to its constraint or `unknown`.
This happens when a parameter only appears in the return type:

```typescript
function createEmpty<T>(): T[] {
    return [];
}

// T cannot be inferred — must be explicit
const nums = createEmpty<number>(); // number[]
```

If there is no inference site in the parameters, you must provide the type argument explicitly.

## Common Pitfalls

- **Over-specifying**: Writing `identity<string>("hello")` when `identity("hello")` works. Let inference do its job.
- **Widening**: TypeScript may infer `string` instead of a literal like `"hello"`. Use `as const` if you need the literal type.
- **Multiple candidates**: When `T` appears in two argument positions with different types, TypeScript picks the best common type — which might be a union or might fail.
- **No inference site**: If a type parameter only appears in the return type, it cannot be inferred and must be provided explicitly.

## Key Takeaways

- TypeScript infers generic type parameters from the arguments at each inference site.
- Callback parameters and return types are powerful inference sites.
- Contextual typing flows type information into callback parameters automatically.
- When inference cannot determine a type, provide it explicitly with angle brackets.
- Design your generic APIs so that the most common usage requires zero explicit type arguments.

<div class="hint">
A well-designed generic API is one where users never need to write angle brackets.
If callers frequently have to specify type arguments manually, consider rearranging
your parameters so inference has better sites to work with.
</div>
