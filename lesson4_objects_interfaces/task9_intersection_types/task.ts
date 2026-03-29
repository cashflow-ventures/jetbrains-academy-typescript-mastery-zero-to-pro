// Intersection Types — combining types with &

// 1. Basic intersection: merge two object types
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const alice: Person = { name: "Alice", age: 30 };
console.log(`${alice.name}, age ${alice.age}`);

// 2. Composing multiple types for a rich entity
type WithId = { id: number };
type WithTimestamps = { createdAt: Date; updatedAt: Date };

type UserRecord = WithId & WithTimestamps & {
    name: string;
    email: string;
};

const user: UserRecord = {
    id: 1,
    name: "Bob",
    email: "bob@example.com",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-06-15"),
};
console.log(`User ${user.id}: ${user.name} (created ${user.createdAt.toISOString()})`);

// 3. Intersecting interfaces
interface Printable {
    print(): string;
}

interface Serializable {
    serialize(): string;
}

type Document = Printable & Serializable & { title: string };

const doc: Document = {
    title: "Report",
    print(): string { return `Printing: ${this.title}`; },
    serialize(): string { return JSON.stringify({ title: this.title }); },
};

console.log(doc.print());
console.log(doc.serialize());
