// TODO: Export an interface ReadonlyStore<T> with variance annotation (out T)
// It should have a method: getValue(): T
export interface ReadonlyStore<T> {
    getValue(): T;
}

// TODO: Export an interface Comparator<T> with variance annotation (in T)
// It should have a method: compare(a: T, b: T): number
export interface Comparator<T> {
    compare(a: T, b: T): number;
}

// TODO: Implement createReadonlyStore
// Takes a value of type T, returns a ReadonlyStore<T>
export function createReadonlyStore(value: any): any {
    return {};
}

// TODO: Implement createComparator
// Takes a key-extraction function (item: T) => number
// Returns a Comparator<T> that compares by subtracting extracted values
export function createComparator(keyFn: (item: any) => number): any {
    return {};
}
