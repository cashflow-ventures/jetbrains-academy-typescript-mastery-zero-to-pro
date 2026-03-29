# Index Signatures

Sometimes you don't know all the property names of an object ahead of time. Think of a dictionary,
a configuration map, or an API response with dynamic keys. TypeScript's **index signatures** let
you describe objects where the property names are not fixed, but the value types are consistent.

## Core Concept

An index signature tells TypeScript: "this object can have any number of properties with keys of
a certain type, and all values will be of a certain type."

```typescript
interface StringDictionary {
    [key: string]: string;
}

const colors: StringDictionary = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
};

colors["purple"] = "#800080"; // OK — any string key, string value
console.log(colors["red"]);   // "#ff0000"
```

The syntax `[key: string]: string` means: for any property accessed with a string key, the value
will be of type `string`. The name `key` is just a label — you can call it anything.

## How It Works

### Combining Index Signatures with Known Properties

You can mix index signatures with explicitly named properties. The named properties must be
compatible with the index signature's value type:

```typescript
interface Config {
    version: number;           // Known property
    [key: string]: number;     // All other properties must also be number
}

const config: Config = {
    version: 3,
    timeout: 5000,
    retries: 3,
};
```

If you need known properties with different types, use a union in the index signature:

```typescript
interface FlexibleConfig {
    name: string;
    [key: string]: string | number | boolean;
}

const settings: FlexibleConfig = {
    name: "MyApp",
    debug: true,
    port: 3000,
    host: "localhost",
};
```

### Number Index Signatures

You can also use `number` as the key type, which is useful for array-like objects:

```typescript
interface NumberMap {
    [index: number]: string;
}

const fruits: NumberMap = {
    0: "apple",
    1: "banana",
    2: "cherry",
};

console.log(fruits[0]); // "apple"
```

When you have both `string` and `number` index signatures, the `number` index value type must
be a subtype of the `string` index value type. This is because JavaScript converts numeric keys
to strings internally (`obj[0]` is the same as `obj["0"]`).

### Accessing Unknown Keys

When you access a property through an index signature, TypeScript assumes the value exists.
With `strict` mode and `noUncheckedIndexedAccess`, TypeScript adds `| undefined` to the return
type, making you check before using:

```typescript
interface Dictionary {
    [key: string]: string;
}

const dict: Dictionary = { hello: "world" };
const value = dict["missing"]; // Type: string (or string | undefined with noUncheckedIndexedAccess)
```

## Common Pitfalls

- **All properties must match the index signature type.** If you have `[key: string]: number`,
  every property — including named ones — must be `number`. Use a union type if you need mixed types.
- **Index signatures don't guarantee a key exists.** Just because the type says `[key: string]: string`
  doesn't mean every possible string key has a value. The object might be empty.
- **Overusing index signatures.** If you know the exact keys, use explicit properties instead.
  Index signatures are for truly dynamic keys.

## Key Takeaways

- Index signatures describe objects with dynamic keys: `[key: string]: ValueType`.
- Named properties can coexist with index signatures if their types are compatible.
- Number index signatures are useful for array-like structures.
- Consider `noUncheckedIndexedAccess` for safer access to dynamic properties.
- Use explicit properties when you know the keys; use index signatures for truly dynamic data.

<div class="hint">
TypeScript's `Record<string, T>` utility type is essentially shorthand for `{ [key: string]: T }`.
You'll learn about `Record` and other utility types in a later lesson. For now, index signatures
give you the same power with more explicit syntax.
</div>
