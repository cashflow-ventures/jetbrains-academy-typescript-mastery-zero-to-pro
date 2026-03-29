// Observer Pattern — Typed event emitters with generics

// Define an event map: event name → payload type
interface AppEvents {
    userLogin: { userId: string; timestamp: number };
    userLogout: { userId: string };
    error: { message: string; code: number };
}

// Generic typed event emitter
class TypedEventEmitter<EventMap extends Record<string, unknown>> {
    private listeners = new Map<
        keyof EventMap,
        Set<(payload: any) => void>
    >();

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
        this.listeners.get(event)?.forEach((handler) => handler(payload));
    }
}

// Usage — fully type-safe event handling
const emitter = new TypedEventEmitter<AppEvents>();

emitter.on("userLogin", (payload) => {
    // TypeScript knows payload is { userId: string; timestamp: number }
    console.log(`User ${payload.userId} logged in at ${payload.timestamp}`);
});

emitter.on("error", (payload) => {
    // TypeScript knows payload is { message: string; code: number }
    console.log(`Error ${payload.code}: ${payload.message}`);
});

// Type-safe emit — wrong payload shape would be a compile error
emitter.emit("userLogin", { userId: "alice", timestamp: Date.now() });
emitter.emit("error", { message: "Not found", code: 404 });

// This would cause a compile error:
// emitter.emit("userLogin", { wrong: "shape" });
