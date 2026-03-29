// The infer Keyword — Demonstration

// Extract the return type of a function
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type R1 = ReturnOf<() => string>;           // string
type R2 = ReturnOf<(x: number) => boolean>; // boolean

// Unwrap a Promise to get the inner type
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type P1 = UnpackPromise<Promise<string>>;   // string
type P2 = UnpackPromise<number>;            // number

// Extract the element type of an array
type ElementType<T> = T extends (infer E)[] ? E : T;

type E1 = ElementType<number[]>;   // number
type E2 = ElementType<string>;     // string

// Extract both args and return type
type FunctionParts<T> = T extends (...args: infer A) => infer R
    ? { args: A; returnType: R }
    : never;

type Parts = FunctionParts<(x: number, y: string) => boolean>;
// { args: [x: number, y: string]; returnType: boolean }

// Runtime demonstration of the concept
function unwrapArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}

console.log(unwrapArray("hello"));     // ["hello"]
console.log(unwrapArray([1, 2, 3]));   // [1, 2, 3]
