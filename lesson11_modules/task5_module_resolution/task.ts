// Module Resolution — how TypeScript finds files from import specifiers

// This file demonstrates the concepts discussed in the theory.
// In a real project, these would be separate files with actual imports.

// --- Simulating module resolution strategies ---

// 1. "node" strategy (traditional CommonJS):
//    import { add } from "./math"
//    → checks: ./math.ts, ./math/index.ts, etc.

// 2. "nodenext" strategy (Node.js ESM):
//    import { add } from "./math.js"  // .js extension required!
//    → maps ./math.js to ./math.ts at compile time

// 3. "bundler" strategy (Webpack, Vite, esbuild):
//    import { add } from "./math"
//    → no extension needed, respects package.json "exports"

// --- Path mapping example ---
// tsconfig.json:
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@utils/*": ["src/utils/*"],
//       "@models/*": ["src/models/*"]
//     }
//   }
// }
//
// Then you can write:
//   import { formatDate } from "@utils/date";
//   import { User } from "@models/user";

// --- Demonstrating resolution with a practical example ---

interface ModuleInfo {
    strategy: "node" | "nodenext" | "bundler";
    extensionRequired: boolean;
    supportsExportsField: boolean;
    bestFor: string;
}

const strategies: ModuleInfo[] = [
    {
        strategy: "node",
        extensionRequired: false,
        supportsExportsField: false,
        bestFor: "Legacy CommonJS projects",
    },
    {
        strategy: "nodenext",
        extensionRequired: true,
        supportsExportsField: true,
        bestFor: "Node.js ESM libraries and servers",
    },
    {
        strategy: "bundler",
        extensionRequired: false,
        supportsExportsField: true,
        bestFor: "Bundled apps (Webpack, Vite, esbuild)",
    },
];

for (const info of strategies) {
    console.log(`Strategy: ${info.strategy}`);
    console.log(`  Extension required: ${info.extensionRequired}`);
    console.log(`  Supports "exports": ${info.supportsExportsField}`);
    console.log(`  Best for: ${info.bestFor}`);
    console.log();
}
