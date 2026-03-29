# Observer Pattern

The Observer pattern establishes a one-to-many relationship between objects: when one object (the subject) changes state, all its dependents (observers) are notified automatically. In TypeScript, generics and mapped types let you build fully type-safe event systems where the compiler verifies that every event name matches its expected payload type.

## Core Concept

At its heart, the Observer pattern has two roles:

- **Subject (Publisher)**: Maintains a list of observers and notifies them when something happens
- **Observer (Subscriber)**: Registers interest in specific events and reacts when notified

The typed event emitter is the most common TypeScript implementation. You define an event map that associates event names with payload types, then use generics to enforce type safety across `on()`, `off()`, and `emit()`.

```typescript
// Event map: maps event names to their payload types
interface StoreEvents {
    itemAdded: { id: string; name: string };
    itemRemoved: { id: string };
    cleared: undefined;
}

// The emitter enforces that "itemAdded" always carries { id, name }
// and "cleared" carries no payload
```

## How It Works

The key insight is parameterizing the emitter with an event map type. Each method uses `K extends keyof EventMap` to constrain the event name, and `EventMap[K]` to look up the corresponding payload type:

```typescript
class EventBus<EventMap extends Record<string, unknown>> {
    private listeners = new Map<keyof EventMap, Set<Function>>();

    on<K extends keyof EventMap>(
        event: K,
        handler: (payload: EventMap[K]) => void
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
    }

    off<K extends keyof EventMap>(
        event: K,
        handler: (payload: EventMap[K]) => void
    ): void {
        this.listeners.get(event)?.delete(handler);
    }

    emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
        this.listeners.get(event)?.forEach((fn) => fn(payload));
    }
}
```

When you call `emitter.on("itemAdded", handler)`, TypeScript infers that `handler` must accept `{ id: string; name: string }`. If you try to emit `"itemAdded"` with the wrong shape, you get a compile error.

## Common Pitfalls

- **Memory leaks**: Forgetting to call `off()` when a subscriber is destroyed leads to retained references. Consider adding a `removeAllListeners()` method or using weak references.
- **Ordering assumptions**: Don't rely on the order in which observers are notified — it's an implementation detail that can change.
- **Synchronous by default**: Most event emitter implementations call handlers synchronously. If a handler throws, subsequent handlers may not run. Consider wrapping calls in try/catch.

## Key Takeaways

- The Observer pattern decouples publishers from subscribers — neither needs to know about the other
- TypeScript's generic event maps enforce that event names and payloads always match
- `keyof EventMap` constrains event names; `EventMap[K]` looks up the payload type
- This pattern is the foundation of Node.js `EventEmitter`, DOM events, and reactive libraries like RxJS
- Always provide a way to unsubscribe to prevent memory leaks

<div class="hint">
Node.js's built-in `EventEmitter` is untyped — any string is a valid event name and payloads
are `any`. Libraries like `typed-emitter` and `strict-event-emitter-types` add type safety
on top. By building your own generic emitter, you get the same safety with zero dependencies.
</div>
