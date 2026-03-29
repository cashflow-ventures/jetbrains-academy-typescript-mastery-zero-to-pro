// Declaration Files — ambient declarations with the declare keyword

// Ambient variable declarations describe values that exist at runtime
// but are defined outside the current TypeScript compilation.
// In a .d.ts file, these would appear without the `declare` keyword
// since top-level declarations in .d.ts are automatically ambient.

// Simulating what a declaration file describes:
// declare function formatCurrency(amount: number, currency: string): string;
// declare const MAX_RETRIES: number;

// Here we provide actual implementations to demonstrate the shapes
// that declaration files describe:

interface LibConfig {
    apiUrl: string;
    timeout: number;
    retries: number;
}

function createLibConfig(partial: Partial<LibConfig>): LibConfig {
    const defaults: LibConfig = {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3,
    };
    return { ...defaults, ...partial };
}

function formatEndpoint(base: string, path: string): string {
    return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

// --- Usage ---
const libConfig: LibConfig = createLibConfig({ timeout: 10000 });
console.log("Config:", libConfig);

const endpoint: string = formatEndpoint(libConfig.apiUrl, "/users");
console.log("Endpoint:", endpoint);

// In a real .d.ts file, you'd only see the type signatures:
//   declare function createLibConfig(partial: Partial<LibConfig>): LibConfig;
//   declare function formatEndpoint(base: string, path: string): string;
// No function bodies, no variable initializers — just shapes.
