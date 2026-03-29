// TODO: Implement MyExclude<T, U>
// Remove from T all members assignable to U (use distribution)
export type MyExclude<T, U> = any;

// TODO: Implement MyExtract<T, U>
// Extract from T all members assignable to U (use distribution)
export type MyExtract<T, U> = any;

// TODO: Implement IsNever<T>
// Resolves to true if T is never, false otherwise
// Hint: prevent distribution with [T] extends [never]
export type IsNever<T> = any;

// TODO: Implement excludeValues
// Returns a new array with all values from excluded removed
export function excludeValues<T>(values: T[], excluded: T[]): T[] {
    // Write your solution here
    return [];
}

// TODO: Implement extractValues
// Returns a new array containing only values that appear in kept
export function extractValues<T>(values: T[], kept: T[]): T[] {
    // Write your solution here
    return [];
}
