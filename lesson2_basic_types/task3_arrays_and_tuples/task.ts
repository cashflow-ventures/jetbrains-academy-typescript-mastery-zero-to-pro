export {};
// Arrays and Tuples in TypeScript

// 1. Typed arrays — two equivalent syntaxes
const scores: number[] = [95, 87, 92, 78];
const names: Array<string> = ["Alice", "Bob", "Charlie"];

// 2. TypeScript enforces element types
scores.push(100);       // OK — 100 is a number
// scores.push("high"); // Error: 'string' is not assignable to 'number'

// 3. Tuples — fixed length, per-position types
const coordinate: [number, number] = [10.5, 20.3];
const userRecord: [string, number, boolean] = ["Alice", 30, true];

// TypeScript knows the type at each index
const x: number = coordinate[0];
const y: number = coordinate[1];
const userName: string = userRecord[0];

// 4. Readonly arrays — no mutations allowed
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);   // Error: 'push' does not exist on 'readonly number[]'
// frozen[0] = 99;   // Error: read-only

// 5. Readonly tuples
const startPoint: readonly [number, number] = [0, 0];
// origin[0] = 5;    // Error: read-only

// 6. Tuple with optional element
const entry: [string, number, string?] = ["Alice", 30];
const fullEntry: [string, number, string?] = ["Bob", 25, "admin"];

// 7. Tuple with rest elements
const logEntry: [string, ...number[]] = ["scores", 95, 87, 92];

console.log(`Scores: ${scores}`);
console.log(`Coordinate: (${x}, ${y})`);
console.log(`Frozen array: ${frozen}`);
console.log(`Log entry: ${logEntry}`);
