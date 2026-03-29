# Modifier Exercise

Practice using the `+` and `-` modifier prefixes by building `Mutable<T>` and `Concrete<T>`
mapped types, along with runtime helper functions that match their type-level behavior.

## Instructions

1. In `task.ts`, implement the type alias `Mutable<T>` that removes `readonly` from every
   property of `T` using the `-readonly` modifier.

2. Implement the type alias `Concrete<T>` that removes optionality from every property
   of `T` using the `-?` modifier.

3. Implement `toMutable<T>(obj)` that takes a `Readonly<T>` object and returns a mutable
   shallow copy. Use object spread `{ ...obj }` to create the copy.

4. Implement `toConcrete<T>(partial, defaults)` that takes a `Partial<T>` and a complete
   defaults object of type `T`, and returns a `Concrete<T>` by merging defaults with the
   partial (partial values override defaults).

## Example

```typescript
interface Config {
    readonly host: string;
    readonly port: number;
}

type MutableConfig = Mutable<Config>;
// { host: string; port: number }

const frozen: Readonly<Config> = { host: "localhost", port: 3000 };
const editable = toMutable(frozen);
editable.host = "0.0.0.0"; // OK

interface Settings {
    theme?: string;
    fontSize?: number;
    debug?: boolean;
}

const full = toConcrete(
    { theme: "dark" },
    { theme: "light", fontSize: 14, debug: false }
);
// { theme: "dark", fontSize: 14, debug: false }
```

<div class="hint">
For `toMutable`, spreading a readonly object into a new object literal creates a mutable
copy. For `toConcrete`, spread defaults first, then the partial on top so partial values
win: `{ ...defaults, ...partial }`.
</div>
