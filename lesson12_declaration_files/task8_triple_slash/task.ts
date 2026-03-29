// Triple-Slash Directives — when they're still needed

// In modern TypeScript, triple-slash directives are rarely used.
// tsconfig.json and import statements handle most cases.
// But they still appear in specific scenarios.

// --- Scenario 1: Global .d.ts files ---
// In a global declaration file (no import/export), you can't use import.
// Triple-slash directives are the only way to reference other types:
//
// /// <reference types="node" />
// declare function loadConfig(): NodeJS.ProcessEnv;

// --- Scenario 2: Splitting declaration files ---
// Large libraries split their .d.ts across multiple files:
//
// /// <reference path="./core.d.ts" />
// /// <reference path="./plugins.d.ts" />

// --- Scenario 3: Library definitions ---
// /// <reference lib="es2022" />
// Ensures specific lib types are available

// --- Demonstrating the concepts with regular code ---

// What triple-slash directives describe is essentially
// "this file depends on types from X". In module code,
// we express the same thing with imports:

interface MockFileSystem {
    readFile(path: string): string;
    writeFile(path: string, content: string): void;
    exists(path: string): boolean;
}

interface MockProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    [key: string]: string | undefined;
}

// Simulating what /// <reference types="node" /> provides
function getEnvVar(env: MockProcessEnv, key: string): string | undefined {
    return env[key];
}

function createMockFs(): MockFileSystem {
    const files: Record<string, string> = {};
    return {
        readFile: (path) => files[path] ?? "",
        writeFile: (path, content) => { files[path] = content; },
        exists: (path) => path in files,
    };
}

// --- Usage ---
const mockEnv: MockProcessEnv = {
    NODE_ENV: "development",
    PORT: "3000",
};

console.log("NODE_ENV:", getEnvVar(mockEnv, "NODE_ENV"));
console.log("PORT:", getEnvVar(mockEnv, "PORT"));

const mockFs = createMockFs();
mockFs.writeFile("/hello.txt", "Hello, world!");
console.log("File exists:", mockFs.exists("/hello.txt"));
console.log("Content:", mockFs.readFile("/hello.txt"));
