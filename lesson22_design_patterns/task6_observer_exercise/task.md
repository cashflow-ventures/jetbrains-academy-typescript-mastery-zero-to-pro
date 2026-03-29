# Observer Pattern Exercise

Build a fully type-safe `EventEmitter<EventMap>` that uses generics to enforce correct event names and payload types at compile time.

## Instructions

1. Implement the `EventEmitter<EventMap>` class where `EventMap extends Record<string, unknown>`.

2. Implement these methods, all generic over `K extends keyof EventMap`:
   - `on(event: K, handler: (payload: EventMap[K]) => void): void` — registers a handler
   - `off(event: K, handler: (payload: EventMap[K]) => void): void` — removes a specific handler (no-op if not registered)
   - `emit(event: K, payload: EventMap[K]): void` — calls all handlers for the event in registration order
   - `listenerCount(event: K): number` — returns the number of registered handlers (0 if none)

3. Export the `EventEmitter` class.

## Example

```typescript
interface ChatEvents {
    message: { user: string; text: string };
    join: { user: string };
}

const chat = new EventEmitter<ChatEvents>();
chat.on("message", (p) => console.log(`${p.user}: ${p.text}`));
chat.emit("message", { user: "Alice", text: "Hello!" });
chat.listenerCount("message"); // 1
```

<div class="hint">
Use a `Map` with `keyof EventMap` as keys and arrays or sets of handler functions as values.
The tricky part is the internal storage type — you'll need to use `any` or `Function` internally
since TypeScript can't track the relationship between the key and handler type inside the Map.
The generic method signatures ensure external type safety.
</div>
