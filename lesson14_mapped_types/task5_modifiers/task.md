# Mapped Type Modifiers

Mapped types can do more than just iterate over keys — they can add or remove the `readonly`
and `?` (optional) modifiers on each property. TypeScript provides explicit `+` and `-` prefixes
to control these modifiers precisely, giving you fine-grained control over the shape of your types.

## Core Concept

Every property in TypeScript can have two independent modifiers:
- `readonly` — prevents assignment after initialization
- `?` — makes the property optional (adds `undefined` to the type)

In a mapped type, you can add or remove either modifier using `+` (add) or `-` (remove):

```typescript
type AddReadonly<T> = {
    +readonly [K in keyof T]: T[K];
};

type RemoveOptional<T> = {
    [K in keyof T]-?: T[K];
};
```

## How It Works

### The `+` and `-` Prefixes

The `+` prefix explicitly adds a modifier, and `-` explicitly removes it. When no prefix
is specified, `+` is implied:

```typescript
// These two are identical:
type A<T> = { readonly [K in keyof T]: T[K] };
type B<T> = { +readonly [K in keyof T]: T[K] };

// These two are identical:
type C<T> = { [K in keyof T]?: T[K] };
type D<T> = { [K in keyof T]+?: T[K] };
```

The `-` prefix is where the real power lies — it lets you *remove* modifiers that exist
on the source type.

### Removing `readonly` with `-readonly`

The built-in `Readonly<T>` adds `readonly` to all properties. But what if you need the
reverse — making a frozen type mutable again?

```typescript
interface FrozenConfig {
    readonly host: string;
    readonly port: number;
    readonly debug: boolean;
}

type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

type EditableConfig = Mutable<FrozenConfig>;
// { host: string; port: number; debug: boolean }
```

The `-readonly` prefix strips the `readonly` modifier from every property.

### Removing `?` with `-?`

The built-in `Partial<T>` adds `?` to all properties. The reverse — making all properties
required — uses `-?`:

```typescript
interface PartialUser {
    name?: string;
    age?: number;
    active?: boolean;
}

type Concrete<T> = {
    [K in keyof T]-?: T[K];
};

type RequiredUser = Concrete<PartialUser>;
// { name: string; age: number; active: boolean }
```

This is exactly how the built-in `Required<T>` works under the hood.

### Combining Modifiers

You can apply both modifier changes in a single mapped type:

```typescript
type MutableRequired<T> = {
    -readonly [K in keyof T]-?: T[K];
};

type ReadonlyPartial<T> = {
    +readonly [K in keyof T]+?: T[K];
};
```

`MutableRequired<T>` strips both `readonly` and `?` from every property — the most
"unlocked" version of any type. `ReadonlyPartial<T>` adds both — the most "locked down"
version.

### Modifier Preservation

A plain mapped type `{ [K in keyof T]: T[K] }` with no explicit modifier prefix
*preserves* the original modifiers. This is called homomorphic mapping:

```typescript
interface Mixed {
    readonly id: string;
    name?: string;
    age: number;
}

type Identity<T> = { [K in keyof T]: T[K] };
type Result = Identity<Mixed>;
// { readonly id: string; name?: string; age: number }
// Modifiers are preserved!
```

## Common Pitfalls

- **Confusing `+` and `-`**: Remember that `+` is the default. Writing `readonly` without a prefix adds it. You only need `-` to remove an existing modifier.
- **`-?` removes `undefined` from the union**: When you use `-?`, TypeScript also removes `undefined` from the property type if it was added by the `?` modifier. A property typed as `string | undefined` with `?` becomes just `string` after `-?`.
- **Non-homomorphic mapped types lose modifiers**: If you map over a custom union instead of `keyof T`, modifiers from the original type are not preserved. Only `keyof T` triggers homomorphic behavior.

## Key Takeaways

- Use `+readonly` or just `readonly` to add the readonly modifier to mapped properties.
- Use `-readonly` to remove readonly, creating a mutable version of a type.
- Use `+?` or just `?` to make mapped properties optional.
- Use `-?` to remove optionality, making all properties required.
- A plain mapped type with `keyof T` preserves the original modifiers (homomorphic mapping).
- The built-in `Required<T>` is simply `{ [K in keyof T]-?: T[K] }`.

<div class="hint">
Think of `+` and `-` as toggle switches on each property. Every property has two switches:
`readonly` and `?`. A mapped type can flip either switch on (`+`) or off (`-`) for every
property at once. No prefix means "leave the switch where it is" for homomorphic mappings,
or "turn it on" when explicitly written.
</div>
