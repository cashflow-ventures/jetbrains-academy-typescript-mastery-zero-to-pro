// Monorepo TypeScript Setup — Key configuration patterns
//
// Workspaces + shared tsconfig + path aliases + project references

// Root package.json:  { "private": true, "workspaces": ["packages/*"] }

// tsconfig.base.json (shared options inherited by all packages):
// { "compilerOptions": { "target": "ES2022", "strict": true,
//     "composite": true, "declaration": true, "declarationMap": true } }

// packages/shared/tsconfig.json:
// { "extends": "../../tsconfig.base.json",
//   "compilerOptions": { "outDir": "./dist", "rootDir": "./src" } }

// packages/server/tsconfig.json (references shared, adds path alias):
// { "extends": "../../tsconfig.base.json",
//   "compilerOptions": { "outDir": "./dist", "rootDir": "./src",
//     "baseUrl": ".", "paths": { "@myorg/shared": ["../shared/src"] } },
//   "references": [{ "path": "../shared" }] }

// Root tsconfig.json (solution config — builds everything):
// { "files": [], "references": [
//     { "path": "./packages/shared" },
//     { "path": "./packages/server" } ] }

// --- Simulated shared package ---
interface User {
    id: string;
    name: string;
    role: "admin" | "viewer";
}

function createUser(id: string, name: string, role: User["role"]): User {
    return { id, name, role };
}

// --- Simulated server package (imports @myorg/shared via alias) ---
function formatGreeting(user: User): string {
    const prefix = user.role === "admin" ? "[Admin]" : "[Viewer]";
    return `${prefix} Welcome, ${user.name}!`;
}

const admin = createUser("u1", "Alice", "admin");
console.log(formatGreeting(admin)); // [Admin] Welcome, Alice!
// npm install → symlinks packages; tsc -b → builds in dependency order
