# Key Remapping

TypeScript 4.1 introduced the `as` clause in mapped types, giving you the power to rename,
filter, and transform property keys during mapping. Before this feature, you could only
change property *values* — now you can reshape the entire key structure of a type.

## Core Concept

The `as` clause appears after the `in` keyword and before the colon. It lets you compute
a new key name from the original key:

```typescript
type Renamed<T> = {
    [K in keyof T as NewKey]: T[K];
};
```

Where `NewKey` is any expression that resolves to a string, number, or symbol — or `never`
to filter the key out entirely.

## How It Works

### Renaming Keys with Template Literals

The most common use case combines `as` with template literal types to create prefixed,
suffixed, or otherwise transformed property names:

```typescript
interface User {
    name: string;
    age: number;
    active: boolean;
}

type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getActive: () => boolean }
```

The `string & K` intersection is needed because `keyof T` can include `number` and `symbol`
keys, but `Capitalize` only works on strings. The intersection narrows `K` to just the string
keys.

### Filtering Keys with `never`

When the `as` clause resolves to `never`, that property is excluded from the result. This
lets you filter properties by their value type:

```typescript
type StringKeysOnly<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStrings = StringKeysOnly<User>;
// { name: string }
```

Only properties whose value type extends `string` survive the mapping. The conditional
`T[K] extends string ? K : never` acts as a type-level filter.

### Combining Rename and Filter

You can rename and filter in the same mapped type:

```typescript
type StringGetters<T> = {
    [K in keyof T as T[K] extends string
        ? `get${Capitalize<string & K>}`
        : never
    ]: () => T[K];
};

type Result = StringGetters<User>;
// { getName: () => string }
```

Only string-valued properties are included, and their keys are renamed to getter style.

### Remapping with Unions

The `as` clause can produce a union, which creates multiple properties from a single source key:

```typescript
type ReadWrite<T> = {
    [K in keyof T as `get${Capitalize<string & K>}` | `set${Capitalize<string & K>}`]: T[K];
};
```

This creates both a getter and setter key for each original property.

## Common Pitfalls

- **Forgetting `string & K`**: Using `Capitalize<K>` directly fails when `K` might be `number` or `symbol`. Always intersect with `string` first: `Capitalize<string & K>`.
- **Accidental `never` removal**: If your conditional in the `as` clause is wrong, you might filter out all keys and end up with an empty type `{}`. Double-check your `extends` conditions.
- **Readability**: Complex `as` clauses with nested conditionals and template literals can become hard to read. Extract helper types when the expression gets long.

## Key Takeaways

- The `as` clause in mapped types lets you rename keys: `[K in keyof T as NewKey]`.
- Mapping a key to `never` removes it from the output — this is how you filter properties.
- Template literal types (`\`get${Capitalize<string & K>}\``) are the primary tool for key renaming.
- You can combine filtering and renaming in a single mapped type.
- Use `string & K` to narrow `K` to string keys when using string manipulation types.

<div class="hint">
Key remapping is the foundation of many advanced patterns in TypeScript libraries. For example,
Prisma generates types like `findUnique`, `findMany`, `create`, `update` for each model — this
is conceptually the same as mapping over model names and producing method signatures with
renamed keys.
</div>
