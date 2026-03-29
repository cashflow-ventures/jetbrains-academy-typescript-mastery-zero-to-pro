# Index Signatures Exercise

Practice using index signatures to build typed dictionaries and configuration objects with
dynamic keys.

## Instructions

1. Define a `Dictionary` interface with a string index signature where all values are `string`.

2. Implement `countKeys` — takes a `Dictionary` and returns the number of keys in it.

3. Implement `getValueOrDefault` — takes a `Dictionary`, a `key` (string), and a `fallback`
   (string). Returns the value at that key if it exists, otherwise returns the fallback.

4. Define a `TypedConfig` interface with:
   - A required `appName` property (string)
   - A string index signature where values can be `string | number | boolean`

5. Implement `mergeConfigs` — takes two `TypedConfig` objects and returns a new `TypedConfig`
   that combines all properties from both. If both have the same key, the second config's value
   wins. The `appName` should come from the second config.

6. Export the `Dictionary` interface, `TypedConfig` interface, and all three functions.

## Example

```typescript
const dict: Dictionary = { hello: "world", foo: "bar" };
countKeys(dict);                          // returns 2
getValueOrDefault(dict, "hello", "n/a");  // returns "world"
getValueOrDefault(dict, "missing", "n/a"); // returns "n/a"

const base: TypedConfig = { appName: "MyApp", debug: false, port: 3000 };
const override: TypedConfig = { appName: "MyApp v2", port: 8080 };
mergeConfigs(base, override);
// returns { appName: "MyApp v2", debug: false, port: 8080 }
```

<div class="hint">
Use `Object.keys(obj)` to get an array of an object's keys. For merging objects, the spread
operator `{ ...obj1, ...obj2 }` copies all properties, with later values overwriting earlier ones.
</div>
