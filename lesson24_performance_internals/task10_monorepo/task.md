# Monorepo TypeScript Setups

Modern TypeScript projects often outgrow a single package. When you have a shared library,
a server, a client, and maybe a CLI tool — all written in TypeScript — managing them as
separate repositories creates friction: duplicated configs, version drift, and painful
cross-package changes. **Monorepos** solve this by housing multiple packages in a single
repository, and TypeScript has first-class support for making this work smoothly. This task
covers workspace strategies, shared `tsconfig` patterns, and path aliases — the three pillars
of a well-structured TypeScript monorepo.

## Core Concept

A TypeScript monorepo combines three layers that each solve a different problem:

1. **Package manager workspaces** (npm, yarn, or pnpm) — handle dependency installation,
   cross-package linking, and script orchestration.
2. **Shared `tsconfig.json` with `extends`** — eliminate config duplication by defining
   compiler options once and inheriting them across packages.
3. **Path aliases and `baseUrl`** — let packages import each other by name (e.g.,
   `@myorg/shared`) instead of fragile relative paths, both at the TypeScript level and
   at the bundler/runtime level.

When combined with [project references](course://lesson24_performance_internals/task8_project_references/task.ts)
from the previous task, these layers give you a fast, type-safe, and maintainable monorepo.

### Typical Monorepo Structure

```
my-monorepo/
├── package.json              ← root: defines workspaces
├── tsconfig.base.json        ← shared compiler options
├── tsconfig.json             ← root solution config (references all packages)
├── packages/
│   ├── shared/
│   │   ├── package.json      ← name: "@myorg/shared"
│   │   ├── tsconfig.json     ← extends ../../tsconfig.base.json
│   │   └── src/
│   │       └── index.ts
│   ├── server/
│   │   ├── package.json      ← name: "@myorg/server", depends on @myorg/shared
│   │   ├── tsconfig.json     ← extends ../../tsconfig.base.json, references shared
│   │   └── src/
│   │       └── index.ts
│   └── client/
│       ├── package.json      ← name: "@myorg/client", depends on @myorg/shared
│       ├── tsconfig.json     ← extends ../../tsconfig.base.json, references shared
│       └── src/
│           └── index.ts
```

## How It Works

### Workspace Strategies

All three major package managers support workspaces — a way to tell the package manager
that your repository contains multiple packages that should be linked together.

**npm workspaces** (npm 7+):

```json
{
    "name": "my-monorepo",
    "private": true,
    "workspaces": ["packages/*"]
}
```

**yarn workspaces** (yarn 1.x classic or yarn berry):

```json
{
    "name": "my-monorepo",
    "private": true,
    "workspaces": ["packages/*"]
}
```

**pnpm workspaces** use a separate `pnpm-workspace.yaml` file:

```yaml
packages:
  - "packages/*"
```

When you run `npm install` (or `yarn` / `pnpm install`), the package manager:

1. Installs all dependencies for every package into a shared `node_modules` (or a
   content-addressable store for pnpm).
2. **Symlinks** each workspace package so that `@myorg/shared` resolves to the local
   `packages/shared` directory — no publishing required.
3. Hoists common dependencies to the root to avoid duplication (npm and yarn hoist by
   default; pnpm uses a stricter isolated approach with symlinks).

This means `import { User } from "@myorg/shared"` in `packages/server/src/index.ts`
resolves to the local source — not a published npm package.

### Shared `tsconfig` with `extends`

Without a shared base config, every package duplicates the same compiler options. The
`extends` field in `tsconfig.json` solves this:

**`tsconfig.base.json`** (at the monorepo root):

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "commonjs",
        "lib": ["ES2022"],
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "composite": true
    }
}
```

**`packages/shared/tsconfig.json`** (inherits and customizes):

```json
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
```

**`packages/server/tsconfig.json`** (inherits, customizes, and references):

```json
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
```

Each package only specifies what's unique to it — `outDir`, `rootDir`, and `references`.
Everything else comes from the base. When you update a compiler option (say, bumping
`target` to `ES2023`), you change it in one place and every package inherits the update.

### Path Aliases and `baseUrl`

Path aliases let you write clean imports like `@myorg/shared` instead of
`../../packages/shared/src`. There are two levels where aliases need to be configured:

**TypeScript-level** (for type checking and IDE support):

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@myorg/shared": ["packages/shared/src"],
            "@myorg/shared/*": ["packages/shared/src/*"]
        }
    }
}
```

The `paths` mapping tells the TypeScript compiler where to find modules when it encounters
an import like `@myorg/shared`. The `baseUrl` sets the root directory for resolving
non-relative module names.

