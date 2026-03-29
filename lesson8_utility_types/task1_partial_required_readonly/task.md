# Partial, Required, and Readonly

TypeScript ships with a collection of built-in **utility types** that transform existing types
into new ones. Three of the most commonly used are `Partial<T>`, `Required<T>`, and `Readonly<T>`.
They modify the modifiers on every property of a type — making them optional, mandatory, or
read-only — without you having to rewrite the type by hand.

## Core Concept

All three utilities are **mapped types** under the hood. They iterate over every key in `T` and
apply (or remove) a modifier:

```typescript
// Simplified definitions from lib.es5.d.ts
type Partial<T>  = { [K in keyof T]?: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
type Readonly<T> = { [K in keyof T]: readonly T[K] };
```

Given an interface:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}
```

- `Partial<User>` → `{ id?: number; name?: string; email?: string; }`
- `Required<User>` → every property is mandatory (removes any `?` modifiers)
- `Readonly<User>` → `{ readonly id: number; readonly name: string; readonly email: string; }`

## How It Works

### Partial — make everything optional

`Partial<T>` adds the `?` modifier to every property. This is perfect for **update** functions
where you only want to change some fields:

```typescript
interface Settings {
    theme: string;
    fontSize: number;
    notifications: boolean;
}

function updateSettings(current: Settings, patch: Partial<Settings>): Settings {
    return { ...current, ...patch };
}

const defaults: Settings = { theme: "dark", fontSize: 14, notifications: true };
const updated = updateSettings(defaults, { fontSize: 18 });
// updated: { theme: "dark", fontSize: 18, notifications: true }
```

### Required — make everything mandatory

`Required<T>` strips the `?` modifier from every property. Use it when you need to guarantee
that all fields are present — for example, after merging defaults:

```typescript
interface FormData {
    username?: string;
    email?: string;
    age?: number;
}

function validateForm(data: FormData): Required<FormData> {
    if (!data.username || !data.email || data.age === undefined) {
        throw new Error("All fields are required");
    }
    return data as Required<FormData>;
}
```

### Readonly — freeze everything

`Readonly<T>` adds the `readonly` modifier to every property. The compiler will reject any
attempt to reassign a property:

```typescript
interface Config {
    apiUrl: string;
    timeout: number;
}

const config: Readonly<Config> = { apiUrl: "https://api.example.com", timeout: 5000 };
// config.timeout = 3000;  // Error: Cannot assign to 'timeout' because it is a read-only property
```

## Common Pitfalls

- **Shallow only**: `Readonly<T>` only makes the top-level properties read-only. Nested objects
  can still be mutated. For deep immutability you need a recursive type like `DeepReadonly<T>`
  (covered in a later lesson on conditional types).
- **`Required` removes `undefined` from the type**: `Required<{ name?: string }>` produces
  `{ name: string }`, not `{ name: string | undefined }`. The `-?` modifier removes the
  optionality entirely.
- **Runtime vs compile-time**: These utilities exist only at the type level. `Readonly<T>` does
  not call `Object.freeze()` — it only prevents reassignment in TypeScript code.

## Key Takeaways

- `Partial<T>` makes every property optional — ideal for update/patch objects.
- `Required<T>` makes every property mandatory — ideal for validation boundaries.
- `Readonly<T>` prevents reassignment of properties at compile time.
- All three are shallow transformations that operate on the top-level keys of `T`.
- They are mapped types under the hood, using `?`, `-?`, and `readonly` modifiers.

<div class="hint">
You can combine utility types: `Readonly<Partial<User>>` creates a type where every property
is both optional and read-only. TypeScript evaluates them from the inside out.
</div>
