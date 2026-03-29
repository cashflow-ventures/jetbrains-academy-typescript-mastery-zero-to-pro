// Type-Level Programming: Types as a compile-time language
// Every construct below runs at compile time and is erased in the output JS.

// --- Type-level "variables" ---
type Name = "TypeScript";
type Version = 5;

// --- Type-level "functions" (generics) ---
type IsString<T> = T extends string ? true : false;

type Check1 = IsString<"hello">;  // true
type Check2 = IsString<42>;       // false

// --- Type-level "conditionals" ---
type TypeName<T> =
    T extends string  ? "string" :
    T extends number  ? "number" :
    T extends boolean ? "boolean" :
    "other";

type T1 = TypeName<"hi">;    // "string"
type T2 = TypeName<100>;     // "number"
type T3 = TypeName<true>;    // "boolean"
type T4 = TypeName<[]>;      // "other"

// --- Type-level "pattern matching" with infer ---
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type P1 = UnwrapPromise<Promise<string>>;  // string
type P2 = UnwrapPromise<number>;           // number

// --- Type-level "recursion" ---
type BuildTuple<N extends number, Acc extends unknown[] = []> =
    Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>;

type FiveTuple = BuildTuple<5>;  // [unknown, unknown, unknown, unknown, unknown]

// --- Type-level "string manipulation" ---
type Greeting<S extends string> = `Hello, ${Capitalize<S>}!`;

type G = Greeting<"world">;  // "Hello, World!"

// --- Combining tools: extract string-valued keys ---
type StringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Config {
    host: string;
    port: number;
    name: string;
}

type SK = StringKeys<Config>;  // "host" | "name"

console.log("Type-level programs run at compile time — zero runtime cost!");
