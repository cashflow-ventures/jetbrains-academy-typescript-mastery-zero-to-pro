// Mapped Type Modifiers — Demonstration

interface LockedConfig {
    readonly host: string;
    readonly port: number;
    readonly debug: boolean;
}

interface PartialUser {
    name?: string;
    age?: number;
    active?: boolean;
}

// Remove readonly with -readonly
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

// Remove optionality with -?
type Concrete<T> = {
    [K in keyof T]-?: T[K];
};

// Add both readonly and optional with + prefix
type ReadonlyPartial<T> = {
    +readonly [K in keyof T]+?: T[K];
};

// --- Usage ---
type EditableConfig = Mutable<LockedConfig>;
// { host: string; port: number; debug: boolean }

type RequiredUser = Concrete<PartialUser>;
// { name: string; age: number; active: boolean }

const editable: EditableConfig = { host: "localhost", port: 3000, debug: false };
editable.port = 8080; // OK — readonly removed

const required: RequiredUser = { name: "Alice", age: 30, active: true };
// All properties must be provided — optionality removed

console.log("Editable config:", editable);
console.log("Required user:", required);
