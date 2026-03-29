// TODO: Implement groupByKey
// Generic function with <T, K extends keyof T>
// Takes an array of T and a key K (where T[K] is string-like)
// Returns a Record<string, T[]> grouping objects by the value at key K
export function groupByKey(arr: any[], key: string): Record<string, any[]> {
    return {};
}

// TODO: Implement zip
// Generic function with <A, B>
// Takes two arrays and returns an array of [A, B] tuples
// Result length equals the shorter array
export function zip(arr1: any[], arr2: any[]): [any, any][] {
    return [];
}

// TODO: Implement pluck
// Generic function with <T, K extends keyof T>
// Takes an array of T and a key K
// Returns an array of T[K] values
export function pluck(arr: any[], key: string): any[] {
    return [];
}
