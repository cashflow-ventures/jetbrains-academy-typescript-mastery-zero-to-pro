# Mapped Types Introduction

TypeScript's mapped types let you create new types by transforming every property of an existing type
in a systematic way. They are the mechanism behind built-in utility types like `Partial`, `Required`,
and `Readonly` — and once you understand the syntax, you can build your own.

## Core Concept

A mapped type iterates over a set of keys and produces a new property for each one. The basic
syntax uses the `in` keyword inside an index signature:

```typescript
type MappedType<T> = {
    [K in keyof T]: T[K];
};
```

This reads as: "For each key `K` in the keys of `T`, create a property with the same name and
the same type `T[K]`." The result is an identity transformation — a type identical to `T`. The
power comes from modifying the value type, adding modifiers, or filtering keys.

## How It Works

### The `keyof` + `in` Pattern

The `keyof T` operator produces a union of all property names of `T`. The `in` keyword iterates
over that union, binding each member to `K` one at a time:

```typescript
interface User {
    name: string;
    age: number;
    active: boolean;
}

// keyof User = "name" | "age" | "active"

type UserFlags = {
    [K in keyof User]: boolean;
};
// Result: { name: boolean; age: boolean; active: boolean }
```

Each property of `User` is mapped to `boolean`, regardless of its original type.

### How `Partial<T>` Works

The built-in `Partial<T>` utility type is simply a mapped type that adds the `?` modifier:

```typescript
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

type PartialUser = MyPartial<User>;
// { name?: string; age?: number; active?: boolean }
```

The `?` after the closing bracket makes every property optional. The value type `T[K]` stays
the same — only the optionality changes.

### Mapping Over Arbitrary Unions

You are not limited to `keyof T`. You can map over any union of string literals:

```typescript
type Flags = "darkMode" | "notifications" | "analytics";

type FeatureFlags = {
    [K in Flags]: boolean;
};
// { darkMode: boolean; notifications: boolean; analytics: boolean }
```

This is useful for creating types from known sets of keys without needing a source object type.

### Combining with Indexed Access

Inside the mapping body, `T[K]` is an indexed access type that resolves to the type of
property `K` on `T`. You can wrap it, transform it, or replace it entirely:

```typescript
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; active: boolean | null }
```

```typescript
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getActive: () => boolean }
```

The second example uses key remapping with `as`, which you will learn about in a later task.

## Common Pitfalls

- **Forgetting `keyof`**: Writing `[K in T]` instead of `[K in keyof T]` when `T` is an object type. The `in` keyword expects a union of strings/numbers/symbols, not an object type.
- **Losing modifiers**: A plain mapped type `{ [K in keyof T]: T[K] }` preserves `readonly` and `?` modifiers from the original type. If you want to remove them, you need explicit `-readonly` or `-?` syntax (covered in a later task).
- **Confusing mapped types with index signatures**: `{ [key: string]: boolean }` is an index signature (any string key). `{ [K in "a" | "b"]: boolean }` is a mapped type (exactly keys `a` and `b`). They look similar but behave very differently.

## Key Takeaways

- Mapped types iterate over a union of keys with `[K in Keys]` and produce a property for each key.
- `keyof T` provides the union of property names from an existing type.
- `T[K]` inside the body gives you the original property type for transformation.
- Built-in utilities like `Partial`, `Required`, and `Readonly` are all mapped types under the hood.
- You can map over any string literal union, not just `keyof T`.

<div class="hint">
Mapped types are TypeScript's equivalent of a `for...in` loop, but at the type level.
Just as `for (const key in obj)` iterates over an object's keys at runtime, `[K in keyof T]`
iterates over a type's keys at compile time. This mental model makes the syntax much easier
to remember.
</div>
