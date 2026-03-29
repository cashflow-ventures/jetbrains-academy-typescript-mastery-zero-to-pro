// Conditional Types — Demonstration

// Basic conditional type: check if T is a string
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
type C = IsString<"hello">;   // true

// Multi-branch conditional type
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T1 = TypeName<string>;       // "string"
type T2 = TypeName<() => void>;   // "function"
type T3 = TypeName<number[]>;     // "object"

// Structural check with extends
type HasLength<T> = T extends { length: number } ? true : false;

type H1 = HasLength<string>;     // true
type H2 = HasLength<number[]>;   // true
type H3 = HasLength<number>;     // false

// Runtime helper to demonstrate the concept
function describeType<T>(value: T): string {
    if (typeof value === "string") return "string";
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    return "object";
}

console.log(describeType("hello"));  // "string"
console.log(describeType(42));       // "number"
console.log(describeType(true));     // "boolean"
console.log(describeType([1, 2]));   // "object"
