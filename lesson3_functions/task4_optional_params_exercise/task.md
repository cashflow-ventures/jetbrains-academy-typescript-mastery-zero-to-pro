# Optional Parameters Exercise

Put optional and default parameters into practice. You'll build functions that gracefully
handle missing arguments using TypeScript's `?` and `= default` syntax.

## Instructions

1. Implement the function `greetPerson` that takes a `name` of type `string` and an optional
   `title` of type `string`. If `title` is provided, return `"Hello, {title} {name}!"`.
   Otherwise, return `"Hello, {name}!"`.

2. Implement the function `formatMessage` that takes a `message` of type `string` and a
   `punctuation` parameter of type `string` with a default value of `"."`. Return the
   message followed by the punctuation: `"{message}{punctuation}"`.

3. Implement the function `createUser` that takes a `name` of type `string`, an optional
   `age` of type `number`, and a `role` of type `string` with a default value of `"user"`.
   Return an object with properties `name`, `age`, and `role`. When `age` is not provided,
   it should be `undefined` in the returned object.

## Example

```typescript
greetPerson("Alice");              // "Hello, Alice!"
greetPerson("Alice", "Dr.");       // "Hello, Dr. Alice!"

formatMessage("Done");             // "Done."
formatMessage("Done", "!");        // "Done!"

createUser("Bob");                 // { name: "Bob", age: undefined, role: "user" }
createUser("Alice", 30, "admin");  // { name: "Alice", age: 30, role: "admin" }
```

<div class="hint">
For `greetPerson`, check if `title` is defined before including it. For `formatMessage`,
the default value handles the common case automatically. For `createUser`, remember that
optional parameters are `undefined` when omitted — you can include them directly in the
returned object.
</div>
