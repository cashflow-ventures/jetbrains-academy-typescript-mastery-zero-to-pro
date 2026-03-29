# ES Modules in TypeScript

Every modern TypeScript project uses **ES modules** — the standard JavaScript module system
defined in ECMAScript 2015. TypeScript fully supports ES module syntax and adds its own
enhancements for type-safe imports and exports. Understanding how modules work is essential
for organizing code into maintainable, reusable pieces.

## Core Concept

A file becomes a module the moment it contains a top-level `import` or `export` statement.
Without one, TypeScript treats the file as a **script** whose declarations live in the
global scope.

### Named Exports

You can export individual declarations by placing `export` in front of them:

```typescript
// math.ts
export function add(a: number, b: number): number {
    return a + b;
}

export const PI: number = 3.14159;

export interface Point {
    x: number;
    y: number;
}
```

Or gather exports at the bottom of the file using an export list:

```typescript
// math.ts
function add(a: number, b: number): number {
    return a + b;
}

const PI: number = 3.14159;

export { add, PI };
```

### Named Imports

Import specific exports by name using curly braces:

```typescript
import { add, PI, Point } from "./math";

const result: number = add(2, 3);
const origin: Point = { x: 0, y: 0 };
```

You can rename imports with `as`:

```typescript
import { add as sum } from "./math";
const result = sum(1, 2);
```

### Default Exports

A module can have one **default export** — the "main" thing it provides:

```typescript
// logger.ts
export default function log(message: string): void {
    console.log(`[LOG] ${message}`);
}
```

Import a default export without curly braces, using any name you like:

```typescript
import log from "./logger";
import myLogger from "./logger"; // same thing, different local name
```

You can combine default and named imports:

```typescript
import log, { formatMessage } from "./logger";
```

### Namespace Imports

Import everything from a module as a single object:

```typescript
import * as MathUtils from "./math";

MathUtils.add(1, 2);
console.log(MathUtils.PI);
```

This is useful when a module exports many things and you want to keep them grouped.

## How It Works — Re-exports

Re-exports let you create a single entry point that gathers exports from multiple files.
This is the foundation of the **barrel pattern** (covered in a later task):

```typescript
// index.ts — re-export from sub-modules
export { add, PI } from "./math";
export { log } from "./logger";

// Re-export everything
export * from "./math";

// Re-export with renaming
export { add as sum } from "./math";

// Re-export a default as a named export
export { default as log } from "./logger";
```

Re-exports don't import the values into the current scope — they just forward them to
consumers of this module.

## Type Imports

TypeScript adds `import type` to import only types, which are erased at compile time:

```typescript
import type { Point } from "./math";

// Point is available as a type annotation
const origin: Point = { x: 0, y: 0 };

// But you cannot use it as a value (e.g., no `new Point()`)
```

You can also use inline type qualifiers in a regular import:

```typescript
import { add, type Point } from "./math";
```

This tells the compiler that `Point` is type-only while `add` is a value import. We'll
explore type-only imports in depth in a later task.

## Common Pitfalls

- **Forgetting the file extension in paths.** TypeScript resolves `"./math"` to
  `math.ts`, `math/index.ts`, etc. depending on your `moduleResolution` setting. In
  `nodenext` mode, you may need explicit `.js` extensions.
- **Circular imports.** Two modules importing each other can cause runtime issues where
  one module sees `undefined` for the other's exports. Restructure shared code into a
  third module to break cycles.
- **Default export confusion.** Default exports have no fixed name, making refactoring
  and searching harder. Many style guides prefer named exports for consistency.
- **Mixing `require` and `import`.** In a TypeScript project with `"module": "commonjs"`,
  `import` syntax compiles to `require()`. Don't mix `import` and `require` in the same
  file — pick one style.

## Key Takeaways

- A file with a top-level `import` or `export` is a module; otherwise it's a global script.
- Named exports use `export { name }` or `export` before a declaration.
- Default exports provide a single "main" export per module.
- `import * as X` creates a namespace object with all exports.
- Re-exports (`export { x } from "./y"`) forward exports without importing them locally.
- `import type` imports only type information, erased at compile time.

<div class="hint">
When TypeScript compiles to CommonJS (`"module": "commonjs"`), `import { add } from "./math"`
becomes `const { add } = require("./math")` and `export default` becomes
`exports.default = ...`. The ES module syntax is just sugar over the target module system.
</div>

<div class="hint">
Prefer named exports over default exports in large codebases. Named exports are easier to
search, refactor, and auto-import in IDEs. Default exports are fine for single-purpose
modules like React components.
</div>
