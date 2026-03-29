export {};
// Function Overloads

// 1. Basic overload — different parameter types, same return type
function padLeft(value: string, padding: number): string;
function padLeft(value: string, padding: string): string;
function padLeft(value: string, padding: number | string): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}

console.log(padLeft("hello", 4));       // "    hello"
console.log(padLeft("hello", ">>> "));  // ">>> hello"

// 2. Overload with different return types based on input
function parseInput(input: string): string;
function parseInput(input: number): number;
function parseInput(input: string | number): string | number {
    if (typeof input === "string") {
        return input.trim();
    }
    return Math.round(input);
}

const trimmed: string = parseInput("  hello  ");
const rounded: number = parseInput(3.7);
console.log(trimmed);  // "hello"
console.log(rounded);  // 4

// 3. Overload with different argument counts
function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(yearOrTimestamp: number, month?: number, day?: number): Date {
    if (month !== undefined && day !== undefined) {
        return new Date(yearOrTimestamp, month - 1, day);
    }
    return new Date(yearOrTimestamp);
}

console.log(createDate(0));             // 1970-01-01
console.log(createDate(2024, 6, 15));   // 2024-06-15

// 4. Overload order matters — specific before general
function processValue(value: "hello"): "greeting";
function processValue(value: string): string;
function processValue(value: string): string {
    if (value === "hello") {
        return "greeting";
    }
    return value.toUpperCase();
}

console.log(processValue("hello")); // "greeting"
console.log(processValue("world")); // "WORLD"
