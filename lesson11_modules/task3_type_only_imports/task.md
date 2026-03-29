# Type-Only Imports and Exports

TypeScript lets you import and export **types separately from values**. This distinction
matters because types are erased at compile time — they don't exist in the JavaScript
output. Using `import type` and `export type` makes this erasure explicit and can prevent
subtle bugs.

## Core Concept

### `import type`

The `import type` syntax tells TypeScript that the import is used only as a type annotation
and should be completely removed from the emitted JavaScript:

```typescript
// Only importing the type — no runtime code generated
import type { User } from "./models";

function greetUser(user: User): string {
    return `Hello, ${user.name}`;
}
```

The compiled JavaScript will have **no import statement at all** — `User` is erased.

### Inline Type Qualifier

Since TypeScript 4.5, you can mix value and type imports in a single statement using the
inline `type` keyword:

```typescript
import { createUser, type User, type Role } from "./models";

// createUser is a value — it stays in the JS output
// User and Role are types — they're erased
const admin: User = createUser("Alice", "admin" as Role);
```

This is more concise than writing two separate import lines.

### `export type`

Similarly, you can mark exports as type-only:

```typescript
interface Config {
    host: string;
    port: number;
}

type Environment = "dev" | "staging" | "prod";

// These exports are type-only — erased from JS output
export type { Config, Environment };
```

You can also use `export type` in re-exports:

```typescript
// Re-export only the type, not the value
export type { User } from "./models";
```

## How It Works

When TypeScript compiles your code, it needs to decide which imports to keep in the
JavaScript output and which to remove. Without `import type`, the compiler uses a
heuristic called **import elision** — it checks whether each imported name is used only
as a type and removes it if so.

This heuristic usually works, but it can fail in edge cases:

```typescript
import { SomeClass } from "./module";

// Is SomeClass used as a value or a type here?
// If only used in type position, the import gets elided.
// But what if the module has side effects that need to run?
```

Using `import type` removes the ambiguity. You're telling the compiler: "This import is
definitely type-only — always erase it."

### The `verbatimModuleSyntax` Flag

TypeScript 5.0 introduced the `verbatimModuleSyntax` compiler option. When enabled, it
**requires** you to use `import type` for type-only imports. The compiler will error if
you import a type without the `type` keyword:

```jsonc
// tsconfig.json
{
    "compilerOptions": {
        "verbatimModuleSyntax": true
    }
}
```

With this flag, there's no guessing — every import is either a value import (kept) or a
type import (erased). This is the recommended setting for new projects.

## When to Use `import type`

Use `import type` when:

1. **You're importing only interfaces or type aliases.** These have no runtime
   representation, so marking them as type-only is accurate and clear.

2. **You want to avoid side effects.** A regular import of a module executes that
   module's top-level code. `import type` guarantees the module is never loaded at
   runtime.

3. **You're working with circular dependencies.** Type-only imports break runtime
   circular dependency chains because they're erased — the module never actually
   imports the other at runtime.

4. **Your project uses `verbatimModuleSyntax`.** In this mode, you must use
   `import type` for anything that's only used as a type.

## Common Pitfalls

- **Using a type-only import as a value.** If you write `import type { User }` and
  then try `new User()` or `console.log(User)`, TypeScript will error. Type-only
  imports cannot be used in value positions.
- **Forgetting `type` with `verbatimModuleSyntax`.** This flag makes type-only imports
  mandatory. Existing code may need updating when you enable it.
- **Assuming `import type` prevents module execution.** It does — but only for that
  specific import. If another file imports the same module as a value, the module's
  side effects still run.

## Key Takeaways

- `import type { X }` imports only the type, erased completely from JavaScript output.
- Inline `type` qualifiers (`import { value, type Type }`) mix values and types in one line.
- `export type { X }` marks exports as type-only.
- `verbatimModuleSyntax` (TS 5.0+) enforces explicit `import type` for all type-only imports.
- Type-only imports help with circular dependencies, tree-shaking, and code clarity.

<div class="hint">
A good rule of thumb: if you're importing an `interface` or `type` alias and never use
it as a value (no `new`, no `console.log`, no passing it to a function), use `import type`.
It makes your intent clear and helps bundlers optimize your code.
</div>
