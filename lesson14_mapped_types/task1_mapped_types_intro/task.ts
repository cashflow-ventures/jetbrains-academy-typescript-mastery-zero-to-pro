// Mapped Types — Demonstration

interface User {
    name: string;
    age: number;
    active: boolean;
}

// Identity mapped type — produces the same shape as T
type Identity<T> = {
    [K in keyof T]: T[K];
};

// Make every property optional (how Partial works)
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

// Make every property nullable
type Nullable<T> = {
    [K in keyof T]: T[K] | null;
};

// Map over an arbitrary union of keys
type FeatureFlags = {
    [K in "darkMode" | "notifications" | "analytics"]: boolean;
};

// --- Usage ---
type IdenticalUser = Identity<User>;
// { name: string; age: number; active: boolean }

type OptionalUser = MyPartial<User>;
// { name?: string; age?: number; active?: boolean }

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; active: boolean | null }

const flags: FeatureFlags = {
    darkMode: true,
    notifications: false,
    analytics: true,
};

console.log("Feature flags:", flags);
