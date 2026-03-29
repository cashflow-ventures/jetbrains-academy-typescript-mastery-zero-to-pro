# Repository Pattern Exercise

Implement a generic in-memory `Repository<T>` with full CRUD operations, using TypeScript's utility types to enforce correct input shapes.

## Instructions

1. The `Entity` interface and `Repository<T extends Entity>` interface are provided.

2. Implement the `InMemoryRepository<T extends Entity>` class that implements `Repository<T>`:
   - `create(data: Omit<T, "id">): T` — generates a unique string ID (use an incrementing counter starting at 1, converted to string), stores and returns the new entity
   - `findById(id: string): T | undefined` — returns the entity or `undefined`
   - `findAll(): T[]` — returns all entities as an array
   - `update(id: string, updates: Partial<Omit<T, "id">>): T | undefined` — merges updates into the existing entity and returns it, or returns `undefined` if not found
   - `deleteById(id: string): boolean` — removes the entity, returns `true` if it existed

3. Export `Entity`, `Repository`, and `InMemoryRepository`.

## Example

```typescript
interface Task extends Entity {
    title: string;
    done: boolean;
}

const repo = new InMemoryRepository<Task>();
const task = repo.create({ title: "Learn TS", done: false });
// task.id === "1", task.title === "Learn TS"

repo.update(task.id, { done: true });
repo.findById(task.id); // { id: "1", title: "Learn TS", done: true }
```

<div class="hint">
Use a `Map<string, T>` for storage and a numeric counter for ID generation.
The `create` method needs to merge `data` with the generated `id` — use the spread
operator and cast with `as T` since TypeScript can't verify that `Omit<T, "id"> & { id: string }`
equals `T` (it does structurally, but the compiler needs the assertion).
</div>
