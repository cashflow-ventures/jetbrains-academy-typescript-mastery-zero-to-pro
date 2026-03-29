// TODO: Export an interface EventMap with property click: { x: number; y: number }

// TODO: Export a second EventMap interface (merging) adding:
//   keypress: { key: string; code: number }
//   scroll: { scrollTop: number; scrollLeft: number }

// TODO: Export a generic function createEvent<K extends keyof EventMap>
//   Takes name (K) and data (EventMap[K])
//   Returns { type: K; data: EventMap[K] }
export function createEvent<K extends string>(
    name: K,
    data: unknown
): { type: K; data: unknown } {
    // Write your solution here
    return { type: name, data: null };
}

// TODO: Export a class Logger with:
//   private entries: string[] = []
//   log(message: string): void — pushes message to entries
//   getEntries(): string[] — returns a copy of entries
export class Logger {
    // Write your solution here
    log(_message: string): void {
        // Write your solution here
    }

    getEntries(): string[] {
        // Write your solution here
        return [];
    }
}

// TODO: Export a namespace Logger (merging with the class) containing:
//   export type Level = "debug" | "info" | "warn" | "error"
//   export function formatMessage(level: Level, message: string): string
//     returns "[LEVEL] message" (level uppercased)

// TODO: Export a function getEventKeys that takes an EventMap and returns string[]
export function getEventKeys(eventMap: Record<string, unknown>): string[] {
    // Write your solution here
    return [];
}
