// Union to Tuple — one of the most advanced type-level patterns

// --- Building block: UnionToIntersection ---
type UnionToIntersection<U> =
    (U extends unknown ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;

// --- LastOfUnion: extract the "last" member of a union ---
// Exploits overloaded function inference: TS picks the last overload.
type LastOfUnion<U> =
    UnionToIntersection<
        U extends unknown ? () => U : never
    > extends () => infer Last ? Last : never;

// Verify: LastOfUnion picks one member deterministically
type L1 = LastOfUnion<"a" | "b" | "c">;  // "c"
type L2 = LastOfUnion<1 | 2>;            // 2

// --- UnionToTuple: recursive accumulation ---
type UnionToTuple<U, Acc extends unknown[] = []> =
    [U] extends [never]
        ? Acc
        : UnionToTuple<
            Exclude<U, LastOfUnion<U>>,
            [LastOfUnion<U>, ...Acc]
          >;

// Trace: "a" | "b" | "c"
// Step 1: Last = "c", remaining = "a" | "b", Acc = ["c"]
// Step 2: Last = "b", remaining = "a",       Acc = ["b", "c"]
// Step 3: Last = "a", remaining = never,     Acc = ["a", "b", "c"]
// Step 4: [never] extends [never] → return Acc

type T1 = UnionToTuple<"a" | "b" | "c">;  // ["a", "b", "c"]
type T2 = UnionToTuple<1 | 2>;            // [1, 2]
type T3 = UnionToTuple<never>;            // []
type T4 = UnionToTuple<"solo">;           // ["solo"]

console.log("UnionToTuple: recursive peeling with LastOfUnion.");
