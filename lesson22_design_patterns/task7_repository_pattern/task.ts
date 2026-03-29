// Repository Pattern — Data access abstraction with generics

// Base entity type — every stored entity has an id
interface Entity {
    id: string;
}

// Generic repository interface — defines CRUD operations for any entity
interface Repository<T extends Entity> {
    findById(id: string): T | undefined;
    findAll(): T[];
    create(item: Omit<T, "id">): T;
    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined;
    deleteById(id: string): boolean;
}

// Domain model
interface User extends Entity {
    name: string;
    email: string;
    role: "admin" | "user";
}

// In-memory implementation of the repository
class InMemoryRepository<T extends Entity> implements Repository<T> {
    private items = new Map<string, T>();
    private nextId = 1;

    findById(id: string): T | undefined {
        return this.items.get(id);
    }

    findAll(): T[] {
        return Array.from(this.items.values());
    }

    create(data: Omit<T, "id">): T {
        const id = String(this.nextId++);
        const item = { ...data, id } as T;
        this.items.set(id, item);
        return item;
    }

    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined {
        const existing = this.items.get(id);
        if (!existing) return undefined;
        const updated = { ...existing, ...updates };
        this.items.set(id, updated);
        return updated;
    }

    deleteById(id: string): boolean {
        return this.items.delete(id);
    }
}

// Usage — the consuming code only depends on the Repository interface
const userRepo: Repository<User> = new InMemoryRepository<User>();

const alice = userRepo.create({ name: "Alice", email: "alice@test.com", role: "admin" });
console.log("Created:", alice); // { id: "1", name: "Alice", ... }

userRepo.update(alice.id, { role: "user" });
console.log("Updated:", userRepo.findById(alice.id));

console.log("All users:", userRepo.findAll());
console.log("Deleted:", userRepo.deleteById(alice.id)); // true
console.log("After delete:", userRepo.findAll()); // []
