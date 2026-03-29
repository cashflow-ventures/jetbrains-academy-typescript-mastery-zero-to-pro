export {};
// Rest Parameters

// 1. Basic rest parameter — collects all arguments into a typed array
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(10, 20));     // 30
console.log(sum());           // 0

// 2. Rest parameter with leading regular parameters
function log(level: string, ...messages: string[]): void {
    console.log(`[${level}]`, ...messages);
}

log("INFO", "Server started");
log("ERROR", "Connection failed", "Retrying in 5s");

// 3. Tuple-typed rest parameter — fixed count and types
function makePoint(...coords: [number, number]): { x: number; y: number } {
    return { x: coords[0], y: coords[1] };
}

console.log(makePoint(10, 20)); // { x: 10, y: 20 }

// 4. Destructured object parameter with types
function createUser({ name, age }: { name: string; age: number }): string {
    return `${name} is ${age} years old`;
}

console.log(createUser({ name: "Alice", age: 30 }));

// 5. Destructured parameter with defaults
function configure({ host = "localhost", port = 3000 }: { host?: string; port?: number } = {}): string {
    return `${host}:${port}`;
}

console.log(configure());                // "localhost:3000"
console.log(configure({ port: 8080 }));  // "localhost:8080"
