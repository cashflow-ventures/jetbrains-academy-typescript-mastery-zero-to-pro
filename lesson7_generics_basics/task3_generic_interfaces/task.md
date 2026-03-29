# Generic Interfaces and Types

Generic functions are powerful, but generics really shine when you apply them to
**interfaces** and **type aliases**. This lets you define reusable data structures
that work with any type — containers, wrappers, response types, and more.

## Core Concept

Just like functions, interfaces and type aliases can accept type parameters. You
declare them after the name:

```typescript
interface Box<T> {
    value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
```

The type parameter `T` becomes available throughout the interface body. When you
use the interface, you provide a concrete type for `T`.

### Generic Type Aliases

Type aliases work the same way:

```typescript
type Pair<A, B> = {
    first: A;
    second: B;
};

const nameAge: Pair<string, number> = { first: "Alice", second: 30 };
const coords: Pair<number, number> = { first: 10, second: 20 };
```

## How It Works

### Generic Interfaces with Methods

Interfaces can include methods that use the type parameter:

```typescript
interface Collection<T> {
    items: T[];
    add(item: T): void;
    getAt(index: number): T | undefined;
}
```

Any object implementing `Collection<string>` must have `items: string[]`, an `add`
method that takes a `string`, and a `getAt` that returns `string | undefined`.

### Extending Generic Interfaces

Generic interfaces can extend other generic interfaces:

```typescript
interface Identifiable {
    id: string;
}

interface Entity<T> extends Identifiable {
    data: T;
    createdAt: Date;
}

// Entity<User> has id, data (of type User), and createdAt
```

### Generic Type Aliases for Unions

Type aliases are especially useful for generic union types — something interfaces
can't express:

```typescript
type Result<T, E> = 
    | { success: true; value: T }
    | { success: false; error: E };

const ok: Result<number, string> = { success: true, value: 42 };
const fail: Result<number, string> = { success: false, error: "not found" };
```

This `Result` pattern is incredibly common in TypeScript for representing operations
that can succeed or fail.

### Generic Function Types

You can also define function types with generics:

```typescript
type Transformer<T, U> = (input: T) => U;

const stringify: Transformer<number, string> = (n) => n.toString();
const parse: Transformer<string, number> = (s) => parseInt(s, 10);
```

## Common Pitfalls

- **Forgetting to provide type arguments.** Unlike generic functions (where TypeScript
  infers `T`), generic interfaces and type aliases usually require explicit type
  arguments: `Box<number>`, not just `Box`.
- **Confusing interface generics with function generics.** `interface Foo<T>` means
  the *entire interface* is parameterized. A method `bar<U>()` inside it introduces
  a *separate* type parameter for that method only.
- **Using interfaces for union types.** Interfaces can't represent `A | B`. If you
  need a generic union type (like `Result<T, E>`), use a type alias.

## Key Takeaways

- Interfaces and type aliases can both accept type parameters with `<T>`.
- Generic interfaces define reusable shapes — containers, collections, API responses.
- Generic type aliases can express unions, which interfaces cannot.
- You can extend generic interfaces just like regular interfaces.
- Type arguments are usually required when using generic interfaces (no inference).

<div class="hint">
A good rule of thumb: use a generic **interface** when you're defining an object shape
that will be implemented or extended. Use a generic **type alias** when you need unions,
intersections, or function types. Both are valid for simple object shapes — it's a
matter of style and consistency with your codebase.
</div>
