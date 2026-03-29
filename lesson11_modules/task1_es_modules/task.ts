// ES Modules in TypeScript — import/export patterns

// --- Named exports ---
export function add(a: number, b: number): number {
    return a + b;
}

export const PI: number = 3.14159;

export interface MathResult {
    operation: string;
    value: number;
}

// --- Default export simulation ---
// (In a real project this would be in its own file)
// export default function log(msg: string): void { ... }

// --- Using named exports ---
function calculate(a: number, b: number): MathResult {
    return {
        operation: "add",
        value: add(a, b),
    };
}

// --- Re-export pattern (conceptual) ---
// In an index.ts barrel file you would write:
//   export { add, PI } from "./math";
//   export * from "./utils";
//   export { default as log } from "./logger";

// --- Namespace import pattern (conceptual) ---
// import * as MathUtils from "./math";
// MathUtils.add(1, 2);

// --- Demonstrate the exports ---
const result: MathResult = calculate(3, 7);
console.log(`${result.operation}(3, 7) = ${result.value}`); // add(3, 7) = 10
console.log("PI =", PI);

// Type-only import pattern (conceptual):
// import type { MathResult } from "./math";
// The type is erased at runtime — zero cost in the bundle.
