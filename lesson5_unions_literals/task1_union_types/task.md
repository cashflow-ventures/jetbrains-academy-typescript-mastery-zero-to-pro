# Union Types

In the real world, a value isn't always one fixed type. A function might accept a string *or* a
number. An API response might return a success object *or* an error object. TypeScript handles
this with **union types** — a way to say "this value can be one of several types."

## Core Concept

A union type is written with the pipe (`|`) operator between two or more types:

```typescript
let id: string | number;

id = "abc-123";  // OK — string
id = 42;         // OK — number
// id = true;    // Error — boolean is not in the union
```

The type `string | number` means the value can be a `string` or a `number`, but nothing else.
You can union any types together — primitives, objects, arrays, or even other unions.

Union types are one of TypeScript's most powerful features. They let you model real-world data
accurately: a user ID might be a string or number depending on the system, a function might
return a result or `null`, and an event handler might receive different event shapes.

## How It Works

### Declaring Union Types

You can use unions anywhere a type is expected — variables, parameters, return types, and type aliases:

```typescript
// Type alias for reuse
type StringOrNumber = string | number;

// Function parameter
function printId(id: string | number): void {
    console.log(`ID: ${id}`);
}

// Return type
function parseInput(input: string): string | number {
    const parsed = Number(input);
    return isNaN(parsed) ? input : parsed;
}
```

### Narrowing Unions

Here's the catch: when you have a union type, TypeScript only lets you use operations that are
valid for *every* member of the union. You can't call `.toUpperCase()` on a `string | number`
because numbers don't have that method.

To use type-specific operations, you need to **narrow** the type — convince TypeScript which
specific type you're working with:

```typescript
function formatId(id: string | number): string {
    // typeof narrowing
    if (typeof id === "string") {
        // TypeScript knows id is a string here
        return id.toUpperCase();
    }
    // TypeScript knows id is a number here
    return id.toFixed(2);
}
```

TypeScript's **control flow analysis** tracks your `if` checks, `typeof` guards, and other
conditions to automatically narrow the type within each branch. This is one of the language's
most elegant features — you write normal JavaScript checks, and TypeScript understands the
type implications.

### Common Narrowing Techniques

- `typeof x === "string"` — narrows primitives
- `x instanceof Date` — narrows class instances
- `"property" in x` — narrows objects by property existence
- `x === null` or `x !== undefined` — narrows nullable types

### Union Types with Objects

Unions really shine when combining object types. This is a preview of **discriminated unions**
(covered in detail later in this lesson):

```typescript
type Success = { status: "ok"; data: string };
type Failure = { status: "error"; message: string };
type Response = Success | Failure;

function handleResponse(response: Response): string {
    if (response.status === "ok") {
        return response.data;     // TypeScript knows this is Success
    }
    return response.message;      // TypeScript knows this is Failure
}
```

## Common Pitfalls

- **Forgetting to narrow before using type-specific methods.** TypeScript won't let you call
  `.toUpperCase()` on `string | number` — you must check the type first.
- **Using `||` instead of `|` in type positions.** The `||` operator is a JavaScript runtime
  operator. In type annotations, always use a single `|`.
- **Overly wide unions.** A union of 20 types is hard to work with. If your union is growing
  large, consider restructuring with discriminated unions or generics.

## Key Takeaways

- Union types use `|` to combine multiple types: `string | number`.
- TypeScript only allows operations common to all union members until you narrow.
- Narrowing uses runtime checks (`typeof`, `instanceof`, `in`, equality) to tell TypeScript
  which specific type you're working with.
- Unions work with primitives, objects, arrays — any types.
- Discriminated unions (coming soon) add a shared "tag" property for easy narrowing.

<div class="hint">
Union types are closely related to set theory. The type `string | number` is the *union* of the
set of all strings and the set of all numbers. TypeScript's type system is built on these
set-theoretic foundations — intersections (`&`) are set intersections, and `never` is the empty set.
</div>
