# Validation Layer

Every production application needs input validation, and TypeScript lets us build
validation systems that are both type-safe and expressive. In this exercise you'll
combine generics, mapped types, and the `satisfies` operator to create a reusable
validation layer that catches mismatches at compile time while preserving precise
literal types at runtime.

## Instructions

1. In `task.ts`, define and export a `ValidationError` interface with:
   - `field: string`
   - `message: string`

2. Define and export a generic `Result<T, E>` type (success/failure union):
   - `{ ok: true; value: T }`
   - `{ ok: false; errors: E }`

3. Define and export a `Validator<T>` mapped type that maps each property `K` of `T`
   to a validation function `(value: T[K]) => string | null`. When the function
   returns `null` the field is valid; when it returns a `string` that string is the
   error message.

   ```typescript
   type Validator<T> = { [K in keyof T]: (value: T[K]) => string | null };
   ```

4. Export a `validate<T>` function with the signature:
   ```typescript
   function validate<T>(data: T, validator: Validator<T>): Result<T, ValidationError[]>
   ```
   It should run every validator function against the corresponding field in `data`.
   If all fields pass, return `{ ok: true, value: data }`.
   If any fail, collect the errors into a `ValidationError[]` and return
   `{ ok: false, errors }`.

5. Export three standalone validator factory functions:
   - `isNonEmpty(fieldName: string): (value: string) => string | null` —
     returns an error message if the string is empty, `null` otherwise.
   - `isEmail(fieldName: string): (value: string) => string | null` —
     returns an error message if the string does not contain `@`, `null` otherwise.
   - `isPositive(fieldName: string): (value: number) => string | null` —
     returns an error message if the number is not greater than zero, `null` otherwise.

6. Define a `UserInput` interface with `name: string`, `email: string`, `age: number`.
   Export a `userValidator` object of type `Validator<UserInput>` declared using the
   `satisfies` operator so TypeScript verifies the shape while preserving the literal
   validator functions.

## Example

```typescript
const good: UserInput = { name: "Alice", email: "alice@example.com", age: 30 };
const result = validate(good, userValidator);
// { ok: true, value: { name: "Alice", email: "alice@example.com", age: 30 } }

const bad: UserInput = { name: "", email: "no-at-sign", age: -5 };
const result2 = validate(bad, userValidator);
// { ok: false, errors: [
//   { field: "name", message: "name must not be empty" },
//   { field: "email", message: "email must be a valid email" },
//   { field: "age", message: "age must be positive" },
// ] }
```

<div class="hint">
Inside `validate`, iterate over the keys of the validator object with
`Object.keys(validator)`. For each key, call the validator function with the
corresponding value from `data`. If the result is a non-null string, push a
`ValidationError` with the field name and message. The `satisfies` keyword goes
after the object literal: `const x = { ... } satisfies SomeType`.
</div>
