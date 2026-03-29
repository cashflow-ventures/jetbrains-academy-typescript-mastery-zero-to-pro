# String Enums Exercise

Build a string enum that models HTTP response statuses and a function that generates
human-readable response messages.

## Instructions

1. In `task.ts`, create and export a string enum called `HttpStatus` with these members:
   - `Ok` = `"200_OK"`
   - `Created` = `"201_CREATED"`
   - `BadRequest` = `"400_BAD_REQUEST"`
   - `NotFound` = `"404_NOT_FOUND"`
   - `ServerError` = `"500_SERVER_ERROR"`

2. Export a function `handleResponse` that takes an `HttpStatus` and returns a message string:
   - `Ok` → `"Success: Request completed."`
   - `Created` → `"Success: Resource created."`
   - `BadRequest` → `"Client Error: Bad request."`
   - `NotFound` → `"Client Error: Resource not found."`
   - `ServerError` → `"Server Error: Internal failure."`

3. Export a function `isSuccessStatus` that takes an `HttpStatus` and returns `true`
   if the status is `Ok` or `Created`, `false` otherwise.

## Example

```typescript
handleResponse(HttpStatus.Ok);          // "Success: Request completed."
handleResponse(HttpStatus.NotFound);    // "Client Error: Resource not found."
isSuccessStatus(HttpStatus.Created);    // true
isSuccessStatus(HttpStatus.BadRequest); // false
```

<div class="hint">
A `switch` statement is a clean way to handle each enum member in `handleResponse`.
For `isSuccessStatus`, a simple comparison with `||` works well.
</div>
