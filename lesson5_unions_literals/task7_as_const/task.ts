// as const Assertions — narrowing types to their literal values

// 1. Without as const — types are widened
const colorsWide = ["red", "green", "blue"];
// Type: string[]

// With as const — types are narrowed to a readonly tuple of literals
const colorList = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

// 2. Deriving a union type from an as const array
type PaletteColor = typeof colorList[number];
// Type: "red" | "green" | "blue"

function paintWall(color: PaletteColor): string {
    return `Painting wall ${color}`;
}

console.log(paintWall("red"));   // OK
// paintWall("purple");          // Error: '"purple"' is not assignable to type 'PaletteColor'

// 3. as const on objects — all properties become readonly with literal types
const serverConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
} as const;

// serverConfig.timeout = 10000;  // Error: Cannot assign to 'timeout' (readonly)
console.log(`API: ${serverConfig.apiUrl}, timeout: ${serverConfig.timeout}`);

// 4. Deriving types from an as const object
const HTTP_STATUS = { OK: 200, NOT_FOUND: 404, ERROR: 500 } as const;
type StatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// Type: 200 | 404 | 500

function handleStatus(code: StatusCode): string {
    switch (code) {
        case 200: return "Success";
        case 404: return "Not Found";
        case 500: return "Server Error";
    }
}

console.log(handleStatus(200)); // "Success"
console.log(handleStatus(404)); // "Not Found"
