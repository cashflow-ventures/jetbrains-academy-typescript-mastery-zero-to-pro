// Union to Intersection via contravariant inference
// This is one of the most important type-level patterns in TypeScript.

// --- The core technique ---
type UnionToIntersection<U> =
    (U extends unknown ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;

// --- Tracing through the steps ---

// Input: { a: 1 } | { b: 2 }
// Step 1 (distribute): ((x: { a: 1 }) => void) | ((x: { b: 2 }) => void)
// Step 2 (infer from contravariant position): { a: 1 } & { b: 2 }

type AB = UnionToIntersection<{ a: 1 } | { b: 2 }>;
// Result: { a: 1 } & { b: 2 }  — both properties present

// --- Why it works: contravariance ---
// Function parameters are contravariant. When TypeScript infers
// from a union of functions, it needs a type assignable to ALL
// parameter positions — that's the intersection.

// --- Practical example: merging event maps ---
type ClickEvents = { onClick: (e: MouseEvent) => void };
type KeyEvents = { onKeyDown: (e: KeyboardEvent) => void };
type FocusEvents = { onFocus: () => void };

type AllHandlers = UnionToIntersection<ClickEvents | KeyEvents | FocusEvents>;
// { onClick: (e: MouseEvent) => void } &
// { onKeyDown: (e: KeyboardEvent) => void } &
// { onFocus: () => void }

// --- Edge case: primitives ---
type Impossible = UnionToIntersection<string | number>;
// string & number = never (no value is both string and number)

console.log("UnionToIntersection exploits contravariant function parameters.");
