export type SettledResult<T> =
    | { status: "ok"; value: T }
    | { status: "fail"; error: string };

export interface Partitioned<T> {
    values: T[];
    errors: string[];
}

// TODO: Implement fetchAll
// Wrapper around Promise.all that returns all resolved values
export async function fetchAll<T>(tasks: Promise<T>[]): Promise<T[]> {
    // Write your solution here
    return [];
}

// TODO: Implement settleAll
// Uses Promise.allSettled, maps fulfilled to { status: "ok", value }
// and rejected to { status: "fail", error: message }
export async function settleAll<T>(tasks: Promise<T>[]): Promise<SettledResult<T>[]> {
    // Write your solution here
    return [];
}

// TODO: Implement partitionSettled
// Splits SettledResult array into { values, errors }
export function partitionSettled<T>(results: SettledResult<T>[]): Partitioned<T> {
    // Write your solution here
    return { values: [], errors: [] };
}

// TODO: Implement fetchWithFallback
// Try primary; if it rejects, return fallback result
export async function fetchWithFallback<T>(primary: Promise<T>, fallback: Promise<T>): Promise<T> {
    // Write your solution here
    return undefined as unknown as T;
}
