// Key Remapping — Demonstration

interface User {
    name: string;
    age: number;
    active: boolean;
}

// Rename keys to getter-style: getName, getAge, getActive
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getActive: () => boolean }

// Filter out non-string properties using key remapping + never
type StringKeysOnly<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type UserStrings = StringKeysOnly<User>;
// { name: string }

// Prefix all keys with "on"
type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserEvents = EventHandlers<User>;
// { onName: (value: string) => void; onAge: (value: number) => void; ... }

// --- Usage ---
const getters: UserGetters = {
    getName: () => "Alice",
    getAge: () => 30,
    getActive: () => true,
};

console.log("Name:", getters.getName());
console.log("Age:", getters.getAge());

const handlers: UserEvents = {
    onName: (v) => console.log("Name changed:", v),
    onAge: (v) => console.log("Age changed:", v),
    onActive: (v) => console.log("Active changed:", v),
};

handlers.onName("Bob");
