# The tsconfig.json File

Every TypeScript project has a configuration file called `tsconfig.json` that tells the compiler
how to behave. It controls which files to compile, what JavaScript version to target, and how
strict the type checking should be. Understanding this file is essential — it shapes the entire
developer experience in your project.

## Core Concept

The `tsconfig.json` file lives at the root of your TypeScript project. When you run `tsc` without
specifying a file, the compiler looks for this file and uses its settings. Here's a minimal example:

```typescript
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "commonjs",
        "strict": true,
        "outDir": "./dist"
    }
}
```

This tells the compiler: emit modern JavaScript (ES2022), use CommonJS modules, enforce strict
type checking, and put the output files in a `dist/` folder.

You can generate a starter `tsconfig.json` by running:

```
tsc --init
```

This creates a file with all available options commented out, along with descriptions of what each one does.

## How It Works

### The `strict` Flag

The `strict` flag is the single most important compiler option. It enables a collection of stricter
type-checking rules that catch more bugs. When `strict` is `true`, the following flags are all
turned on:

- **`strictNullChecks`** — `null` and `undefined` are not assignable to other types unless explicitly allowed.
- **`strictFunctionTypes`** — Function parameter types are checked more strictly (contravariant).
- **`strictBindCallApply`** — `bind`, `call`, and `apply` are type-checked correctly.
- **`strictPropertyInitialization`** — Class properties must be initialized in the constructor.
- **`noImplicitAny`** — Variables and parameters without a type annotation don't silently become `any`.
- **`noImplicitThis`** — `this` must have an explicit type in functions where it's used.
- **`alwaysStrict`** — Emits `"use strict"` in every output file.
- **`useUnknownInCatchVariables`** — Catch clause variables are typed as `unknown` instead of `any`.

```typescript
// With strictNullChecks: true
let name: string = "Alice";
// name = null;  // Error: Type 'null' is not assignable to type 'string'

// To allow null, use a union type:
let maybeName: string | null = "Alice";
maybeName = null; // OK
```

Always start new projects with `"strict": true`. It's much harder to enable strict mode later
in a large codebase than to start with it from day one.

### The `target` Option

The `target` option controls which version of JavaScript the compiler outputs. TypeScript can
downlevel modern syntax to older JavaScript versions:

| Target | Features Available |
|--------|-------------------|
| `ES5` | No arrow functions, no `let`/`const`, no template literals in output |
| `ES2015` | Arrow functions, `let`/`const`, classes, template literals |
| `ES2020` | Optional chaining (`?.`), nullish coalescing (`??`), `BigInt` |
| `ES2022` | Top-level `await`, `at()`, `Object.hasOwn()`, class fields |
| `ESNext` | Latest features — moves with each TypeScript release |

```typescript
// Source code (TypeScript)
const greeting = `Hello, ${name}!`;

// Output with target: "ES5"
var greeting = "Hello, " + name + "!";

// Output with target: "ES2015" or later
const greeting = `Hello, ${name}!`;
```

For Node.js projects, `ES2022` is a safe modern target. For browser projects, choose based on
your browser support requirements.

### The `module` Option

The `module` option determines the module system used in the output:

- **`commonjs`** — Uses `require()` and `module.exports`. Standard for Node.js.
- **`esnext`** / **`es2022`** — Uses `import`/`export`. Standard for modern bundlers and browsers.
- **`nodenext`** — Node.js native ESM support with `.mjs`/`.cjs` extensions.

```typescript
// Your TypeScript source (always ES module syntax)
import { readFile } from "fs";
export function load(): void { /* ... */ }

// Output with module: "commonjs"
const fs_1 = require("fs");
function load() { /* ... */ }
exports.load = load;

// Output with module: "esnext"
import { readFile } from "fs";
export function load() { /* ... */ }
```

### The `lib` Option

The `lib` option specifies which built-in type definitions to include. These define the types
for global objects like `Array`, `Promise`, `Map`, and DOM APIs:

- **`ES2022`** — Includes types for all ES2022 features.
- **`DOM`** — Includes types for browser APIs (`document`, `window`, `HTMLElement`).
- **`DOM.Iterable`** — Adds iterable support for DOM collections.

If you're writing a Node.js project (no browser), you typically omit `DOM`:

```typescript
{
    "compilerOptions": {
        "lib": ["ES2022"]
    }
}
```

If you're writing a browser project:

```typescript
{
    "compilerOptions": {
        "lib": ["ES2022", "DOM", "DOM.Iterable"]
    }
}
```

## Common Pitfalls

- **Not using `strict: true`.** Without strict mode, TypeScript allows many unsafe patterns
  that defeat the purpose of using TypeScript in the first place. Always enable it.
- **Confusing `target` and `lib`.** `target` controls the *output* JavaScript version. `lib`
  controls which *type definitions* are available. You can target ES5 output while still having
  ES2022 type definitions (if you provide polyfills).
- **Forgetting `esModuleInterop`.** Without this flag, importing CommonJS modules with default
  import syntax (`import fs from "fs"`) doesn't work correctly. Enable it for smoother interop.
- **Setting `outDir` but not `rootDir`.** If you set `outDir` without `rootDir`, the output
  folder structure might not match what you expect. Set both for predictable output paths.

## Key Takeaways

- `tsconfig.json` is the central configuration file for every TypeScript project.
- `strict: true` enables all strict type-checking options — always use it for new projects.
- `target` controls the JavaScript version of the output; `lib` controls available type definitions.
- `module` determines the module system (`commonjs` for Node.js, `esnext` for modern bundlers).
- Run `tsc --init` to generate a starter configuration with all options documented.

<div class="hint">
You can extend one tsconfig from another using the `"extends"` field. This is useful in monorepos
where multiple packages share a base configuration:
`{ "extends": "../tsconfig.base.json", "compilerOptions": { "outDir": "./dist" } }`.
The TypeScript team also publishes recommended base configs at
`@tsconfig/recommended`, `@tsconfig/node20`, etc.
</div>
