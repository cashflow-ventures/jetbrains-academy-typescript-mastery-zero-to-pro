# Project References and Composite Projects

As TypeScript projects grow from a single `tsconfig.json` into multi-package monorepos or
large applications with distinct layers, compilation time becomes a bottleneck. Every time
you run `tsc`, the compiler re-checks *every* file in the project — even files that haven't
changed. **Project references** solve this by splitting a codebase into smaller, independently
compilable units that TypeScript can build incrementally. Combined with the `composite` flag
and `tsc -b` (build mode), project references can reduce rebuild times from minutes to
seconds in large codebases.

## Core Concept

A **project reference** tells TypeScript that one sub-project depends on another. Instead of
one monolithic compilation, you define multiple `tsconfig.json` files — each covering a
subset of your source code — and declare the dependency graph between them using the
`references` array.

The key ingredients are:

- **`composite: true`** — marks a `tsconfig.json` as a buildable unit that produces
  `.d.ts` declaration files and a `.tsBuildInfo` cache file.
- **`references: [...]`** — declares which other composite projects this project depends on.
- **`.tsBuildInfo`** — a JSON file that caches the compiler's knowledge of what was already
  checked and emitted, enabling incremental rebuilds.
- **`tsc -b` (build mode)** — a special compiler mode that understands the dependency graph,
  builds projects in the correct order, and skips projects that are already up to date.

### A Typical Multi-Package Structure

Consider a monorepo with three packages — a shared library, a server, and a client:

```
monorepo/
├── packages/
│   ├── shared/
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── tsconfig.json      ← composite: true
│   ├── server/
│   │   ├── src/
│   │   │   └── index.ts       ← imports from @monorepo/shared
│   │   └── tsconfig.json      ← references: [{ path: "../shared" }]
│   └── client/
│       ├── src/
│       │   └── index.ts       ← imports from @monorepo/shared
│       └── tsconfig.json      ← references: [{ path: "../shared" }]
└── tsconfig.json               ← root "solution" config, references all packages
```

Without project references, a single `tsc` invocation would compile *all* files across all
three packages every time. With project references, `tsc -b` compiles `shared` first (since
the others depend on it), then `server` and `client` in parallel — and on subsequent builds,
it skips any package whose source files haven't changed.

## How It Works

### The `composite` Flag

Setting `"composite": true` in a `tsconfig.json` tells TypeScript this project is a
buildable unit within a larger dependency graph. It enforces several constraints:

```json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
```

When `composite` is enabled:

- **`declaration` is forced to `true`** — the project must emit `.d.ts` files so that
  downstream projects can type-check against declarations instead of re-parsing source.
- **`rootDir` must be set** (or inferable) — TypeScript needs to know the source root to
  produce a consistent output structure.
- **All source files must be matched by `include` or `files`** — no implicit file discovery.
  This ensures the build is deterministic and cacheable.
- **A `.tsBuildInfo` file is emitted** — this is the incremental build cache.

### The `references` Array

A project declares its dependencies using the `references` field at the top level of
`tsconfig.json`:

```json
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "references": [
        { "path": "../shared" }
    ],
    "include": ["src/**/*"]
}
```

Each entry in `references` points to a directory containing a `tsconfig.json` (or directly
to a `.json` file). When TypeScript resolves imports from a referenced project, it reads the
*emitted `.d.ts` files* — not the original `.ts` source. This is the key performance win:
downstream projects never re-parse or re-check upstream source code.

### The `.tsBuildInfo` File

When you build a composite project, TypeScript writes a `.tsBuildInfo` file (typically next
to the output). This JSON file records:

- The compiler options used for the build.
- A hash of every input file's content.
- The relationship between input files and their emitted outputs.
- Semantic diagnostics from the last successful build.

On the next build, TypeScript reads `.tsBuildInfo`, compares file hashes, and skips
re-checking any file that hasn't changed. For a 500-file project where you edited one file,
this means the compiler only re-checks that one file and its direct dependents — not all 500.

You can control where the file is written:

```json
{
    "compilerOptions": {
        "composite": true,
        "tsBuildInfoFile": "./dist/.tsBuildInfo"
    }
}
```

