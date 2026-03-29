export interface User {
    name: string;
    email: string;
}

export interface Admin extends User {
    permissions: string[];
}

// TODO: Implement isString type guard
export function isString(value: unknown): value is string {
    // Write your solution here
    return false;
}

// TODO: Implement isNumber type guard (NaN should return false)
export function isNumber(value: unknown): value is number {
    // Write your solution here
    return false;
}

// TODO: Implement isUser type guard
// Check for an object with name (string) and email (string)
export function isUser(value: unknown): value is User {
    // Write your solution here
    return false;
}

// TODO: Implement isAdmin type guard
// Must be a valid User AND have a permissions array
export function isAdmin(value: unknown): value is Admin {
    // Write your solution here
    return false;
}

// TODO: Implement filterByType
// Filter an array using a type guard function
export function filterByType<T>(
    values: unknown[],
    guard: (value: unknown) => value is T
): T[] {
    // Write your solution here
    return [];
}
