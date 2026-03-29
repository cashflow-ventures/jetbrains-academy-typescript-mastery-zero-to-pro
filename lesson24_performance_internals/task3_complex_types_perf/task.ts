// Complex Types and Compiler Performance — Patterns That Slow the Checker

// --- 1. Deep Recursion ---
// Each level creates a type instantiation. Hard limit: 50 levels.
type DeepFlatten<T> = T extends Array<infer U> ? DeepFlatten<U> : T;
type Flat = DeepFlatten<number[][][]>; // number — resolves in 3 steps

// --- 2. Exponential Union Distribution ---
// Conditional types distribute over unions: each member evaluated separately.
type Label<T> = T extends string ? `str_${T}` : `other`;
type Demo = Label<"a" | "b" | "c">; // 3 evaluations → "str_a" | "str_b" | "str_c"

// --- 3. Template Literals Generate Unions ---
// Each slot multiplies total union size: 10 × 10 = 100 members here.
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type TwoDigitStr = `${Digit}${Digit}`;     // 100-member union
// type ThreeDigitStr = `${Digit}${Digit}${Digit}`; // 1,000 — at the limit!

// --- 4. Preventing Distribution with Tuple Wrapping ---
// [T] extends [U] evaluates the union as a whole, not per-member.
type IsString<T> = [T] extends [string] ? true : false;
type Test1 = IsString<string | number>; // false (no distribution)
type Test2 = IsString<string>;          // true

// --- 5. Flatten Mapped Type Chains ---
// One pass is cheaper than chaining Partial<Required<Readonly<T>>>.
type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };
interface Config { readonly host: string; readonly port?: number }
type MutableConfig = Mutable<Config>; // { host: string; port: number }

// Key rules:
// • Recursive types: stay well under 50 levels
// • Distributive conditionals: wrap in [T] to prevent blowup
// • Template literals: count the cross-product before combining
// • Mapped types: flatten chained transformations into one pass
console.log("Types resolved successfully — no performance issues here!");
