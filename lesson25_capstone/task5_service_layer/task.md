# Service Layer

A well-structured service layer sits between your API handlers and your data store.
It encapsulates business logic, depends on abstractions (not concrete implementations),
and uses variance-correct generics so that repositories remain substitutable.
In this exercise you'll wire up a complete service layer using constructor injection,
a generic repository interface, and the Result pattern for error handling.

## Instructions

1. In `task.ts`, define and export a `Result<T, E>` discriminated union type:
   - Success variant: `{ ok: true; value: T }`
   - Failure variant: `{ ok: false; error: E }`

2. Export helper functions to construct Result values:
   - `ok<T>(value: T): Result<T, never>` — creates a success result
   - `err<E>(error: E): Result<never, E>` — creates a failure result

3. Define and export a `User` interface with:
   - `id: string`
   - `name: string`
   - `email: string`

4. Define and export a generic `Repository<T>` interface with these methods:
   - `find(id: string): T | undefined` — find an item by id
   - `findAll(): T[]` — return all items
   - `save(item: T): void` — add or update an item
   - `deleteById(id: string): boolean` — remove an item, return `true` if it existed

5. Export an `InMemoryRepository<T extends { id: string }>` class that implements
   `Repository<T>`. It should:
   - Store items in a `private` `Map<string, T>` keyed by `item.id`
   - Implement all four `Repository<T>` methods

6. Export a `UserService` class that:
   - Accepts a `Repository<User>` via its constructor (dependency injection)
   - Stores the repository in a `private readonly` field
   - Exposes these methods:
     - `getUserById(id: string): Result<User, string>` — returns `ok(user)` if found,
       `err("User not found")` if not
     - `createUser(name: string, email: string): Result<User, string>` — validates that
       `name` and `email` are non-empty strings, returns `err("Name is required")` or
       `err("Email is required")` on failure, otherwise saves and returns `ok(user)`.
       Use `"user-" + Date.now()` as the generated id (tests will check the prefix only).
     - `listUsers(): User[]` — returns all users from the repository

## Example

```typescript
const repo = new InMemoryRepository<User>();
const service = new UserService(repo);

const created = service.createUser("Alice", "alice@example.com");
// { ok: true, value: { id: "user-...", name: "Alice", email: "alice@example.com" } }

const found = service.getUserById(created.ok ? created.value.id : "");
// { ok: true, value: { id: "user-...", name: "Alice", ... } }

service.listUsers(); // [{ id: "user-...", name: "Alice", email: "alice@example.com" }]
```

<div class="hint">
The `InMemoryRepository` uses a `Map<string, T>` internally. For `find`, use
`map.get(id)`. For `save`, use `map.set(item.id, item)`. For `deleteById`, use
`map.delete(id)` which conveniently returns a boolean. The `UserService` constructor
takes a `Repository<User>` — not `InMemoryRepository<User>` — so the service
depends on the abstraction, not the implementation. This is the core of DI.
</div>
