// The tsconfig.json File
// This file demonstrates how compiler options affect your TypeScript code.
// The settings below match a typical strict tsconfig.json configuration.

// With "strict": true, the compiler enforces stricter type checks.
// For example, `strictNullChecks` prevents assigning null to a non-nullable type.

function findUser(id: number): string | undefined {
    const users: Record<number, string> = {
        1: "Alice",
        2: "Bob",
    };
    return users[id]; // Return type includes `undefined` because the key might not exist
}

const user = findUser(1);

// With strictNullChecks enabled, you must narrow before using the value:
if (user !== undefined) {
    console.log(user.toUpperCase()); // OK — TypeScript knows `user` is a string here
}

// "target": "ES2022" means the compiler outputs modern JavaScript.
// Features like optional chaining compile directly without polyfills:
const userName = findUser(3)?.toUpperCase() ?? "Unknown";
console.log(userName); // "Unknown"

// "module": "commonjs" means the output uses require() / module.exports.
// In the source we write ES module syntax (import/export),
// and tsc converts it to CommonJS in the output.

// "esModuleInterop": true lets you use default imports with CommonJS modules:
// import fs from "fs";  // Works with esModuleInterop
// Without it, you'd need: import * as fs from "fs";

// Summary of key compiler options:
// strict        — enables all strict type-checking options
// target        — which JS version to emit (ES5, ES2015, ES2022, ESNext)
// module        — module system for output (commonjs, esnext, nodenext)
// lib           — which built-in type definitions to include
// outDir        — where compiled .js files go
// skipLibCheck  — skip type checking of .d.ts files for faster builds
