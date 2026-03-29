# Pattern Matching Exercise

Practice using template literal types with `infer` to parse strings at
compile time, and write runtime functions that mirror the same logic.

## Instructions

1. In `task.ts`, implement the function `parseRoute(route: string)` that
   takes a string like `"GET /users/:id"` and returns an object with:
   - `method`: the HTTP method (e.g., `"GET"`)
   - `path`: the path after the method (e.g., `"/users/:id"`)
   - Returns `null` if the string does not match the pattern `"METHOD /path"`.

2. Implement the function `extractParams(path: string): string[]` that
   extracts all route parameter names (prefixed with `:`) from a path.
   - e.g., `"/users/:id/posts/:postId"` → `["id", "postId"]`
   - Returns an empty array if no parameters are found.

3. Implement the function `splitString(str: string, delimiter: string): string[]`
   that splits a string by the given delimiter.
   - e.g., `splitString("a-b-c", "-")` → `["a", "b", "c"]`
   - If the delimiter is not found, return the whole string in an array.

## Example

```typescript
parseRoute("GET /users/:id");
// { method: "GET", path: "/users/:id" }

parseRoute("invalid");
// null

extractParams("/users/:id/posts/:postId");
// ["id", "postId"]

splitString("hello-world-foo", "-");
// ["hello", "world", "foo"]
```

<div class="hint">
For `parseRoute`, find the first space to separate the method from the path.
For `extractParams`, split the path on `"/"` and look for segments starting
with `":"`. For `splitString`, use the built-in `String.prototype.split` method
or implement it manually with `indexOf`.
</div>
