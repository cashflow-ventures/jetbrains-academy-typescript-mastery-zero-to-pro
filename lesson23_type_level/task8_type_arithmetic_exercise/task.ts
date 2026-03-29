// TODO: Implement BuildTuple<N>
// Recursively builds a tuple of N unknown elements.
// BuildTuple<3> → [unknown, unknown, unknown]
export type BuildTuple<N extends number, Acc extends unknown[] = []> = any;

// TODO: Implement Length<T>
// Extracts the "length" of a readonly tuple as a numeric literal.
// Length<[1, 2, 3]> → 3
export type Length<T extends readonly unknown[]> = any;

// TODO: Implement Add<A, B>
// Adds two non-negative integers using tuple spreading.
// Add<3, 5> → 8
export type Add<A extends number, B extends number> = any;

// TODO: Implement tupleLength
// Returns the length of the given tuple.
export function tupleLength<T extends readonly unknown[]>(tuple: T): number {
    // Write your solution here
    return 0;
}

// TODO: Implement addPositive
// Adds two non-negative integers. Throws if either is negative.
export function addPositive(a: number, b: number): number {
    // Write your solution here
    return 0;
}

// TODO: Implement rangeArray
// Returns [0, 1, 2, ..., n-1]. Returns [] for n <= 0.
export function rangeArray(n: number): number[] {
    // Write your solution here
    return [];
}
