# Custom Error Classes

Build a custom error hierarchy that carries structured information about
what went wrong. This is the foundation for type-safe error handling in
real-world TypeScript applications.

## Instructions

1. In `task.ts`, implement the `AppError` class extending `Error`:
   - Constructor takes `message: string`, `code: string`, and `statusCode: number`.
   - Store `code` and `statusCode` as public readonly properties.
   - Set `this.name` to `"AppError"`.
   - Fix the prototype chain with `Object.setPrototypeOf(this, new.target.prototype)`.

2. Implement `ValidationError` extending `AppError`:
   - Constructor takes `message: string` and `field: string`.
   - Store `field` as a public readonly property.
   - Call `super` with code `"VALIDATION_ERROR"` and statusCode `400`.
   - Set `this.name` to `"ValidationError"`.

3. Implement `NotFoundError` extending `AppError`:
   - Constructor takes `resource: string` and `id: string`.
   - Store `resource` and `id` as public readonly properties.
   - Call `super` with message `` `${resource} with id '${id}' not found` ``, code `"NOT_FOUND"`, and statusCode `404`.
   - Set `this.name` to `"NotFoundError"`.

4. Implement `handleAppError(error: unknown): string`:
   - If `error` is a `ValidationError`, return `` `Validation failed on '${error.field}': ${error.message}` ``.
   - If `error` is a `NotFoundError`, return `` `${error.resource} '${error.id}' was not found` ``.
   - If `error` is an `AppError`, return `` `[${error.code}] ${error.message}` ``.
   - If `error` is a plain `Error`, return `` `Unexpected error: ${error.message}` ``.
   - Otherwise, return `` `Unknown error: ${String(error)}` ``.

## Example

```typescript
const ve = new ValidationError("must be positive", "age");
handleAppError(ve); // "Validation failed on 'age': must be positive"

const nf = new NotFoundError("User", "42");
handleAppError(nf); // "User '42' was not found"
```

<div class="hint">
Order matters in the `handleAppError` function! Check the most specific error
types first (`ValidationError`, `NotFoundError`) before the more general
`AppError`, because `instanceof` matches parent classes too.
</div>
