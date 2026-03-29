export {};
// Function Type Annotations — Complete Examples

// 1. Function declaration with parameter and return type annotations
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(3, 7)); // 10

// 2. Arrow function with explicit return type
const greet = (name: string): string => `Hello, ${name}!`;
console.log(greet("TypeScript")); // "Hello, TypeScript!"

// 3. Function type expression — describe a function's shape as a type
type MathOperation = (x: number, y: number) => number;

const multiply: MathOperation = (x, y) => x * y;
const subtract: MathOperation = (x, y) => x - y;

console.log(multiply(4, 5)); // 20
console.log(subtract(10, 3)); // 7

// 4. Function type in an interface
interface StringTransformer {
    (input: string): string;
}

const shout: StringTransformer = (s) => s.toUpperCase() + "!";
console.log(shout("hello")); // "HELLO!"

// 5. Return type inference — TS figures out the return type
const double = (n: number) => n * 2; // inferred return type: number
console.log(double(21)); // 42

// 6. Functions that return void — no meaningful return value
function logMessage(message: string): void {
    console.log(`[LOG] ${message}`);
}
logMessage("Functions are typed!");
