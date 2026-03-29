# Pick & Omit Exercise

Practice using `Pick` and `Omit` to create focused API types from a full data model.

## Instructions

1. The `BlogPost` interface is provided for you.
2. Define and export a type alias `PostPreview` using `Pick` — it should contain only
   `id`, `title`, and `author`.
3. Define and export a type alias `CreatePostInput` using `Omit` — it should exclude
   `id`, `createdAt`, and `updatedAt`.
4. Implement `toPreview` — takes a `BlogPost` and returns a `PostPreview` with only the
   picked fields.
5. Implement `toCreateInput` — takes a `BlogPost` and returns a `CreatePostInput` with
   the omitted fields removed.

## Example

```typescript
const post: BlogPost = {
    id: 1, title: "Hello", body: "World", author: "Alice",
    tags: ["ts"], createdAt: new Date(), updatedAt: new Date()
};
toPreview(post);     // { id: 1, title: "Hello", author: "Alice" }
toCreateInput(post); // { title: "Hello", body: "World", author: "Alice", tags: ["ts"] }
```

<div class="hint">
Destructure the object and use the rest operator to exclude fields, or build a new
object literal with only the properties you need.
</div>
