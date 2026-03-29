// TODO: Implement Mutable<T>
// Remove readonly from every property of T using -readonly
export type Mutable<T> = any;

// TODO: Implement Concrete<T>
// Remove optionality from every property of T using -?
export type Concrete<T> = any;

// TODO: Implement toMutable
// Takes a readonly object and returns a mutable shallow copy
// Use object spread to create the copy
export function toMutable<T extends Record<string, unknown>>(
    obj: Readonly<T>
): Mutable<T> {
    // Write your solution here
    return {} as Mutable<T>;
}

// TODO: Implement toConcrete
// Takes a partial object and a defaults object (with all required values)
// Returns a fully concrete object by merging defaults with the partial
export function toConcrete<T extends Record<string, unknown>>(
    partial: Partial<T>,
    defaults: T
): Concrete<T> {
    // Write your solution here
    return {} as Concrete<T>;
}
