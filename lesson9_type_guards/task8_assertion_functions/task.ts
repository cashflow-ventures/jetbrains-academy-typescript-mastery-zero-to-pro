// Assertion Functions — throw on invalid, narrow on success

// Generic assertDefined — removes null and undefined
function assertDefined<T>(
    value: T | null | undefined,
    name: string
): asserts value is T {
    if (value === null || value === undefined) {
        throw new Error(`${name} must be defined`);
    }
}

// Assert a specific type
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error(`Expected string, got ${typeof value}`);
    }
}

// Validate a complex shape
interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
}

function assertValidDbConfig(value: unknown): asserts value is DatabaseConfig {
    if (typeof value !== "object" || value === null) {
        throw new Error("Config must be an object");
    }
    const obj = value as Record<string, unknown>;
    if (typeof obj.host !== "string") throw new Error("host must be a string");
    if (typeof obj.port !== "number") throw new Error("port must be a number");
    if (typeof obj.database !== "string") throw new Error("database must be a string");
}

// Usage — narrowing applies after the assertion call
const maybeHost: string | null = "localhost";
assertDefined(maybeHost, "host");
console.log(maybeHost.toUpperCase()); // maybeHost: string

const rawConfig: unknown = { host: "localhost", port: 5432, database: "mydb" };
assertValidDbConfig(rawConfig);
console.log(`Connecting to ${rawConfig.host}:${rawConfig.port}/${rawConfig.database}`);

const input: unknown = "hello";
assertIsString(input);
console.log(input.length); // input: string
