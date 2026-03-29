// TODO: Define a User interface with id (number), name (string), email (string), active (boolean)
export interface User {
    // Define properties here
}

// TODO: Define an Admin interface that extends User and adds permissions (string[])
export interface Admin extends User {
    // Define additional properties here
}

// TODO: Implement createUser
// Takes id (number), name (string), email (string)
// Returns a User with active set to true
export function createUser(id: number, name: string, email: string): User {
    // Write your solution here
    return {} as User;
}

// TODO: Implement createAdmin
// Takes id (number), name (string), email (string), permissions (string[])
// Returns an Admin with active set to true
export function createAdmin(id: number, name: string, email: string, permissions: string[]): Admin {
    // Write your solution here
    return {} as Admin;
}

// TODO: Implement summarizeUser
// Takes a User and returns "name (email) - active" or "name (email) - inactive"
export function summarizeUser(user: User): string {
    // Write your solution here
    return "";
}
