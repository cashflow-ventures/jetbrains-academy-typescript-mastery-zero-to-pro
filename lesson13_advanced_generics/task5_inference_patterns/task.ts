// Generic Inference Patterns — Demonstration

// 1. Basic inference from argument
function wrap<T>(value: T): { wrapped: T } {
    return { wrapped: value };
}
const w1 = wrap(42);          // { wrapped: number }
const w2 = wrap("hello");     // { wrapped: string }

// 2. Inference from callback return type
function transform<T, U>(items: T[], fn: (item: T) => U): U[] {
    return items.map(fn);
}
const lengths = transform(["hi", "hello"], (s) => s.length); // number[]

// 3. Inference with constraints
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}
const longer = longest("typescript", "js"); // string

// 4. Inference from multiple sites
function pair<T>(a: T, b: T): [T, T] {
    return [a, b];
}
const nums = pair(1, 2);       // [number, number]

// 5. When inference needs help — parameter only in return type
function createArray<T>(length: number, fill: T): T[] {
    return new Array(length).fill(fill);
}
const zeros = createArray(3, 0);       // number[] — inferred from fill
const empty = createArray<string>(3, ""); // explicit when needed

console.log("Wrapped:", w1, w2);
console.log("Lengths:", lengths);
console.log("Longer:", longer);
console.log("Pairs:", nums);
console.log("Zeros:", zeros);
console.log("Empty:", empty);
