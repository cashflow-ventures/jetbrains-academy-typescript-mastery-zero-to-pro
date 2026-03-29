export interface User {
    id: number;
    name: string;
    active: boolean;
}

// TODO: Implement delayedValue
// Returns a promise that resolves to `value` after `ms` milliseconds
export function delayedValue<T>(value: T, ms: number): Promise<T> {
    // Write your solution here
    return Promise.resolve(value);
}

// TODO: Implement fetchUserById
// If id > 0, resolve with { id, name: "User_" + id, active: true }
// If id <= 0, throw new Error("Invalid user id")
export async function fetchUserById(id: number): Promise<User> {
    // Write your solution here
    return { id: 0, name: "", active: false };
}

// TODO: Implement safeGetUserName
// Calls fetchUserById and returns the user's name
// If fetchUserById throws, return "Unknown"
export async function safeGetUserName(id: number): Promise<string> {
    // Write your solution here
    return "";
}

// TODO: Implement processSequential
// Calls safeGetUserName for each id sequentially (not in parallel)
// Returns an array of names
export async function processSequential(ids: number[]): Promise<string[]> {
    // Write your solution here
    return [];
}
