# Declaration Merging Exercise

Practice declaration merging patterns by building interfaces that merge, extending
types with additional properties, and combining namespaces with classes.

## Instructions

1. Export an interface `EventMap` with a property `click` of type `{ x: number; y: number }`.

2. Export a second `EventMap` interface (merging with the first) that adds:
   - `keypress` of type `{ key: string; code: number }`
   - `scroll` of type `{ scrollTop: number; scrollLeft: number }`

3. Export a function `createEvent` that takes an event name (`keyof EventMap`) and the
   corresponding event data, and returns an object with `type` (the event name) and
   `data` (the event data). Use a generic signature:
   `<K extends keyof EventMap>(name: K, data: EventMap[K]): { type: K; data: EventMap[K] }`

4. Export a class `Logger` with:
   - A `private entries: string[]` array initialized to `[]`
   - A method `log(message: string): void` that pushes the message to entries
   - A method `getEntries(): string[]` that returns a copy of the entries array

5. Export a namespace `Logger` (merging with the class) containing:
   - An exported type alias `Level` equal to `"debug" | "info" | "warn" | "error"`
   - An exported function `formatMessage(level: Level, message: string): string` that
     returns `"[LEVEL] message"` (level uppercased, e.g., `"[INFO] hello"`)

6. Export a function `getEventKeys` that takes an `EventMap` object and returns an
   array of its keys as `string[]`. Use `Object.keys()`.

## Example

```typescript
const clickEvent = createEvent("click", { x: 10, y: 20 });
// { type: "click", data: { x: 10, y: 20 } }

const logger = new Logger();
logger.log("hello");
logger.getEntries(); // ["hello"]

Logger.formatMessage("info", "started"); // "[INFO] started"

const eventMap: EventMap = {
    click: { x: 0, y: 0 },
    keypress: { key: "a", code: 65 },
    scroll: { scrollTop: 0, scrollLeft: 0 },
};
getEventKeys(eventMap); // ["click", "keypress", "scroll"]
```

<div class="hint">
For the generic `createEvent` function, TypeScript will infer `K` from the first argument.
The second argument must match `EventMap[K]`, giving you type-safe event creation.
</div>
