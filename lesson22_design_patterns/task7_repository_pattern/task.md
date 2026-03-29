# Repository Pattern

The Repository pattern abstracts data access behind a clean interface, decoupling your business logic from the underlying storage mechanism. In TypeScript, generics make repositories reusable across any entity type while maintaining full type safety for CRUD operations.

## Core Concept

A repository acts as a collection-like interface for accessing domain objects. Instead of scattering database queries throughout your code, you centralize data access in repository classes that implement a generic interface. The rest of your application works with the repository interface — it doesn't know or care whether data comes from a database, an API, or an in-memory store.

```typescript
// Base entity — every stored object has an id
interface Entity {
    id: string;
}

// Generic repository interface
interface Repository<T extends Entity> {
    findById(id: string): T | undefined;
    findAll(): T[];
    create(item: Omit<T, "id">): T;
    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined;
    deleteById(id: string): boolean;
}
```

## How It Works

The `Repository<T extends Entity>` interface constrains `T` to types that have an `id` property. This ensures every entity can be identified, stored, and retrieved by its ID.

Key type techniques:
- `Omit<T, "id">` for `create()` — the caller provides all fields except `id`, which the repository generates
- `Partial<Omit<T, "id">>` for `update()` — the caller provides only the fields they want to change
- The `Entity` constraint ensures `T` always has an `id: string`

```typescript
interface Product extends Entity {
    name: string;
    price: number;
    category: string;
}

// The repository handles any Entity subtype
class InMemoryRepository<T extends Entity> implements Repository<T> {
    private store = new Map<string, T>();
    private counter = 0;

    findById(id: string): T | undefined {
        return this.store.get(id);
    }

    findAll(): T[] {
        return [...this.store.values()];
    }

    create(data: Omit<T, "id">): T {
        const id = String(++this.counter);
        const item = { ...data, id } as T;
        this.store.set(id, item);
        return item;
    }

    update(id: string, updates: Partial<Omit<T, "id">>): T | undefined {
        const existing = this.store.get(id);
        if (!existing) return undefined;
        const updated = { ...existing, ...updates };
        this.store.set(id, updated);
        return updated;
    }

    deleteById(id: string): boolean {
        return this.store.delete(id);
    }
}

const products: Repository<Product> = new InMemoryRepository<Product>();
const laptop = products.create({ name: "Laptop", price: 999, category: "electronics" });
products.update(laptop.id, { price: 899 }); // Only update price
```

## Common Pitfalls

- **Leaking storage details**: The repository interface should not expose database-specific concepts like SQL queries, connection pools, or ORM methods. Keep the interface clean and storage-agnostic.
- **God repositories**: Avoid adding too many query methods. If you need complex queries, consider a separate query object or specification pattern.
- **Ignoring the `Omit<T, "id">` pattern**: Letting callers set the `id` on `create()` leads to conflicts. The repository should own ID generation.

## Key Takeaways

- The Repository pattern abstracts data access behind a generic interface
- `T extends Entity` ensures every stored type has an identifiable `id`
- `Omit<T, "id">` and `Partial<>` provide precise types for create and update operations
- Swapping implementations (in-memory → database → API) requires no changes to business logic
- This pattern is foundational in clean architecture and domain-driven design

<div class="hint">
The Repository pattern pairs naturally with Dependency Injection (covered next). Your service
layer depends on the `Repository<T>` interface, and the DI container provides the concrete
implementation. This makes testing trivial — inject an `InMemoryRepository` in tests and a
`DatabaseRepository` in production.
</div>
