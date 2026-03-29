// Multiple Type Parameters — Demonstration

// Two independent type parameters
function makePair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Constrained relationship: K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Transformation: Input → Output via callback
function transform<Input, Output>(
    value: Input,
    fn: (item: Input) => Output
): Output {
    return fn(value);
}

// --- Usage ---
const pair = makePair("hello", 42);       // [string, number]
console.log("Pair:", pair);

const user = { name: "Alice", age: 30, active: true };
const userName = getProperty(user, "name"); // string
const userAge = getProperty(user, "age");   // number
console.log("Name:", userName, "Age:", userAge);

const length = transform("TypeScript", (s) => s.length); // number
console.log("Length:", length);

// Swap uses two related parameters
function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]];
}

const swapped = swap(["first", 100]);
console.log("Swapped:", swapped); // [100, "first"]
