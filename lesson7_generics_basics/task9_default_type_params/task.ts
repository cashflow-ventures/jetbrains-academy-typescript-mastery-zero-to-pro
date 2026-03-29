// Default Type Parameters — convenient defaults for generic types

// 1. Interface with a default type parameter
interface Container<T = string> {
    value: T;
}

const text: Container = { value: "hello" };         // T defaults to string
const num: Container<number> = { value: 42 };       // T explicitly set to number
console.log(text.value, num.value);                  // "hello" 42

// 2. Type alias with multiple parameters and a default
type ApiResponse<T, E = Error> = {
    data: T | null;
    error: E | null;
};

const success: ApiResponse<string> = { data: "ok", error: null };
const failure: ApiResponse<string> = { data: null, error: new Error("fail") };
console.log(success.data);  // "ok"
console.log(failure.error);  // Error: fail

// 3. Class with a default type parameter
class Store<T = Record<string, unknown>> {
    private data: T;

    constructor(initial: T) {
        this.data = initial;
    }

    getData(): T {
        return this.data;
    }

    setData(value: T): void {
        this.data = value;
    }
}

const generic = new Store({ name: "Alice" }); // T inferred from argument
const typed = new Store<number>(0);            // T explicitly number
console.log(generic.getData()); // { name: "Alice" }
console.log(typed.getData());   // 0

// 4. Combining constraints with defaults
interface HasLength {
    length: number;
}

function wrap<T extends HasLength = string>(value: T): { wrapped: T; length: number } {
    return { wrapped: value, length: value.length };
}

console.log(wrap("hello"));     // { wrapped: "hello", length: 5 }
console.log(wrap([1, 2, 3]));   // { wrapped: [1, 2, 3], length: 3 }
