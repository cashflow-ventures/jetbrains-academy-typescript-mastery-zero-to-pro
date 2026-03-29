// TODO: Implement MyPartial<T>
// Make every property of T optional using a mapped type
export type MyPartial<T> = any;

// TODO: Implement MyRequired<T>
// Make every property of T required using a mapped type (remove ?)
export type MyRequired<T> = any;

// TODO: Implement MyReadonly<T>
// Make every property of T readonly using a mapped type
export type MyReadonly<T> = any;

// TODO: Implement applyPartialUpdate
// Takes an object and a partial update, returns merged result
// Use object spread: { ...obj, ...update }
export function applyPartialUpdate<T extends Record<string, unknown>>(
    obj: T,
    update: MyPartial<T>
): T {
    // Write your solution here
    return {} as T;
}

// TODO: Implement freezeObject
// Takes an object and returns it as MyReadonly<T>
// Use Object.freeze internally
export function freezeObject<T extends Record<string, unknown>>(
    obj: T
): MyReadonly<T> {
    // Write your solution here
    return {} as MyReadonly<T>;
}
