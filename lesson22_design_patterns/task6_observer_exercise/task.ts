// TODO: Implement a type-safe EventEmitter<EventMap>
//
// EventMap is a Record<string, unknown> mapping event names to payload types.
//
// Methods:
//   on<K>(event, handler) — registers a handler for the event
//   off<K>(event, handler) — removes a specific handler for the event
//   emit<K>(event, payload) — calls all handlers registered for the event
//   listenerCount<K>(event) — returns the number of handlers for the event
//
// All methods must be fully generic over K extends keyof EventMap.
// Handlers receive EventMap[K] as their argument.
// emit() should call handlers in registration order.
// off() with an unregistered handler should be a no-op.
// listenerCount() returns 0 for events with no handlers.

export class EventEmitter<EventMap extends Record<string, unknown>> {
    // Write your solution here

    on<K extends keyof EventMap>(
        event: K,
        handler: (payload: EventMap[K]) => void
    ): void {
        // Write your solution here
    }

    off<K extends keyof EventMap>(
        event: K,
        handler: (payload: EventMap[K]) => void
    ): void {
        // Write your solution here
    }

    emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
        // Write your solution here
    }

    listenerCount<K extends keyof EventMap>(event: K): number {
        // Write your solution here
        return 0;
    }
}
