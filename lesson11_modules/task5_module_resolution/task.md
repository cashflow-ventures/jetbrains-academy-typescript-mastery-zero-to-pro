# Module Resolution

When you write `import { add } from "./math"`, TypeScript needs to figure out which file
`"./math"` refers to. This process is called **module resolution** — and the strategy
TypeScript uses depends on your `tsconfig.json` settings. Understanding resolution
strategies helps you debug "module not found" errors and configure path aliases.

## Core Concept

Module resolution is the algorithm TypeScript uses to turn a module specifier (the string
in `from "..."`) into an actual file on disk. TypeScript supports several strategies,
configured via the `moduleResolution` compiler option.

### The `node` Strategy (Classic Node.js)

This is the traditional Node.js resolution algorithm, used when `moduleResolution` is
set to `"node"` (or `"node10"`). It mirrors how `require()` works in Node.js:

For a **relative import** like `import { x } from "./utils"`:
1. Check `./utils.ts`
2. Check `./utils.tsx`
3. Check `./utils.d.ts`
4. Check `./utils/index.ts`
5. Check `./utils/index.d.ts`

For a **non-relative import** like `import { x } from "lodash"`:
1. Look in `node_modules/lodash.ts`, `node_modules/lodash/index.ts`, etc.
2. Check `node_modules/lodash/package.json` → `"types"` or `"main"` field
3. Walk up parent directories repeating the search

```jsonc
// tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node"
    }
}
```

### The `nodenext` Strategy

For projects targeting Node.js with ES modules (`"module": "nodenext"`), this strategy
follows Node.js's native ESM resolution rules:

```jsonc
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext"
    }
}
```

Key differences from `"node"`:
- **File extensions are required** for relative imports: `import { x } from "./utils.js"`
  (yes, `.js` even in TypeScript — it refers to the compiled output).
- The `package.json` `"exports"` field is respected for package resolution.
- `"type": "module"` in `package.json` determines whether `.ts` files are treated as
  ESM or CommonJS.

### The `bundler` Strategy

For projects using a bundler like Webpack, Vite, or esbuild, the `"bundler"` strategy
(TypeScript 5.0+) provides the most flexible resolution:

```jsonc
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler"
    }
}
```

This strategy:
- Does **not** require file extensions on relative imports
- Respects `package.json` `"exports"` field
- Supports `package.json` `"imports"` field for subpath imports
- Allows extensionless imports like the `"node"` strategy

It's the best choice when a bundler handles the actual module loading.

## How It Works — Path Mapping

TypeScript supports **path aliases** that map import specifiers to file locations. This
lets you avoid long relative paths like `"../../../utils/helpers"`:

```jsonc
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@utils/*": ["src/utils/*"],
            "@models/*": ["src/models/*"],
            "@config": ["src/config/index.ts"]
        }
    }
}
```

Now you can write clean imports:

```typescript
import { formatDate } from "@utils/date";
import { User } from "@models/user";
import { appConfig } from "@config";
```

The `baseUrl` sets the root directory for non-relative module resolution. The `paths`
object maps patterns to file locations relative to `baseUrl`.

**Important:** Path mappings are a **compile-time** feature only. At runtime, you need
a bundler or a tool like `tsconfig-paths` to resolve these aliases. TypeScript does not
rewrite import paths in the emitted JavaScript.

## The `"exports"` Field in package.json

Modern Node.js packages use the `"exports"` field to define their public API:

```jsonc
// package.json
{
    "name": "my-lib",
    "exports": {
        ".": "./dist/index.js",
        "./utils": "./dist/utils.js"
    }
}
```

With `"nodenext"` or `"bundler"` resolution, TypeScript respects this field. Consumers
can only import paths explicitly listed in `"exports"` — internal files are hidden.

## Common Pitfalls

- **Missing file extensions with `nodenext`.** Node.js ESM requires explicit extensions.
  Write `import { x } from "./utils.js"` — TypeScript maps `.js` to `.ts` during
  compilation.
- **Path aliases not working at runtime.** `paths` in `tsconfig.json` only affects
  TypeScript's type checking. You need a bundler plugin or `tsconfig-paths` for runtime.
- **Confusing `baseUrl` with `paths`.** Setting `baseUrl` alone lets you import from
  the base directory without `./`. Adding `paths` creates specific aliases. They work
  together but serve different purposes.
- **Using the wrong `moduleResolution` for your setup.** Use `"nodenext"` for Node.js
  ESM projects, `"bundler"` for bundled apps, and `"node"` for legacy CommonJS projects.

## Key Takeaways

- `moduleResolution` controls how TypeScript finds files from import specifiers.
- `"node"` mirrors traditional `require()` resolution — no extensions needed.
- `"nodenext"` follows Node.js ESM rules — extensions required, `"exports"` respected.
- `"bundler"` is flexible — no extensions needed, `"exports"` respected.
- `paths` and `baseUrl` create import aliases, but only at compile time.
- The `"exports"` field in `package.json` defines a package's public API.

<div class="hint">
When in doubt about which `moduleResolution` to use: pick `"bundler"` if you use Webpack,
Vite, or esbuild; pick `"nodenext"` if you're building a Node.js library or server; pick
`"node"` only for legacy CommonJS projects.
</div>

<div class="hint">
You can run `tsc --traceResolution` to see exactly how TypeScript resolves each import.
This is invaluable for debugging "Cannot find module" errors.
</div>
