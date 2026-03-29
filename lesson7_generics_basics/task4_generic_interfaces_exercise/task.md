# Generic Interfaces Exercise

Put generic interfaces into practice by building two commonly used patterns:
a `Result` type for error handling and an `Optional` type for nullable values.

## Instructions

1. The `Result<T, E>` type is already defined for you as a discriminated union. Implement
   the `ok` function that creates a success result wrapping a value of type `T`.

2. Implement the `err` function that creates a failure result wrapping an error of type `E`.

3. Implement the `unwrapResult` function. It takes a `Result<T, E>` and returns the value
   if successful, or throws the error (using `throw`) if it's a failure.

4. The `Optional<T>` type is already defined. Implement the `some` function that creates
   an `Optional` containing a value.

5. Implement the `none` function that creates an empty `Optional`.

6. Implement the `mapOptional` function. It takes an `Optional<T>` and a transform function
   `(value: T) => U`, and returns an `Optional<U>`. If the input has a value, apply the
   transform. If it's empty, return `none`.

## Example

```typescript
const success = ok(42);           // { hasValue: true, value: 42 }
const failure = err("not found"); // { hasValue: false, error: "not found" }

unwrapResult(success);            // 42
// unwrapResult(failure);         // throws "not found"

const s = some("hello");          // { hasValue: true, value: "hello" }
const n = none();                 // { hasValue: false }

mapOptional(s, v => v.length);    // { hasValue: true, value: 5 }
mapOptional(n, v => v.length);    // { hasValue: false }
```

<div class="hint">
For `unwrapResult`, check the `success` field to determine which branch you're in.
If `success` is `true`, TypeScript narrows the type so you can access `.value`.
If `success` is `false`, you can access `.error` and throw it.
</div>

<div class="hint">
For `mapOptional`, check the `hasValue` field. If it's `true`, apply the transform
function to the value and wrap the result with `some`. If it's `false`, just return
`none()`.
</div>
