# Implements Exercise

Practice implementing multiple interfaces in a single class. You'll create `Serializable` and
`Loggable` interfaces, then build a `TodoItem` class that implements both.

## Instructions

1. Create an interface `Serializable` with a method `serialize(): string`.
2. Create an interface `Loggable` with a method `toLogString(): string`.
3. Create a `TodoItem` class that implements both `Serializable` and `Loggable`:
   - Constructor properties: `id` (number), `title` (string), `completed` (boolean, defaults to `false`)
   - `serialize()` returns a JSON string of `{ id, title, completed }`
   - `toLogString()` returns `"[{status}] #{id}: {title}"` where status is `"✓"` if completed, `" "` if not
   - `toggle(): void` — flips the `completed` status
4. Create a function `processItems(items: (Serializable & Loggable)[]): string[]` that
   calls `toLogString()` on each item and returns the results as an array.
5. Export the interfaces, the class, and the function.

## Example

```typescript
const todo = new TodoItem(1, "Learn TypeScript");
todo.serialize();    // '{"id":1,"title":"Learn TypeScript","completed":false}'
todo.toLogString();  // "[ ] #1: Learn TypeScript"
todo.toggle();
todo.toLogString();  // "[✓] #1: Learn TypeScript"

processItems([todo]); // ["[✓] #1: Learn TypeScript"]
```

<div class="hint">
Use `JSON.stringify()` for the `serialize` method. For `toLogString`, use a ternary to
pick between `"✓"` and `" "` based on the `completed` property.
</div>
