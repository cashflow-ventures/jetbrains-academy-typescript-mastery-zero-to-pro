// === Challenge 1: DeepPick<T, Path> ===
// TODO: Implement DeepPick that extracts a nested type via dot-path.
// DeepPick<{ a: { b: number } }, "a.b"> → number
// DeepPick<{ x: string }, "x"> → string
export type DeepPick<T, Path extends string> = any;

// TODO: Implement deepGet that retrieves a nested value by dot-path.
export function deepGet(obj: any, path: string): unknown {
    // Write your solution here
    return undefined;
}

// === Challenge 2: TupleToUnion<T> ===
// TODO: Implement TupleToUnion that converts [A, B, C] → A | B | C.
export type TupleToUnion<T extends readonly unknown[]> = any;

// TODO: Implement tupleToUnion that returns the tuple as-is at runtime.
// (Union types don't exist at runtime — return the original array.)
export function tupleToUnion<T extends readonly unknown[]>(tuple: T): T[number][] {
    // Write your solution here
    return [] as T[number][];
}

// === Challenge 3: Reverse<T> ===
// TODO: Implement Reverse that reverses a tuple type.
// Reverse<[1, 2, 3]> → [3, 2, 1]
export type Reverse<T extends readonly unknown[]> = any;

// TODO: Implement reverseTuple that reverses an array at runtime.
export function reverseTuple<T extends readonly unknown[]>(tuple: T): unknown[] {
    // Write your solution here
    return [];
}

// === Challenge 4: FlattenDepth<T, Depth> ===
// TODO: Implement FlattenDepth that flattens a nested tuple to a given depth.
// FlattenDepth<[[1, [2]], [3]], 1> → [1, [2], 3]
// FlattenDepth<[[1, [2]], [3]], 2> → [1, 2, 3]
export type FlattenDepth<
    T extends readonly unknown[],
    Depth extends number = 1
> = any;

// TODO: Implement flattenToDepth that flattens an array to a given depth.
export function flattenToDepth(arr: unknown[], depth: number = 1): unknown[] {
    // Write your solution here
    return [];
}

// === Challenge 5: IsNever<T> ===
// TODO: Implement IsNever that returns true if T is never, false otherwise.
// IsNever<never> → true
// IsNever<string> → false
export type IsNever<T> = any;

// TODO: Implement isNeverValue that returns true if value is undefined.
// (never has no runtime representation; undefined is the closest proxy.)
export function isNeverValue(value: unknown): boolean {
    // Write your solution here
    return false;
}
