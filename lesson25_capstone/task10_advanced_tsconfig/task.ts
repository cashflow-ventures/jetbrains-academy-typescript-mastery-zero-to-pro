// Advanced tsconfig — Strict Family Flags in Action

// === strictNullChecks: null/undefined are distinct types ===
function safeLength(input: string | null): number {
    if (input === null) return 0;
    return input.length;
}

// === noImplicitAny: every parameter needs a type ===
function multiply(a: number, b: number): number {
    return a * b;
}

// === strictPropertyInitialization: properties must be assigned ===
class Config {
    constructor(readonly host: string, readonly port: number) {}
}

// === noUncheckedIndexedAccess: index access includes undefined ===
const scores: Record<string, number> = { alice: 95, bob: 87 };
const carol: number | undefined = scores["carol"];
console.log("Carol:", carol ?? "no score");

// === useUnknownInCatchVariables: catch error is unknown ===
try {
    JSON.parse("invalid json");
} catch (error: unknown) {
    if (error instanceof SyntaxError) {
        console.log("Parse error:", error.message);
    }
}

// === exactOptionalPropertyTypes: undefined ≠ missing ===
interface AppSettings { theme?: "light" | "dark"; }
const defaults: AppSettings = {};              // ✅ property omitted
const custom: AppSettings = { theme: "dark" }; // ✅ valid value

console.log(new Config("localhost", 3000));
console.log("Multiply:", multiply(6, 7));
console.log("Safe length:", safeLength(null), safeLength("hello"));
