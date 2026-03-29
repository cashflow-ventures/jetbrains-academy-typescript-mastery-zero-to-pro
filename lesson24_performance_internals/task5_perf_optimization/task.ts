// TODO: Implement ReverseAccum<T>
// A tail-recursive tuple reversal using an accumulator.
// Peel elements from T and prepend to Acc so recursion depth = tuple length.
// ReverseAccum<[1, 2, 3]> → [3, 2, 1]
export type ReverseAccum<T extends unknown[], Acc extends unknown[] = []> = any;

// TODO: Implement IsIncluded<T, U>
// Non-distributive conditional: checks if T is assignable to U.
// Wrap both sides in tuples to prevent distribution over unions.
// IsIncluded<"a" | "b", string> → true (evaluated as a whole, not distributed)
export type IsIncluded<T, U> = any;

// TODO: Implement FlatMerge<A, B>
// Single-pass mapped type that merges two object types.
// Properties from B override A. Map over keyof A | keyof B in one pass
// instead of chaining Omit<A, keyof B> & B.
// FlatMerge<{ x: 1; y: 2 }, { y: 99; z: 3 }> → { x: 1; y: 99; z: 3 }
export type FlatMerge<
    A extends Record<string, unknown>,
    B extends Record<string, unknown>
> = any;

// TODO: Implement reverseTuple
// Reverses the given array and returns a new array.
export function reverseTuple<T extends readonly unknown[]>(tuple: T): unknown[] {
    // Write your solution here
    return [];
}

// TODO: Implement isIncludedIn
// Returns true if value is found in candidates using strict equality.
export function isIncludedIn<T>(value: T, candidates: T[]): boolean {
    // Write your solution here
    return false;
}

// TODO: Implement flatMerge
// Merges two objects; properties from b override a.
export function flatMerge<
    A extends Record<string, unknown>,
    B extends Record<string, unknown>
>(a: A, b: B): A & B {
    // Write your solution here
    return {} as A & B;
}
