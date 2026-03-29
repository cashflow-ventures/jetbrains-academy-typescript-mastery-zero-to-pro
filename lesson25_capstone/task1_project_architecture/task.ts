// Layered Architecture — Domain, Service, API with barrel exports
// Demonstrates layered structure, branded types, and Result pattern.

// === DOMAIN LAYER (zero dependencies) ===
type UserId = string & { readonly __brand: unique symbol };
const createUserId = (id: string): UserId => id as UserId;

interface User {
    readonly id: UserId;
    readonly name: string;
    readonly role: "admin" | "editor" | "viewer";
}

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// === SERVICE LAYER (depends on domain only) ===
function findUser(users: readonly User[], id: UserId): Result<User, string> {
    const user = users.find((u) => u.id === id);
    return user ? { ok: true, value: user } : { ok: false, error: `User ${id} not found` };
}

// === API LAYER (depends on service + domain) ===
function handleGetUser(users: readonly User[], rawId: string): string {
    const result = findUser(users, createUserId(rawId));
    return result.ok
        ? `200: ${result.value.name} (${result.value.role})`
        : `404: ${result.error}`;
}

// --- Barrel export pattern (what index.ts files would contain): ---
// export { User, UserId, createUserId } from "./models/user";
// export { Result } from "./result";
// export { findUser } from "./services/userService";

// --- Usage ---
const users: User[] = [
    { id: createUserId("u1"), name: "Alice", role: "admin" },
    { id: createUserId("u2"), name: "Bob", role: "viewer" },
];

console.log(handleGetUser(users, "u1")); // 200: Alice (admin)
console.log(handleGetUser(users, "u9")); // 404: User u9 not found
