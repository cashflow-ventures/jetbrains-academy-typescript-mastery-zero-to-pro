// Literal Types — types that represent a single, specific value

// 1. String literal types — restrict to exact string values
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): string {
    return `Moving ${direction}`;
}

console.log(move("north")); // "Moving north"
// move("up");              // Error: '"up"' is not assignable to type 'Direction'

// 2. Numeric literal types — restrict to exact numbers
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function describeDiceRoll(roll: DiceRoll): string {
    if (roll === 6) {
        return "You rolled a 6 — maximum!";
    }
    return `You rolled a ${roll}`;
}

console.log(describeDiceRoll(6)); // "You rolled a 6 — maximum!"
console.log(describeDiceRoll(3)); // "You rolled a 3"

// 3. Literal inference — const vs let
const lang = "TypeScript"; // Type: "TypeScript" (literal)
let framework = "React";  // Type: string (widened)

// 4. Combining literal types for a type-safe API
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ThemeColor = "red" | "green" | "blue";

function makeRequest(method: HttpMethod, url: string): string {
    return `${method} ${url}`;
}

console.log(makeRequest("GET", "/api/users"));    // "GET /api/users"
console.log(makeRequest("POST", "/api/users"));   // "POST /api/users"
