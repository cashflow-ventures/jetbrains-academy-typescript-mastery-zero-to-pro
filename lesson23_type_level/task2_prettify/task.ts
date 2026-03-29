// TODO: Implement Prettify<T>
// Takes an object type (possibly an intersection) and returns a single
// flat object type with all properties expanded.
export type Prettify<T> = any;

// TODO: Implement prettifyObject
// Returns the same object at runtime, but typed as Prettify<T>.
// This is a type-only transformation — a no-op at runtime.
export function prettifyObject<T extends object>(obj: T): Prettify<T> {
    // Write your solution here
    return {} as Prettify<T>;
}

// TODO: Implement mergeAndPrettify
// Merges two objects using Object.assign and returns the result
// typed as Prettify<A & B>.
export function mergeAndPrettify<A extends object, B extends object>(
    a: A,
    b: B
): Prettify<A & B> {
    // Write your solution here
    return {} as Prettify<A & B>;
}
