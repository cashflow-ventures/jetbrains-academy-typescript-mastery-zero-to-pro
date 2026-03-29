# Triple-Slash Directives

Before ES modules became the standard, TypeScript used **triple-slash directives** —
special comments at the top of a file — to declare dependencies between files. While
modern TypeScript projects rarely need them, there are a few scenarios where triple-slash
directives are still the right tool. Understanding when they're needed (and when they're
not) helps you navigate legacy codebases and edge cases.

## Core Concept

A triple-slash directive is a single-line comment containing an XML tag. It must appear
at the very top of a file, before any code or other comments:

```typescript
/// <reference path="./globals.d.ts" />
/// <reference types="node" />
/// <reference lib="es2022" />
```

There are three main forms:

### `/// <reference path="..." />`

Tells the compiler to include another file in the compilation. This was the primary way
to manage file dependencies before modules:

```typescript
/// <reference path="./utils.d.ts" />

// Now declarations from utils.d.ts are available
const result = formatDate(new Date());
```

In modern projects with `tsconfig.json`, the compiler already knows which files to
include via `"include"` and `"files"` options, making `path` references unnecessary
in most cases.

### `/// <reference types="..." />`

Declares a dependency on an `@types` package. This is equivalent to adding the package
to the `"types"` array in `tsconfig.json`:

```typescript
/// <reference types="node" />

// Now Node.js types (Buffer, process, etc.) are available in this file
const buf = Buffer.from("hello");
```

This is useful in `.d.ts` files that need to reference types from another package
without importing them (since `.d.ts` files for global scripts can't use `import`).

### `/// <reference lib="..." />`

Specifies which built-in library definitions to include, matching the `"lib"` compiler
option values:

```typescript
/// <reference lib="es2022" />
/// <reference lib="dom" />

// ES2022 and DOM types are now available
const result = [1, 2, 3].at(-1);
const el = document.getElementById("app");
```

## How It Works

### When Triple-Slash Directives Are Still Needed

Despite being largely replaced by `tsconfig.json` and ES modules, triple-slash directives
remain useful in specific scenarios:

**1. Global `.d.ts` files referencing `@types` packages:**

```typescript
// global.d.ts — a script file (no import/export)
/// <reference types="node" />

declare function loadConfig(): NodeJS.ProcessEnv;
```

Since this file has no `import` statement (it's a global script), you can't use
`import type { ProcessEnv } from "..."`. The `/// <reference types>` directive is the
only way to bring in the Node.js types.

**2. Declaration files for libraries:**

When authoring a `.d.ts` file for a library that depends on another library's types:

```typescript
// my-lib.d.ts
/// <reference types="express" />

declare namespace MyLib {
    function createMiddleware(): Express.RequestHandler;
}
```

**3. Splitting large declaration files:**

```typescript
// index.d.ts
/// <reference path="./core.d.ts" />
/// <reference path="./plugins.d.ts" />
/// <reference path="./utils.d.ts" />
```

This pattern is used by large libraries (like jQuery or Lodash) to organize their
type definitions across multiple files.

### When NOT to Use Triple-Slash Directives

In modern TypeScript with ES modules, prefer these alternatives:

| Instead of... | Use... |
|--------------|--------|
| `/// <reference path="..." />` | `import` / `export` statements |
| `/// <reference types="..." />` | `"types"` in `tsconfig.json` |
| `/// <reference lib="..." />` | `"lib"` in `tsconfig.json` |

```typescript
// ❌ Old style
/// <reference path="./types.d.ts" />

// ✅ Modern style
import type { MyType } from "./types";
```

### Directive Placement Rules

Triple-slash directives have strict placement requirements:

- Must be at the **very top** of the file
- Must appear before any statements or other comments
- Only single-line comments (`//`) before them are allowed
- A directive after a statement is treated as a regular comment and ignored

```typescript
// This is fine — regular comment before directive
/// <reference types="node" />

import { readFile } from "fs";

// ❌ This is ignored — directive after a statement
/// <reference types="express" />
```

## Common Pitfalls

- **Using `path` references in module files.** If your file uses `import`/`export`,
  `/// <reference path>` is usually ignored or redundant. Use `import` instead.
- **Directive after code.** A triple-slash directive placed after any statement is
  silently ignored. Always put them at the very top of the file.
- **Confusing `types` and `path`.** `types` references an `@types` package by name.
  `path` references a specific file by relative path. They serve different purposes.
- **Over-relying on directives in modern projects.** If you have a `tsconfig.json` with
  proper `"include"`, `"lib"`, and `"types"` settings, you rarely need triple-slash
  directives. They add noise without benefit.

## Key Takeaways

- Triple-slash directives are special comments (`/// <reference ... />`) at the top of a file.
- `path` includes another file, `types` includes an `@types` package, `lib` includes a built-in library.
- They must appear before any code — directives after statements are ignored.
- Modern projects use `tsconfig.json` and `import` statements instead.
- They're still needed in global `.d.ts` files that can't use `import` statements.
- Large library type definitions use `path` references to split across multiple files.

<div class="hint">
If you see triple-slash directives in a modern codebase, it's often a sign that the code
was written before TypeScript's module system matured, or that it's a global declaration
file. Consider whether the directive can be replaced with a `tsconfig.json` setting or
an `import type` statement.
</div>
