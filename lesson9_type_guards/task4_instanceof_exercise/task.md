# instanceof Exercise

Practice using `instanceof` to narrow class instances and handle different error types.

## Instructions

1. Three error classes are provided: `ValidationError`, `NotFoundError`, and `NetworkError`.
   Each extends `Error` with additional properties.

2. Implement `getErrorMessage` — it takes an `Error` and returns a specific message based on
   the error type:
   - `ValidationError` → `"Validation: <field> - <message>"`
   - `NotFoundError` → `"Not Found: <resource> (id: <id>)"`
   - `NetworkError` → `"Network <statusCode>: <message>"`
   - Any other `Error` → `"Error: <message>"`

3. Implement `getErrorCode` — it takes an `Error` and returns a numeric code:
   - `ValidationError` → `400`
   - `NotFoundError` → `404`
   - `NetworkError` → the error's `statusCode` property
   - Any other `Error` → `500`

4. Implement `isRetryable` — it takes an `Error` and returns `true` only if it's a
   `NetworkError` with a `statusCode` of `429` or `503`. All other errors return `false`.

## Example

```typescript
const ve = new ValidationError("email", "Invalid format");
getErrorMessage(ve); // "Validation: email - Invalid format"
getErrorCode(ve);    // 400

const ne = new NetworkError(503, "Service Unavailable");
isRetryable(ne);     // true
```

<div class="hint">
Check the most specific subclass first with `instanceof`. Remember that all three
custom errors extend `Error`, so `instanceof Error` would match all of them.
</div>
