// Using DefinitelyTyped — how @types packages provide type information

// When a JavaScript library doesn't ship its own types,
// you install @types/library-name from DefinitelyTyped.

// Simulating what @types packages provide:
// After `npm install @types/lodash`, TypeScript knows these signatures:

// declare module "lodash" {
//     export function chunk<T>(array: T[], size: number): T[][];
//     export function groupBy<T>(collection: T[], key: keyof T): Record<string, T[]>;
//     export function sortBy<T>(collection: T[], key: keyof T): T[];
// }

// Here's a practical example of how typed libraries improve your code:

interface TeamMember {
    id: number;
    name: string;
    role: "admin" | "user" | "guest";
}

// Simulating a typed utility function (like lodash.groupBy)
function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
    const result: Record<string, T[]> = {};
    for (const item of items) {
        const groupKey = String(item[key]);
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
    }
    return result;
}

const members: TeamMember[] = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" },
    { id: 4, name: "Diana", role: "admin" },
];

// TypeScript knows the return type is Record<string, TeamMember[]>
const byRole = groupBy(members, "role");
console.log("Admins:", byRole["admin"]);
console.log("Users:", byRole["user"]);

// Without @types, you'd get: Cannot find module 'lodash'
// With @types/lodash installed, full IntelliSense and type checking works.
