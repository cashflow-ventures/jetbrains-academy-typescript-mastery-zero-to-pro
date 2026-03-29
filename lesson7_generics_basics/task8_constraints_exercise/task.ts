// TODO: Implement longest — returns whichever argument has greater .length
// Constraint: T must have a length property of type number
// If lengths are equal, return the first argument
export function longest<T extends { length: number }>(a: T, b: T): T {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement mergeObjects — combines two objects into one
// Constraint: both T and U must be objects
// Return type: T & U
export function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement getProperty — safely access a property by key
// Constraint: K must be a key of T
// Return type: T[K]
export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement filterByProperty — filter items by their name property
// Constraint: T must have a name property of type string
// Return items whose name matches the searchName
export function filterByProperty<T extends { name: string }>(items: T[], searchName: string): T[] {
    // Write your solution here
    return [];
}
