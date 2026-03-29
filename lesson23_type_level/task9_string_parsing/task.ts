// Type-Level String Parsing with template literal types + infer

// --- Extract parts of a string ---
type FirstChar<S extends string> =
    S extends `${infer First}${infer _}` ? First : never;

type F1 = FirstChar<"hello">;  // "h"
type F2 = FirstChar<"">;       // never

// --- Split before/after a delimiter ---
type BeforeColon<S extends string> =
    S extends `${infer Before}:${infer _}` ? Before : S;

type B1 = BeforeColon<"key:value">;  // "key"
type B2 = BeforeColon<"nocolon">;    // "nocolon"

// --- Recursive string length ---
type StringLength<S extends string, Acc extends unknown[] = []> =
    S extends `${infer _}${infer Rest}`
        ? StringLength<Rest, [...Acc, unknown]>
        : Acc["length"];

type L1 = StringLength<"hello">;  // 5
type L2 = StringLength<"">;       // 0

// --- Split on delimiter (the workhorse) ---
type Split<S extends string, D extends string> =
    S extends `${infer Head}${D}${infer Tail}`
        ? [Head, ...Split<Tail, D>]
        : S extends ""
            ? []
            : [S];

type S1 = Split<"a.b.c", ".">;       // ["a", "b", "c"]
type S2 = Split<"hello world", " ">; // ["hello", "world"]
type S3 = Split<"solo", ".">;        // ["solo"]
type S4 = Split<"", ".">;            // []

// --- Practical: parse route params ---
type ExtractParams<S extends string> =
    S extends `${infer _}:${infer Param}/${infer Rest}`
        ? Param | ExtractParams<Rest>
        : S extends `${infer _}:${infer Param}`
            ? Param
            : never;

type Params = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"

console.log("Template literal types: compile-time string parsing.");
