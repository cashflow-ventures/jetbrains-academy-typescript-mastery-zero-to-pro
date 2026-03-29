// Generic Interfaces and Types — reusable data structures with type parameters

// 1. A generic interface for a container
interface Box<T> {
    value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
console.log(numberBox.value, stringBox.value); // 42 "hello"

// 2. A generic type alias with two parameters
type Pair<A, B> = {
    first: A;
    second: B;
};

const entry: Pair<string, number> = { first: "age", second: 30 };
console.log(entry.first, entry.second); // "age" 30

// 3. A generic Result type — success or failure
type Result<T, E> =
    | { success: true; value: T }
    | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return { success: false, error: "Division by zero" };
    }
    return { success: true, value: a / b };
}

const ok = divide(10, 2);   // { success: true, value: 5 }
const fail = divide(10, 0); // { success: false, error: "Division by zero" }
console.log(ok, fail);

// 4. Extending a generic interface
interface Timestamped<T> {
    data: T;
    createdAt: Date;
}

const record: Timestamped<string> = {
    data: "important",
    createdAt: new Date(),
};
console.log(record.data); // "important"
