# Quiz: Objects and Interfaces

Let's check your understanding of the key concepts from this lesson.

## Select all statements that are TRUE about interfaces, type aliases, and readonly properties.

Think carefully about:
- Which feature supports declaration merging — interfaces or type aliases?
- What can type aliases express that interfaces cannot?
- What does `readonly` actually prevent — reassignment or deep mutation?

Consider this example:

```typescript
interface Config {
    readonly tags: string[];
}

const config: Config = { tags: ["a", "b"] };
config.tags.push("c"); // Is this allowed?
// config.tags = [];    // What about this?
```

<div class="hint">
Remember: `readonly` is a shallow check. It prevents you from reassigning the property itself
(`config.tags = [...]`), but it does NOT prevent you from mutating the value the property points
to (`config.tags.push(...)`). For deep immutability, you'd need `readonly string[]` or
`ReadonlyArray<string>` — and even then, only at the type level.
</div>
