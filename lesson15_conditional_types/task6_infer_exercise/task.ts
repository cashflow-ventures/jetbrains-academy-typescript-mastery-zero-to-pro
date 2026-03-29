// TODO: Implement UnpackPromise<T>
// If T is Promise<U>, resolve to U. Otherwise resolve to T.
export type UnpackPromise<T> = any;

// TODO: Implement ElementType<T>
// If T is an array of E, resolve to E. Otherwise resolve to T.
export type ElementType<T> = any;

// TODO: Implement ReturnOf<T>
// If T is a function, resolve to its return type. Otherwise resolve to never.
export type ReturnOf<T> = any;

// TODO: Implement unwrapArray
// If value is an array, return it. Otherwise wrap it in an array.
export function unwrapArray<T>(value: T | T[]): T[] {
    // Write your solution here
    return [] as T[];
}

// TODO: Implement getReturnValue
// Call the function and return its result
export function getReturnValue<T>(fn: () => T): T {
    // Write your solution here
    return undefined as T;
}
