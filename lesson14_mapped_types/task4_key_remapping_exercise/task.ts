// TODO: Implement Getters<T>
// For each property K of T, create a getter method: getX(): T[K]
// Keys should be renamed to `get${Capitalize<string & K>}`
export type Getters<T> = any;

// TODO: Implement Setters<T>
// For each property K of T, create a setter method: setX(value: T[K]): void
// Keys should be renamed to `set${Capitalize<string & K>}`
export type Setters<T> = any;

// TODO: Implement createGetters
// Takes an object of type T and returns an object matching Getters<T>
// Each getter should return the corresponding property value
export function createGetters<T extends Record<string, unknown>>(
    obj: T
): Getters<T> {
    // Write your solution here
    return {} as Getters<T>;
}

// TODO: Implement createSetters
// Takes an object of type T (by reference) and returns Setters<T>
// Each setter should mutate the corresponding property on the original object
export function createSetters<T extends Record<string, unknown>>(
    obj: T
): Setters<T> {
    // Write your solution here
    return {} as Setters<T>;
}
