// TODO: Implement Split<S, D>
// Splits string type S on delimiter D into a tuple of string literals.
// Split<"a.b.c", "."> → ["a", "b", "c"]
// Split<"solo", "."> → ["solo"]
// Split<"", "."> → []
export type Split<S extends string, D extends string> = any;

// TODO: Implement splitString
// Splits a string on a delimiter. Do NOT use String.prototype.split.
// Use indexOf and substring/slice in a loop.
export function splitString(str: string, delimiter: string): string[] {
    // Write your solution here
    return [];
}

// TODO: Implement countOccurrences
// Counts non-overlapping occurrences of search in str.
// Returns 0 if search is empty.
export function countOccurrences(str: string, search: string): number {
    // Write your solution here
    return 0;
}
