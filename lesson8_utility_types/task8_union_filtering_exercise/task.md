# Union Filtering Exercise

Practice using `Exclude`, `Extract`, and `NonNullable` to manipulate union types.

## Instructions

1. The `MediaType` union and `MediaItem` discriminated union are provided.
2. Define and export a type alias `TextMedia` — use `Extract` to keep only `"text"` and `"markdown"`
   from `MediaType`.
3. Define and export a type alias `NonTextMedia` — use `Exclude` to remove `"text"` and `"markdown"`
   from `MediaType`.
4. Implement `filterByType` — takes an array of `MediaItem` and a `MediaType`, returns only items
   matching that type.
5. Implement `ensureDefined` — a generic function that takes `T | null | undefined` and returns `T`.
   If the value is `null` or `undefined`, throw `new Error("Value is required")`.

## Example

```typescript
const items: MediaItem[] = [
    { kind: "text", content: "hello" },
    { kind: "image", url: "pic.png", width: 100 },
];
filterByType(items, "text"); // [{ kind: "text", content: "hello" }]

ensureDefined("hello"); // "hello"
ensureDefined(null);    // throws Error("Value is required")
```

<div class="hint">
For `filterByType`, use `Array.filter()` and check the `kind` property.
For `ensureDefined`, a simple null check is all you need.
</div>
