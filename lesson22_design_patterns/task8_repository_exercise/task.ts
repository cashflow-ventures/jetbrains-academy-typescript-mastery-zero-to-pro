// TODO: Implement InMemoryRepository<T extends Entity> that implements Repository<T>
//
// Use a Map<string, T> for storage and an incrementing counter (starting at 1) for IDs.
// create() generates the id, stores the entity, and returns it.
// findById() returns the entity or undefined.
// findAll() returns all entities as an array.
// update() merges partial updates into the existing entity, returns updated entity or undefined.
// deleteById() removes the entity, returns true if it existed.

export interface Entity {
    id: string;
}

export interface Repository<T extends Entity> {
    create(data: Omit<T, "id">): T;
    findById(id: string): T | undefined;
    findAll(): T[];
    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined;
    deleteById(id: string): boolean;
}

export class InMemoryRepository<T extends Entity> implements Repository<T> {
    // Write your solution here

    create(data: Omit<T, "id">): T {
        // Write your solution here
        return {} as T;
    }

    findById(id: string): T | undefined {
        // Write your solution here
        return undefined;
    }

    findAll(): T[] {
        // Write your solution here
        return [];
    }

    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined {
        // Write your solution here
        return undefined;
    }

    deleteById(id: string): boolean {
        // Write your solution here
        return false;
    }
}
