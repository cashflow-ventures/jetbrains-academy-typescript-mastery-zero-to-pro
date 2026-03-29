// Project References — Multi-package build structure demo
//
// Each package gets its own tsconfig.json with "composite": true.
// Downstream packages list dependencies in "references".
// tsc -b builds the graph in order, skipping up-to-date projects.

// --- shared/tsconfig.json ---
// { "compilerOptions": { "composite": true, "declaration": true,
//     "outDir": "./dist", "rootDir": "./src" },
//   "include": ["src/**/*"] }

// --- shared/src/index.ts ---
interface User { id: number; name: string; email: string; }
function createUser(id: number, name: string, email: string): User {
    return { id, name, email };
}

// --- server/tsconfig.json (depends on shared) ---
// { "compilerOptions": { "composite": true, "declaration": true,
//     "outDir": "./dist", "rootDir": "./src" },
//   "references": [{ "path": "../shared" }],
//   "include": ["src/**/*"] }

// --- server/src/index.ts (imports shared's .d.ts, not source) ---
function handleRequest(user: User): string {
    return `Processed request for ${user.name} (${user.email})`;
}

// --- Root solution config (orchestrates all packages) ---
// { "files": [],
//   "references": [
//     { "path": "./packages/shared" },
//     { "path": "./packages/server" }
//   ] }

// Build commands:
// tsc -b              → build all in dependency order
// tsc -b --watch      → incremental rebuild on changes
// tsc -b --verbose    → show built/skipped projects
// tsc -b --clean      → remove outputs and .tsBuildInfo

const user = createUser(1, "Alice", "alice@example.com");
console.log(handleRequest(user));
// After first build, .tsBuildInfo caches file hashes.
// Edit only server → tsc -b skips shared, rebuilds server only.
