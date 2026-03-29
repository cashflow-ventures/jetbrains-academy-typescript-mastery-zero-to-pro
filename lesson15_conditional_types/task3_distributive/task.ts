// Distributive Conditional Types — Demonstration

// Distributive: T is a naked type parameter
type ToArray<T> = T extends any ? T[] : never;

type Distributed = ToArray<string | number>;
// string[] | number[]  (each member wrapped separately)

// Non-distributive: T is wrapped in a tuple
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type NonDistributed = ToArrayNonDist<string | number>;
// (string | number)[]  (union wrapped as a whole)

// The never trap — distributive version
type IsString<T> = T extends string ? true : false;
type NeverResult = IsString<never>;  // never (not true or false!)

// Safe never detection — non-distributive
type IsNever<T> = [T] extends [never] ? true : false;
type NeverCheck = IsNever<never>;    // true (correct!)

// Exclude relies on distribution
type MyExclude<T, U> = T extends U ? never : T;
type Letters = MyExclude<"a" | "b" | "c", "a" | "c">;
// "b"

// Runtime demonstration
function filterStrings(values: (string | number)[]): string[] {
    return values.filter((v): v is string => typeof v === "string");
}

const mixed = ["hello", 42, "world", 7];
console.log(filterStrings(mixed));  // ["hello", "world"]
