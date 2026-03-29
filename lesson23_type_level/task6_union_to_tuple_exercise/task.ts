// TODO: Implement UnionToIntersection<U>
// Converts a union A | B into an intersection A & B.
export type UnionToIntersection<U> = any;

// TODO: Implement LastOfUnion<U>
// Extracts the "last" member of a union type.
// Use UnionToIntersection to create an overloaded function,
// then infer the return type of the last overload.
export type LastOfUnion<U> = any;

// TODO: Implement UnionToTuple<U>
// Converts a union type into a tuple type by recursively
// peeling off the last member and prepending to an accumulator.
// Base case: [U] extends [never] → return accumulator.
export type UnionToTuple<U> = any;

// TODO: Implement objectKeys
// Returns Object.keys(obj) typed as (keyof T)[].
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
    // Write your solution here
    return [] as (keyof T)[];
}

// TODO: Implement unionSize
// Returns the number of own enumerable keys in the object.
export function unionSize<T extends object>(obj: T): number {
    // Write your solution here
    return 0;
}
