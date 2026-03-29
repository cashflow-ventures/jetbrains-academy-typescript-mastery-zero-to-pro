// Type-Only Imports and Exports — keeping types separate from values

// --- Defining types and values in one module ---

export interface User {
    id: number;
    name: string;
    email: string;
}

export type Role = "admin" | "editor" | "viewer";

export function createUser(name: string, role: Role): User & { role: Role } {
    return { id: Date.now(), name, email: `${name.toLowerCase()}@example.com`, role };
}

// --- Type-only export (conceptual) ---
// In another file you might write:
//   export type { User, Role } from "./models";
// This re-exports only the types — no runtime code.

// --- Demonstrating the difference ---

// Regular import (value + type): keeps the import in JS output
//   import { createUser, User } from "./models";

// Type-only import: completely erased from JS output
//   import type { User, Role } from "./models";

// Inline type qualifier (TS 4.5+): mix in one statement
//   import { createUser, type User, type Role } from "./models";

// --- Using the exports ---
const admin = createUser("Alice", "admin");
console.log("User:", admin.name, "| Role:", admin.role);

// The User interface is used only as a type annotation here.
// With `import type { User }`, this annotation works but
// the import is erased from the compiled JavaScript.
function formatUser(user: User): string {
    return `${user.name} <${user.email}>`;
}

console.log("Formatted:", formatUser(admin));
