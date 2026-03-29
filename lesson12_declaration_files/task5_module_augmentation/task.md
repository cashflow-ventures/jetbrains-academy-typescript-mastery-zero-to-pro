# Module Augmentation

Practice the module augmentation pattern by extending existing types with new properties
and methods. You'll create base types and then write functions that demonstrate how
augmented types work in practice — adding custom fields to existing interfaces.

## Instructions

1. Export an interface `BaseUser` with properties:
   - `id` of type `number`
   - `name` of type `string`
   - `email` of type `string`

2. Export an interface `AugmentedUser` that extends `BaseUser` and adds:
   - `role` of type `"admin" | "editor" | "viewer"`
   - `lastLogin` of type `string`

3. Export a function `augmentUser` that takes a `BaseUser`, a `role` (`"admin" | "editor" | "viewer"`),
   and a `lastLogin` (`string`), and returns an `AugmentedUser`.

4. Export an interface `BaseConfig` with properties:
   - `host` of type `string`
   - `port` of type `number`

5. Export an interface `AugmentedConfig` that extends `BaseConfig` and adds:
   - `ssl` of type `boolean`
   - `timeout` of type `number`
   - `retries` of type `number`

6. Export a function `augmentConfig` that takes a `BaseConfig` and an object with
   `ssl`, `timeout`, and `retries`, and returns an `AugmentedConfig`.

7. Export a function `hasAugmentation` that takes an `unknown` value and a `key` of
   type `string`, and returns `true` if the value is a non-null object that has the
   given key as an own property.

## Example

```typescript
const user: BaseUser = { id: 1, name: "Alice", email: "alice@test.com" };
const augmented = augmentUser(user, "admin", "2024-01-15");
// { id: 1, name: "Alice", email: "alice@test.com", role: "admin", lastLogin: "2024-01-15" }

const config: BaseConfig = { host: "localhost", port: 3000 };
const fullConfig = augmentConfig(config, { ssl: true, timeout: 5000, retries: 3 });
// { host: "localhost", port: 3000, ssl: true, timeout: 5000, retries: 3 }

hasAugmentation(augmented, "role");  // true
hasAugmentation(user, "role");       // false
```

<div class="hint">
Use the spread operator to merge the base object with the new properties:
`{ ...base, role, lastLogin }`. This creates a new object without mutating the original.
</div>
