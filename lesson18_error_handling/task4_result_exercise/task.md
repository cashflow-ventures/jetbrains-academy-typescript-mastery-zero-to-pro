# Result Type Exercise

Implement a complete `Result<T, E>` type with helper functions for creating
and composing results. This is the core building block for type-safe error
handling without exceptions.

## Instructions

1. The `Result<T, E>` type is already defined for you as a discriminated union.

2. Implement `ok<T>(value: T)` — returns a success Result. The error type should
   be `never` so it is compatible with any `Result<T, E>`.

3. Implement `err<E>(error: E)` — returns a failure Result. The value type should
   be `never` so it is compatible with any `Result<T, E>`.

4. Implement `mapResult<T, U, E>(result, fn)` — if the result is ok, apply `fn`
   to the value and return a new ok Result. If the result is an error, return it
   unchanged.

5. Implement `flatMapResult<T, U, E>(result, fn)` — if the result is ok, apply
   `fn` to the value (where `fn` itself returns a Result). If the result is an
   error, return it unchanged.

6. Implement `unwrapOr<T, E>(result, defaultValue)` — if the result is ok, return
   the value. Otherwise, return `defaultValue`.

## Example

```typescript
const good = ok(42);
const bad = err("oops");

mapResult(good, (n) => n * 2);       // { ok: true, value: 84 }
mapResult(bad, (n) => n * 2);        // { ok: false, error: "oops" }

flatMapResult(good, (n) =>
    n > 0 ? ok(n) : err("must be positive")
);                                    // { ok: true, value: 42 }

unwrapOr(good, 0);                   // 42
unwrapOr(bad, 0);                    // 0
```

<div class="hint">
The `never` type is the key to making `ok()` and `err()` flexible. Since `never`
is assignable to every type, `Result<number, never>` is assignable to
`Result<number, string>` — the error channel is "empty" and compatible with anything.
</div>
