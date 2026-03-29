// Introduction to Generics — reusable, type-safe functions with <T>

// 1. A generic identity function — returns exactly what you pass in
function identity<T>(value: T): T {
    return value;
}

const num = identity(42);           // TypeScript infers T = number
const str = identity("generics");   // TypeScript infers T = string
console.log(num, str);              // 42 "generics"

// 2. Generic function that wraps a value
function wrapInArray<T>(value: T): T[] {
    return [value];
}

const numbers = wrapInArray(10);    // number[]
const strings = wrapInArray("hi");  // string[]
console.log(numbers, strings);      // [10] ["hi"]

// 3. Multiple type parameters
function makePair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}

const pair = makePair("age", 30);   // [string, number]
console.log(pair);                  // ["age", 30]

// 4. Why not any? Compare the return types:
function withAny(value: any): any {
    return value;
}

const lost = withAny("hello");      // lost: any — type information is gone
const kept = identity("hello");     // kept: string — type is preserved
console.log(lost, kept);
