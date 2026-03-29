# API Layer

Production APIs need typed request/response contracts and structured error handling.
In this exercise you'll build a typed API layer that combines generics, discriminated
unions, and the Result pattern to create handlers that are impossible to misuse —
every response has a known status code, body, and headers, and errors are values
rather than thrown exceptions.

## Instructions

1. In `task.ts`, define and export a `Result<T, E>` discriminated union type:
   - Success: `{ ok: true; value: T }`
   - Failure: `{ ok: false; error: E }`

2. Export helper functions to construct Result values:
   - `ok<T>(value: T): Result<T, never>` — creates a success result
   - `err<E>(error: E): Result<never, E>` — creates a failure result

3. Define and export an `ApiRequest` interface with:
   - `method: "GET" | "POST" | "PUT" | "DELETE"`
   - `path: string`
   - `body?: unknown`
   - `headers: Record<string, string>`

4. Define and export a generic `ApiResponse<T>` interface with:
   - `status: number`
   - `body: T`
   - `headers: Record<string, string>`

5. Define and export a `ApiHandler<T>` type alias for a function that takes
   an `ApiRequest` and returns an `ApiResponse<T>`:
   ```typescript
   type ApiHandler<T> = (request: ApiRequest) => ApiResponse<T>;
   ```

6. Export three error-response helper functions that each return an `ApiResponse<{ error: string }>`:
   - `notFound(message: string)` — status `404`
   - `badRequest(message: string)` — status `400`
   - `serverError(message: string)` — status `500`
   All three should set `headers` to `{ "content-type": "application/json" }`.

7. Define and export a `User` interface with `id: string`, `name: string`, `email: string`.

8. Export a `handleGetUser` function that satisfies `ApiHandler<User | { error: string }>`.
   It should:
   - Read `request.path` and extract the last segment as the user id
     (e.g., `"/users/abc"` → `"abc"`)
   - Call a provided `findUser` helper (defined below) to look up the user
   - If the Result is `ok`, return status `200` with the user as the body
   - If the Result is an error, return `notFound(...)` with the error message

9. Export a `handleCreateUser` function that satisfies `ApiHandler<User | { error: string }>`.
   It should:
   - Validate that `request.body` is an object with `name` (string) and `email` (string)
   - If validation fails, return `badRequest("Invalid user data")`
   - If valid, return status `201` with a new `User` (use `"generated-id"` as the id)
   - Set `headers` to `{ "content-type": "application/json" }`

10. Export a `findUser` function with signature
    `(id: string) => Result<User, string>` that returns `ok` with a user
    when `id === "1"` (name `"Alice"`, email `"alice@example.com"`) and
    `err("User not found")` for any other id.

## Example

```typescript
const getReq: ApiRequest = {
    method: "GET",
    path: "/users/1",
    headers: { "accept": "application/json" },
};
const res = handleGetUser(getReq);
// { status: 200, body: { id: "1", name: "Alice", ... }, headers: { ... } }

const badReq: ApiRequest = {
    method: "GET",
    path: "/users/999",
    headers: { "accept": "application/json" },
};
const res2 = handleGetUser(badReq);
// { status: 404, body: { error: "User not found" }, headers: { ... } }
```

<div class="hint">
For `handleGetUser`, split `request.path` by `"/"` and take the last element to
get the user id. The `findUser` function returns a `Result` — check `result.ok`
to decide between a 200 and a 404 response. For `handleCreateUser`, use `typeof`
checks on `request.body` to validate the input before constructing the user.
</div>
