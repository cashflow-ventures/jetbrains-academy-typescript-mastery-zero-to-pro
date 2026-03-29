# `keyof` and Indexed Access Types

Two of TypeScript's most powerful type operators are `keyof` and indexed access (`T[K]`).
Together they let you write functions that are perfectly typed for any object shape — the
compiler knows exactly which keys exist and what type each value has.

## Core Concept

### The `keyof` Operator

`keyof T` produces a union of all known property names of type `T` as string literal types:

```typescript
interface User {
    name: string;
    age: number;
    active: boolean;
}

type UserKeys = keyof User; // "name" | "age" | "active"
```

This union is computed at compile time. If you add a property to `User`, `keyof User`
automatically includes it.

### Indexed Access Types — `T[K]`

Just as you access a property at runtime with `obj[key]`, you can access a *type* of a
property with `T[K]`:

```typescript
type NameType = User["name"];       // string
type AgeType = User["age"];         // number
type AllValues = User[keyof User];  // string | number | boolean
```

The bracket syntax works with literal types, unions of literals, and `keyof`.

## How It Works

### Type-Safe Property Access

Combining `keyof` with generics gives you fully typed property lookup:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { name: "Alice", age: 30, active: true };

const n = getProperty(user, "name");   // type: string
const a = getProperty(user, "age");    // type: number
// getProperty(user, "email");         // Error!
```

The constraint `K extends keyof T` ensures only valid keys are accepted. The return type
`T[K]` narrows to the exact property type — not a vague `string | number | boolean`.

### Setting Properties Safely

The same pattern works for setters:

```typescript
function setProperty<T, K extends keyof T>(
    obj: T,
    key: K,
    value: T[K]
): void {
    obj[key] = value;
}

setProperty(user, "age", 31);       // OK
// setProperty(user, "age", "old"); // Error: string not assignable to number
```

### Indexed Access with Arrays

You can use `number` as an index to get the element type of an array or tuple:

```typescript
type StringArray = string[];
type Element = StringArray[number]; // string

type Tuple = [string, number, boolean];
type First = Tuple[0];   // string
type Second = Tuple[1];  // number
```

### Nested Indexed Access

Chain indexed access to reach nested types:

```typescript
interface Config {
    db: {
        host: string;
        port: number;
    };
    cache: {
        ttl: number;
    };
}

type DbHost = Config["db"]["host"]; // string
type CacheTtl = Config["cache"]["ttl"]; // number
```

## Common Pitfalls

- **`keyof` on `any`**: `keyof any` is `string | number | symbol`, which is rarely what you want. Always constrain your generics.
- **Forgetting the constraint**: `T[K]` only works when the compiler knows `K` is a valid key of `T`. Without `K extends keyof T`, you get an error.
- **Index signatures change `keyof`**: If a type has `[key: string]: unknown`, then `keyof` includes `string`, which may be broader than expected.
- **`keyof` returns string literals**: Even for numeric keys in objects, `keyof` returns string literal types (e.g., `"0" | "1"` for tuples also includes `number`).

## Key Takeaways

- `keyof T` gives you a union of all property name literals of `T`.
- `T[K]` looks up the type of property `K` on type `T`.
- Combining `<T, K extends keyof T>` with return type `T[K]` gives perfectly typed property access.
- Indexed access works with literal types, unions, `number` (for arrays), and can be chained for nested types.
- These operators are the foundation for mapped types and many advanced patterns you will learn next.

<div class="hint">
`keyof` and indexed access are the building blocks of utility types like `Pick<T, K>`,
`Omit<T, K>`, and `Record<K, V>`. Understanding them deeply makes those utilities intuitive
rather than magical.
</div>
