# Introduction to Generics

Imagine writing a function that works with *any* type — numbers, strings, objects — without
losing type safety. That's exactly what generics give you. They let you write reusable code
that adapts to whatever type the caller provides, while TypeScript still checks everything
at compile time.

## Core Concept

A **generic** is a type parameter — a placeholder for a type that gets filled in later.
You declare it with angle brackets (`<T>`) and use it like a variable, but for types:

```typescript
function identity<T>(value: T): T {
    return value;
}

// TypeScript infers T from the argument
const num = identity(42);        // T is number, num: number
const str = identity("hello");   // T is string, str: string

// Or you can specify T explicitly
const explicit = identity<boolean>(true); // T is boolean
```

Without generics, you'd have two bad options:

1. **Use `any`** — works for any type, but you lose all type information:
   ```typescript
   function identityAny(value: any): any {
       return value;
   }
   const result = identityAny("hello"); // result: any — TypeScript has no idea it's a string
   ```

2. **Write separate functions** for each type — correct but tedious:
   ```typescript
   function identityString(value: string): string { return value; }
   function identityNumber(value: number): number { return value; }
   // ... and so on for every type you need
   ```

Generics give you the best of both worlds: one function, full type safety.

## How It Works

When you call a generic function, TypeScript performs **type argument inference** — it looks
at the arguments you pass and figures out what `T` should be:

```typescript
function wrap<T>(value: T): { wrapped: T } {
    return { wrapped: value };
}

const a = wrap(42);         // { wrapped: number }
const b = wrap("hello");    // { wrapped: string }
const c = wrap([1, 2, 3]);  // { wrapped: number[] }
```

The type parameter `T` flows through the entire function signature. Whatever type goes in
as `T` comes out wherever `T` appears in the return type.

### Multiple Type Parameters

You can use more than one type parameter when a function works with multiple independent types:

```typescript
function makePair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

const pair = makePair("hello", 42); // [string, number]
```

### Naming Conventions

By convention, single uppercase letters are used for type parameters:
- `T` — the most common, stands for "Type"
- `U`, `V` — additional type parameters
- `K` — key type (often used with objects)
- `V` — value type
- `E` — element or error type

These are just conventions — you can use any valid identifier, but short names keep
generic signatures readable.

## Common Pitfalls

- **Using `any` instead of generics.** If you find yourself writing `any` for a parameter
  that should preserve its type through the function, you probably want a generic instead.
- **Over-genericizing.** Not every function needs to be generic. If a function only ever
  works with strings, just type it as `string`. Use generics when the function genuinely
  works with multiple types.
- **Forgetting that `T` is unknown inside the function.** Inside a generic function, you
  can't call `.toUpperCase()` on `T` because TypeScript doesn't know `T` is a string.
  You'll learn how to constrain `T` later in this lesson.

## Key Takeaways

- Generics let you write reusable, type-safe code with type parameters like `<T>`.
- TypeScript infers type arguments from the values you pass — you rarely need to specify them.
- Generics preserve type information that `any` would erase.
- Use multiple type parameters (`<A, B>`) when a function works with multiple independent types.
- Inside a generic function, `T` is treated as an unknown type — you can only use operations
  that work on *all* types.

<div class="hint">
Think of generics like function parameters, but for types. A regular parameter says "give me
a value and I'll use it." A type parameter says "give me a type and I'll use it throughout
my signature." Just as you wouldn't hardcode a value when you could accept a parameter,
you shouldn't hardcode a type when you could accept a type parameter.
</div>
