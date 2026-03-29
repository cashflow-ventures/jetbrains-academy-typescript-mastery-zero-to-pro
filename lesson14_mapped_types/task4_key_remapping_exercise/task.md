# Key Remapping Exercise

Put key remapping into practice by building `Getters<T>` and `Setters<T>` mapped types
that transform an object's property names into getter and setter method signatures.

## Instructions

1. In `task.ts`, implement the type alias `Getters<T>` that maps each property `K` of `T`
   to a getter method named `get${Capitalize<string & K>}` returning `T[K]`.

2. Implement the type alias `Setters<T>` that maps each property `K` of `T` to a setter
   method named `set${Capitalize<string & K>}` accepting a value of type `T[K]` and
   returning `void`.

3. Implement `createGetters<T>(obj)` that takes an object and returns an object matching
   `Getters<T>`. Each getter should return the corresponding property value from `obj`.

4. Implement `createSetters<T>(obj)` that takes an object and returns an object matching
   `Setters<T>`. Each setter should mutate the corresponding property on the original object.

## Example

```typescript
interface Config {
    host: string;
    port: number;
}

type ConfigGetters = Getters<Config>;
// { getHost: () => string; getPort: () => number }

const cfg = { host: "localhost", port: 3000 };
const getters = createGetters(cfg);
getters.getHost();  // "localhost"
getters.getPort();  // 3000

const setters = createSetters(cfg);
setters.setPort(8080);
cfg.port; // 8080
```

<div class="hint">
Use `Object.keys(obj)` to iterate over properties. For each key, build the getter/setter
name by capitalizing the first letter: `"get" + key[0].toUpperCase() + key.slice(1)`.
Cast the result object to the mapped type.
</div>