**Runtime-level** (for Node.js or your bundler):

TypeScript's `paths` only affect type checking — they don't rewrite imports in the emitted
JavaScript. At runtime, you need one of these:

- **Workspace symlinks** — if your package manager workspaces are set up correctly,
  `@myorg/shared` already resolves via the symlink in `node_modules`. This is the simplest
  approach and works out of the box.
- **`tsconfig-paths`** — a Node.js loader that reads `tsconfig.json` paths at runtime:
  ```bash
  node -r tsconfig-paths/register dist/index.js
  ```
- **Bundler aliases** — Webpack, Vite, esbuild, and others have their own alias configs
  that mirror the TypeScript `paths`.

In a workspace monorepo, the symlink approach is usually sufficient — you don't need
`tsconfig-paths` or bundler aliases because the package manager already handles resolution.

### Workspaces + Project References Together

The workspace manager and TypeScript's project references solve different problems:

| Concern | Workspace Manager | Project References |
|---------|------------------|--------------------|
| Dependency installation | ✅ | ❌ |
| Cross-package linking | ✅ (symlinks) | ❌ |
| Script orchestration | ✅ (`npm run -w`) | ❌ |
| Type-checking order | ❌ | ✅ (`tsc -b`) |
| Incremental builds | ❌ | ✅ (`.tsBuildInfo`) |
| Declaration generation | ❌ | ✅ (`composite`) |

You need **both** for a complete monorepo setup:

```bash
# Install all dependencies and create symlinks
npm install

# Build all TypeScript packages in dependency order
tsc -b

# Run a script in a specific workspace
npm run test -w @myorg/server
```

## Common Pitfalls

- **Forgetting to set `"private": true` in the root `package.json`.** Workspace roots
  should never be published to npm. Without `"private": true`, you risk accidentally
  publishing the entire monorepo as a single package.

- **Mismatched `paths` and workspace names.** If your package is named `@myorg/shared` in
  its `package.json` but your `paths` alias points to `@myorg/common`, TypeScript will
  resolve the alias but Node.js won't find the package at runtime. Keep names consistent.

- **Putting `paths` in the base config without `baseUrl`.** The `paths` option requires
  `baseUrl` to be set. If you define `paths` in `tsconfig.base.json`, the `baseUrl` is
  relative to *that file's location* — which may not be what you expect when a package
  extends it. It's often cleaner to define `paths` in each package's own `tsconfig.json`
  or in the root config only.

- **Relying on `paths` for runtime resolution.** TypeScript's `paths` mapping is purely
  a compile-time concept. The emitted JavaScript still contains the original import paths.
  In a workspace monorepo, the symlinks handle runtime resolution — but if you're not using
  workspaces, you need `tsconfig-paths` or bundler aliases to make imports work at runtime.

- **Circular workspace dependencies.** Just like project references, workspace packages
  shouldn't have circular dependencies. If `@myorg/server` depends on `@myorg/client` and
  vice versa, extract the shared code into `@myorg/shared`.

## Key Takeaways

- Package manager workspaces (npm, yarn, pnpm) handle dependency installation and
  cross-package linking via symlinks — making local packages importable by name.
- A shared `tsconfig.base.json` with `extends` eliminates config duplication across
  packages. Each package inherits the base and only overrides what's unique.
- TypeScript `paths` aliases provide clean imports and IDE support, while workspace
  symlinks handle runtime resolution — together they replace fragile relative paths.
- Workspaces and project references are complementary: workspaces manage packages and
  dependencies, project references manage TypeScript's build graph and incremental
  compilation.
- The standard monorepo pattern is: workspace root with `tsconfig.base.json` +
  root solution `tsconfig.json` + per-package configs that extend the base and declare
  references.

<div class="hint">
When choosing between npm, yarn, and pnpm workspaces, consider that pnpm's strict
`node_modules` structure (using symlinks and a content-addressable store) prevents
"phantom dependencies" — packages that work accidentally because they're hoisted but
aren't declared in your `package.json`. This strictness catches real bugs that npm and
yarn's hoisting can hide. For new monorepos, pnpm is increasingly the recommended choice.
</div>

<div class="hint">
You can combine `extends` with multiple levels of inheritance. For example, a
`tsconfig.base.json` for shared options, a `tsconfig.node.json` that extends the base
and adds Node-specific settings (`"module": "commonjs"`), and a `tsconfig.browser.json`
that extends the base with browser settings (`"module": "ESNext"`, `"lib": ["DOM"]`).
Each package then extends whichever environment config it needs.
</div>
