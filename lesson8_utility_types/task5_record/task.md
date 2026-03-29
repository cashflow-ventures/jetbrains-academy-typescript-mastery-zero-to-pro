# Record

`Record<K, V>` is a utility type that constructs an object type whose keys are of type `K` and
whose values are of type `V`. It is the go-to tool for creating typed dictionaries, lookup tables,
and configuration maps where every key maps to the same value shape.

## Core Concept

```typescript
// Simplified definition
type Record<K extends keyof any, T> = { [P in K]: T };
```

The first type parameter `K` must be a subtype of `string | number | symbol` — the valid
JavaScript property key types. The second parameter `T` is the value type for every key.

```typescript
// A dictionary mapping string keys to numbers
type ScoreBoard = Record<string, number>;

const scores: ScoreBoard = {
    alice: 95,
    bob: 87,
    charlie: 92,
};
```

## How It Works

### With string literal unions

The real power of `Record` shows when `K` is a union of string literals. TypeScript then
**requires** that every member of the union is present as a key:

```typescript
type Status = "pending" | "active" | "archived";

interface StatusConfig {
    label: string;
    color: string;
}

const statusMap: Record<Status, StatusConfig> = {
    pending:  { label: "Pending",  color: "yellow" },
    active:   { label: "Active",   color: "green" },
    archived: { label: "Archived", color: "gray" },
};
// Removing any key causes a compile error — exhaustiveness is enforced!
```

### As a typed dictionary

When you use `Record<string, T>`, you get a general-purpose dictionary. This is cleaner than
an index signature when you want a standalone type:

```typescript
type UserCache = Record<string, { name: string; lastSeen: Date }>;

const cache: UserCache = {};
cache["u123"] = { name: "Alice", lastSeen: new Date() };
```

### Combining with other utilities

`Record` composes well with other utility types:

```typescript
type Theme = "light" | "dark";
type ColorTokens = "background" | "text" | "accent";

// Every theme must define every color token
type ThemeColors = Record<Theme, Record<ColorTokens, string>>;

const themes: ThemeColors = {
    light: { background: "#fff", text: "#000", accent: "#07f" },
    dark:  { background: "#111", text: "#eee", accent: "#0af" },
};
```

## Common Pitfalls

- **`Record<string, T>` allows any string key**: TypeScript will not warn you about typos
  because any string is valid. Prefer literal union keys when the set of keys is known.
- **All keys are required**: `Record<"a" | "b", number>` requires both `"a"` and `"b"`.
  If some keys are optional, use `Partial<Record<K, V>>`.
- **Not the same as `Map`**: `Record` produces a plain object type. For runtime key-value
  storage with non-string keys or iteration guarantees, use the built-in `Map<K, V>`.

## Key Takeaways

- `Record<K, V>` creates an object type mapping keys `K` to values `V`.
- When `K` is a literal union, TypeScript enforces that every key is present.
- Use `Record<string, V>` for general dictionaries, literal unions for exhaustive maps.
- Combine with `Partial`, `Readonly`, or nested `Record` for complex structures.
- `Record` is a mapped type under the hood — `{ [P in K]: V }`.

<div class="hint">
`Record` is especially useful with enums: `Record<MyEnum, Config>` guarantees you handle
every enum member. If you add a new member later, the compiler flags every `Record` that
is now missing a key.
</div>
