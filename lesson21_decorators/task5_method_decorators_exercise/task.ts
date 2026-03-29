export interface LogEntry {
    method: string;
    args: any[];
    result: any;
}

// Stores all log entries from @log decorated methods
export const logEntries: LogEntry[] = [];

// TODO: Implement the log method decorator
// It should record each call (method name, args, result) in logEntries
// and return the original result unchanged
export function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    // Write your solution here
}

// TODO: Implement the cache method decorator
// It should cache results keyed by JSON.stringify(args)
// and skip calling the original if a cached result exists
export function cache(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    // Write your solution here
}

// TODO: Implement the DataService class
// - fetchUser(id: number): string — decorated with @log, returns "User_{id}"
// - computeHash(input: string): string — decorated with @cache, returns "hash_{input}_{input.length}"
export class DataService {
    @log
    fetchUser(id: number): string {
        // Write your solution here
        return "";
    }

    @cache
    computeHash(input: string): string {
        // Write your solution here
        return "";
    }
}
