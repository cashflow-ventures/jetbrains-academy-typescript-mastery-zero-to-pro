// TODO: Implement UnionToIntersection<U>
// Converts a union type A | B | C into an intersection A & B & C.
// Use contravariant inference in function parameter position.
export type UnionToIntersection<U> = any;

// TODO: Implement mergeConfigs
// Takes an array of config objects and merges them into one using Object.assign.
// Return type should be UnionToIntersection<T>.
export function mergeConfigs<T extends object>(
    configs: T[]
): UnionToIntersection<T> {
    // Write your solution here
    return {} as UnionToIntersection<T>;
}

// TODO: Implement collectHandlers
// Merges an array of handler maps into a single handler map.
// Return type should be UnionToIntersection<T>.
export function collectHandlers<T extends Record<string, Function>>(
    handlers: T[]
): UnionToIntersection<T> {
    // Write your solution here
    return {} as UnionToIntersection<T>;
}
