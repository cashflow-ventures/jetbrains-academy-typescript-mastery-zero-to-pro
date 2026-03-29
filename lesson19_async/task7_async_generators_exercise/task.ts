// TODO: Implement asyncRange
// Yields integers from start to end (inclusive), each asynchronously
export async function* asyncRange(start: number, end: number): AsyncGenerator<number> {
    // Write your solution here
}

// TODO: Implement asyncMap
// Applies fn to each item from source and yields the result
export async function* asyncMap<T, U>(
    source: AsyncIterable<T>,
    fn: (item: T) => U
): AsyncGenerator<U> {
    // Write your solution here
}

// TODO: Implement asyncTake
// Yields at most count items from source
export async function* asyncTake<T>(
    source: AsyncIterable<T>,
    count: number
): AsyncGenerator<T> {
    // Write your solution here
}

// TODO: Implement collectAsync
// Collects all items from an async iterable into an array
export async function collectAsync<T>(source: AsyncIterable<T>): Promise<T[]> {
    // Write your solution here
    return [];
}

// TODO: Implement paginate
// Calls fetchPage(0), fetchPage(1), ... yielding each item
// Stops when fetchPage returns an empty array
export async function* paginate<T>(
    fetchPage: (page: number) => Promise<T[]>
): AsyncGenerator<T> {
    // Write your solution here
}
