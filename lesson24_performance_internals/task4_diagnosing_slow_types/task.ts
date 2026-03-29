// Diagnosing Slow Types — Practical Example
//
// Profile commands:
//   tsc --extendedDiagnostics --noEmit       → timing + instantiation count
//   tsc --generateTrace ./trace --noEmit     → detailed trace files
//   npx @typescript/analyze-trace ./trace    → ranked summary of slow types

// --- 1. Fast type: shallow, single instantiation ---
type ShallowFlatten<T> = T extends Array<infer U> ? U : T;
type Fast = ShallowFlatten<string[]>; // string — 1 instantiation

// --- 2. Slow type: deep recursion, many instantiations ---
type DeepFlatten<T> = T extends Array<infer U> ? DeepFlatten<U> : T;
type Slow = DeepFlatten<number[][][][]>; // number — 4 levels deep

// --- 3. Distributive conditional — cost scales with union size ---
type Stringify<T> = T extends number ? `${T}` : T extends boolean ? `${T}` : string;
type Demo = Stringify<1 | 2 | 3 | 4 | 5>; // 5 evaluations

// --- 4. Template literal cross-product: union size = product of slots ---
type Hex = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f";
type HexPair = `${Hex}${Hex}`;  // 16 × 16 = 256 members

// --- 5. Accumulator pattern: fewer instantiations than naive recursion ---
type NaiveReverse<T extends unknown[]> =
    T extends [infer H, ...infer Tail] ? [...NaiveReverse<Tail>, H] : [];

type AccReverse<T extends unknown[], R extends unknown[] = []> =
    T extends [infer H, ...infer Tail] ? AccReverse<Tail, [H, ...R]> : R;

type R1 = NaiveReverse<[1, 2, 3, 4, 5]>; // [5, 4, 3, 2, 1]
type R2 = AccReverse<[1, 2, 3, 4, 5]>;   // [5, 4, 3, 2, 1] — fewer instantiations

// Workflow: extendedDiagnostics → generateTrace → analyze-trace → fix → re-measure
console.log("Trace diagnostics demo — run tsc --extendedDiagnostics to profile!");
