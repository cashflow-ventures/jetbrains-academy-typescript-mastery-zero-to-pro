// TODO: Implement mapArray
// A generic function with two type parameters <T, U>
// Takes an array of T and a callback (item: T) => U
// Returns an array of U
export function mapArray(arr: any[], fn: (item: any) => any): any[] {
    return [];
}

// TODO: Implement zipWith
// A generic function with three type parameters <A, B, C>
// Takes two arrays and a combiner (a: A, b: B) => C
// Returns an array of C (length = shorter array)
export function zipWith(arr1: any[], arr2: any[], fn: (a: any, b: any) => any): any[] {
    return [];
}

// TODO: Implement objectFromEntries
// A generic function with two type parameters <K extends string, V>
// Takes an array of [K, V] tuples
// Returns a Record<string, V>
export function objectFromEntries(entries: [string, any][]): Record<string, any> {
    return {};
}
