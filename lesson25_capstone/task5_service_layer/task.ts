// TODO: Build a service layer with dependency injection and variance-correct generics.
// This capstone exercise combines generics, interfaces, classes, the Result pattern,
// and constructor injection into a realistic service layer.

// --- Result<T, E> ---
// TODO: Export a Result<T, E> discriminated union type:
//   Success: { ok: true; value: T }
//   Failure: { ok: false; error: E }

// --- ok / err helpers ---
// TODO: Export ok<T>(value: T): Result<T, never>
export function ok(value: any): any {
    // Write your solution here
    return undefined;
}

// TODO: Export err<E>(error: E): Result<never, E>
export function err(error: any): any {
    // Write your solution here
    return undefined;
}

// --- User interface ---
// TODO: Export a User interface with id (string), name (string), email (string)

// --- Repository<T> interface ---
// TODO: Export a generic Repository<T> interface with:
//   find(id: string): T | undefined
//   findAll(): T[]
//   save(item: T): void
//   deleteById(id: string): boolean

// --- InMemoryRepository<T extends { id: string }> ---
// TODO: Export a class InMemoryRepository<T extends { id: string }>
//   that implements Repository<T>.
//   Use a private Map<string, T> for storage.
export class InMemoryRepository<T extends { id: string }> {
    // Write your solution here

    find(id: string): any {
        return undefined;
    }

    findAll(): any[] {
        return [];
    }

    save(item: any): void {
        // Write your solution here
    }

    deleteById(id: string): boolean {
        return false;
    }
}

// --- UserService ---
// TODO: Export a UserService class that takes Repository<User> via constructor.
//   Methods:
//     getUserById(id: string): Result<User, string>
//     createUser(name: string, email: string): Result<User, string>
//     listUsers(): User[]
export class UserService {
    constructor(repo: any) {
        // Write your solution here
    }

    getUserById(id: string): any {
        // Write your solution here
        return undefined;
    }

    createUser(name: string, email: string): any {
        // Write your solution here
        return undefined;
    }

    listUsers(): any[] {
        // Write your solution here
        return [];
    }
}
