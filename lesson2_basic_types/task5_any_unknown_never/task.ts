export {};
// The any, unknown, and never types

// 1. any — disables type checking (avoid in new code!)
let flexible: any = "hello";
flexible = 42;
flexible = { key: "value" };
// No errors, even for nonsense — that's the danger of any
console.log(flexible.nonExistentMethod); // undefined at runtime, no compile error

// 2. unknown — the safe alternative to any
let input: unknown = "hello";

// input.toUpperCase(); // Error! Can't use unknown without narrowing

// Narrow with typeof before using
if (typeof input === "string") {
    console.log(input.toUpperCase()); // "HELLO" — safe!
}

if (typeof input === "number") {
    console.log(input.toFixed(2)); // Won't run, but TypeScript is happy
}

// 3. never — functions that never return
function fail(message: string): never {
    throw new Error(message);
}

// 4. never — exhaustiveness checking
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): string {
    switch (direction) {
        case "north": return "Moving up";
        case "south": return "Moving down";
        case "east":  return "Moving right";
        case "west":  return "Moving left";
        default:
            // If all cases handled, direction is never here
            const exhaustive: never = direction;
            return exhaustive;
    }
}

console.log(move("north")); // "Moving up"
console.log(move("east"));  // "Moving right"
