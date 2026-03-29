// Type-Level Arithmetic via tuple lengths
// TypeScript has no numeric operators at the type level,
// but tuples give us a way to count.

// --- BuildTuple: create a tuple of length N ---
type BuildTuple<N extends number, Acc extends unknown[] = []> =
    Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>;

type T3 = BuildTuple<3>;  // [unknown, unknown, unknown]
type T0 = BuildTuple<0>;  // []

// --- Length: read a tuple's length as a numeric literal ---
type Length<T extends readonly unknown[]> = T["length"];

type L = Length<[1, 2, 3]>;  // 3

// --- Add: spread two tuples and read combined length ---
type Add<A extends number, B extends number> =
    [...BuildTuple<A>, ...BuildTuple<B>]["length"] extends infer S extends number
        ? S : never;

type Sum1 = Add<3, 5>;   // 8
type Sum2 = Add<0, 7>;   // 7
type Sum3 = Add<10, 10>; // 20

// --- Subtract: drop B elements from a tuple of length A ---
type Subtract<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest]
        ? Rest["length"] extends infer D extends number ? D : never
        : never;

type Diff1 = Subtract<8, 5>;  // 3
type Diff2 = Subtract<5, 5>;  // 0
type Diff3 = Subtract<3, 8>;  // never (A < B)

// --- Comparison ---
type IsGreaterOrEqual<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer _] ? true : false;

type GE1 = IsGreaterOrEqual<5, 3>;  // true
type GE2 = IsGreaterOrEqual<3, 3>;  // true
type GE3 = IsGreaterOrEqual<2, 7>;  // false

console.log("Type-level arithmetic: tuples are the numbers of the type world.");
