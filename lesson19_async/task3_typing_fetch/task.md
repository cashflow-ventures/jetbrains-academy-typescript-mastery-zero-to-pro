# Typed API Client

Real-world TypeScript applications frequently call APIs and parse JSON responses.
The challenge is bridging the gap between the untyped `unknown` data that comes
back from a network call and the strongly typed interfaces your application needs.
In this exercise you will build a simulated typed API client that validates and
returns properly typed data.

## Instructions

1. In `task.ts`, implement `simulateFetch<T>(data: T, shouldFail?: boolean): Promise<T>` —
   simulates an API call. If `shouldFail` is `true`, reject with `new Error("Network error")`.
   Otherwise resolve with `data`.

2. Implement `parseJson<T>(raw: string, validator: (data: unknown) => data is T): T` —
   parses a JSON string and validates the result using the provided type guard.
   If parsing fails or validation fails, throw an `Error` with message
   `"Parse error"` or `"Validation error"` respectively.

3. Implement `isPost(data: unknown): data is Post` — a type guard that checks
   whether `data` is a valid `Post` object (has `id` as number, `title` as string,
   and `body` as string).

4. Implement `fetchPost(id: number): Promise<Post>` — uses `simulateFetch` to
   simulate fetching a post. Return `{ id, title: "Post " + id, body: "Content of post " + id }`.

5. Implement `fetchPosts(ids: number[]): Promise<Post[]>` — fetches multiple posts
   concurrently using `Promise.all` and `fetchPost`.

## Example

```typescript
await simulateFetch({ x: 1 });           // { x: 1 }
await simulateFetch("hi", true);         // rejects with "Network error"
parseJson('{"id":1}', isPost);           // throws "Validation error" (missing fields)
await fetchPost(5);                      // { id: 5, title: "Post 5", body: "Content of post 5" }
await fetchPosts([1, 2]);               // [{ id: 1, ... }, { id: 2, ... }]
```

<div class="hint">
Use `JSON.parse` inside a `try/catch` to handle malformed JSON. Remember that
`JSON.parse` returns `any` — that is why the validator function is essential
for type safety. The type guard pattern `(data: unknown) => data is T` lets
TypeScript narrow the parsed result to your desired type.
</div>
