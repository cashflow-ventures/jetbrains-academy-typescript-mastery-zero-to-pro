# Multiple Type Parameters

In Lesson 7 you learned to write generic functions with a single type parameter `<T>`. Real-world code
often needs two, three, or more type parameters that relate to each other. Understanding how to declare
and constrain multiple parameters is the gateway to truly flexible, type-safe abstractions.

## Core Concept

A generic can accept any number of type parameters, separated by commas inside angle brackets.
Each parameter is an independent "slot" the caller fills in — either explicitly or via inference.

```typescript
// Two independent type parameters
function makePair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const pair = makePair("hello", 42); // [string, number]
```

The key insight is that `T` and `U` are resolved independently. TypeScript infers `T` from the
first argument and `U` from the second.

## How It Works

### Independent Parameters

When parameters have no relationship, they simply represent different types flowing through
the function:

```typescript
function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]];
}

const swapped = swap(["hello", 100]); // [number, string]
```

### Constrained Relationships with `extends`

The real power emerges when one parameter constrains another. The most common pattern is
`K extends keyof T`, which says "K must be one of the keys of T":

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age");   // number
// getProperty(user, "email");          // Error: "email" is not in keyof typeof user
```

Here `T` is inferred from the first argument, and `K` is constrained to only accept keys
that actually exist on `T`. The return type `T[K]` is an *indexed access type* — it looks up
the type of property `K` on `T`.

### Transformation Parameters

A common pattern uses one parameter for input and another for output:

```typescript
function transform<Input, Output>(
    value: Input,
    fn: (item: Input) => Output
): Output {
    return fn(value);
}

const length = transform("hello", (s) => s.length); // number
```

TypeScript infers `Input` from the first argument and `Output` from the return type of the
callback. This is the foundation of typed `map`, `filter`, and pipeline functions.

### Default Type Parameters with Multiple Params

You can assign defaults to later parameters while requiring earlier ones:

```typescript
function createState<T, E = Error>(
    initial: T
): { value: T; error: E | null } {
    return { value: initial, error: null };
}

const state = createState(0);          // { value: number; error: Error | null }
const custom = createState<string, string>("ok"); // { value: string; error: string | null }
```

## Common Pitfalls

- **Too many type parameters**: If you have more than 3-4, your API is probably too complex. Refactor into smaller pieces.
- **Unused parameters**: Every type parameter should appear in at least one parameter or the return type. An unused parameter is a code smell.
- **Forgetting the constraint**: Writing `<T, K>` when you mean `<T, K extends keyof T>` loses the relationship between the two parameters and the compiler cannot help you.
- **Order matters**: Parameters with defaults must come after parameters without defaults, just like function arguments.

## Key Takeaways

- Use multiple type parameters when a function deals with two or more independent or related types.
- Constrain parameters with `extends` to express relationships (`K extends keyof T`).
- TypeScript infers each parameter from the argument that uses it.
- The `T[K]` indexed access type lets you look up the type of a specific property.
- Keep the number of type parameters small — clarity beats cleverness.

<div class="hint">
Convention uses single uppercase letters: T (Type), U (second type), K (Key), V (Value),
E (Error/Element). For complex APIs, descriptive names like `Input`, `Output`, or `Config`
are perfectly fine and often clearer.
</div>