### Build Mode: `tsc -b`

Regular `tsc` doesn't understand project references — it compiles whatever the current
`tsconfig.json` covers. **Build mode** (`tsc -b` or `tsc --build`) is a separate mode that:

1. **Reads the dependency graph** from `references` arrays across all `tsconfig.json` files.
2. **Topologically sorts** the projects — builds dependencies before dependents.
3. **Checks `.tsBuildInfo`** for each project and skips any that are up to date.
4. **Builds only what changed** — if `shared` hasn't changed, it skips straight to `server`
   and `client`.

Common `tsc -b` commands:

```bash
# Build the current project and all its references
tsc -b

# Build from the root solution config
tsc -b tsconfig.json

# Build a specific package
tsc -b packages/server/tsconfig.json

# Force a clean rebuild (ignore .tsBuildInfo)
tsc -b --force

# Delete all build outputs and .tsBuildInfo files
tsc -b --clean

# Watch mode — rebuild on file changes
tsc -b --watch

# Verbose output showing what's being built/skipped
tsc -b --verbose
```

### The Root "Solution" Config

Large projects typically have a root `tsconfig.json` that references all packages but
compiles nothing itself:

```json
{
    "files": [],
    "references": [
        { "path": "./packages/shared" },
        { "path": "./packages/server" },
        { "path": "./packages/client" }
    ]
}
```

Setting `"files": []` means this config has no source files of its own — it exists solely
to define the build order. Running `tsc -b` from the root builds everything in the correct
dependency order.

## Common Pitfalls

- **Forgetting `composite: true` in referenced projects.** If a project is listed in
  another's `references` but doesn't have `composite: true`, `tsc -b` will fail with an
  error. Every referenced project must be composite.

- **Importing source files instead of declarations.** Project references work by reading
  `.d.ts` outputs. If your import paths resolve to `.ts` source files in another package
  (e.g., via path aliases that bypass the declaration boundary), you lose the incremental
  build benefit and may get confusing errors.

- **Not committing or caching `.tsBuildInfo` in CI.** The `.tsBuildInfo` file is what makes
  incremental builds fast. If your CI pipeline starts fresh every time without caching these
  files, you get no incremental benefit. Cache the `dist/` or `.tsBuildInfo` files between
  CI runs.

- **Circular references.** TypeScript does not allow circular project references. If
  `packages/a` references `packages/b` and `packages/b` references `packages/a`, `tsc -b`
  will report an error. Refactor shared code into a third package to break the cycle.

- **Using `tsc` instead of `tsc -b`.** Running plain `tsc` on a project with `references`
  doesn't build the referenced projects — it only compiles the current project and expects
  the references to already be built. Always use `tsc -b` to build the full graph.

## Key Takeaways

- Project references split a large codebase into independently compilable units, each with
  its own `tsconfig.json` and `composite: true`.
- The `references` array declares the dependency graph between projects, and downstream
  projects type-check against emitted `.d.ts` files — not source code.
- `.tsBuildInfo` files cache the compiler's state, enabling incremental rebuilds that skip
  unchanged files and projects.
- `tsc -b` (build mode) is the command that understands the dependency graph, builds in
  topological order, and leverages `.tsBuildInfo` for fast incremental builds.
- A root "solution" `tsconfig.json` with `"files": []` and a `references` array is the
  standard pattern for orchestrating multi-package builds.

<div class="hint">
You can use `tsc -b --verbose` to see exactly which projects are being built and which are
being skipped. This is invaluable for debugging slow builds — if a project is being rebuilt
when you don't expect it, the verbose output will show you which file changed and triggered
the rebuild. Combine this with `tsc -b --extendedDiagnostics` to see timing information for
each phase of the build.
</div>

<div class="hint">
Project references pair naturally with `npm`/`yarn`/`pnpm` workspaces. The workspace manager
handles `node_modules` linking and package resolution, while project references handle
TypeScript's type-checking and build order. Together, they give you a fast, type-safe
monorepo setup. You'll explore this combination in the
[monorepo task](course://lesson24_performance_internals/task10_monorepo/task.ts).
</div>
