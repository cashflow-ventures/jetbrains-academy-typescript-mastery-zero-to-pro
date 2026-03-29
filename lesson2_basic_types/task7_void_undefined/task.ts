export {};
// void and undefined in TypeScript

// 1. void — a function that doesn't return a meaningful value
function logMessage(message: string): void {
    console.log(`[LOG] ${message}`);
    // No return statement, or just `return;`
}

// 2. undefined — a function that explicitly returns undefined
function findItem(id: number): string | undefined {
    const items: string[] = ["apple", "banana", "cherry"];
    return items[id]; // returns undefined if id is out of bounds
}

// 3. The subtle difference
// void means "ignore the return value" — the function may return undefined
// undefined means "the return value IS undefined" — it's a specific type

// void allows callbacks that return anything (return value is ignored)
const numbers: number[] = [1, 2, 3];
// Array.forEach expects (value: number) => void
// Even though push returns a number, this works because void means "ignore return"
const result: number[] = [];
numbers.forEach((n) => result.push(n * 2));

// 4. A variable of type void can only be undefined
const nothing: void = undefined;
// const bad: void = null;  // Error in strict mode
// const worse: void = 42;  // Error: Type 'number' is not assignable to type 'void'

// 5. undefined as a type
let maybeValue: string | undefined = "hello";
maybeValue = undefined; // OK
// maybeValue = null;    // Error: null is not undefined

// 6. Practical example: optional return
function divide(a: number, b: number): number | undefined {
    if (b === 0) return undefined;
    return a / b;
}

logMessage("Hello, TypeScript!");
console.log(findItem(0));  // "apple"
console.log(findItem(99)); // undefined
console.log(divide(10, 3)); // 3.333...
console.log(divide(10, 0)); // undefined
