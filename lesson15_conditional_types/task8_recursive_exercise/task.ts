// TODO: Implement DeepReadonly<T>
// Makes every property readonly at all nesting levels.
// Handle arrays: produce readonly arrays with deeply readonly elements.
// Primitives should be returned unchanged.
export type DeepReadonly<T> = any;

// TODO: Implement Flatten<T>
// Recursively unwraps nested array types to the innermost element type.
// number[][] → number, string[] → string, boolean → boolean
export type Flatten<T> = any;

// TODO: Implement deepFreeze
// Recursively freezes an object and all nested objects using Object.freeze.
// Returns the object typed as DeepReadonly<T>.
export function deepFreeze<T extends Record<string, any>>(obj: T): DeepReadonly<T> {
    // Write your solution here
    return obj as DeepReadonly<T>;
}

// TODO: Implement flattenArray
// Takes a potentially nested array and returns a flat one-dimensional array.
// Example: [1, [2, [3]]] → [1, 2, 3]
export function flattenArray(arr: unknown[]): unknown[] {
    // Write your solution here
    return [];
}
