# Advanced tsconfig — The Strict Family Deep Dive

TypeScript's `strict` flag is the single most important compiler option for production code.
But `strict` is not one flag — it's an umbrella that enables a family of individual checks.
Understanding each flag lets you adopt strictness incrementally, debug surprising errors,
and go beyond `strict` with additional flags that TypeScript doesn't enable by default.
This task covers every strict-family flag, the strict-adjacent flags you should know,
and a recommended production configuration.

## Core Concept

When you set `"strict": true` in `tsconfig.json`, TypeScript enables all of the following
individual flags simultaneously:

```typescript
{
    "compilerOptions": {
        "strict": true
        // Equivalent to enabling ALL of these:
        // "noImplicitAny": true,
        // "strictNullChecks": true,
        // "strictFunctionTypes": true,
        // "strictBindCallApply": true,
        // "strictPropertyInitialization": true,
        // "noImplicitThis": true,
        // "alwaysStrict": true,
        // "useUnknownInCatchVariables": true
    }
}
```

Each flag targets a specific class of bugs. You can enable `strict` and then selectively
disable individual flags during migration — for example, `"strict": true, "strictNullChecks": false`
temporarily disables null checks while keeping everything else strict.

### The Eight `strict` Flags

**1. `noImplicitAny`** — Errors when TypeScript cannot infer a type and would fall back to `any`.
Without this flag, untyped function parameters silently become `any`, defeating the purpose
of using TypeScript at all.

```typescript
// ❌ Error with noImplicitAny — parameter 'x' implicitly has 'any' type
function double(x) { return x * 2; }

// ✅ Fixed — explicit type annotation
function double(x: number) { return x * 2; }
```

**2. `strictNullChecks`** — Makes `null` and `undefined` their own distinct types instead of
being assignable to every type. This is arguably the most impactful strict flag. Without it,
`string` implicitly includes `null` and `undefined`, hiding an entire class of runtime crashes.

```typescript
// With strictNullChecks: true
function getLength(s: string | null): number {
    // ❌ Error — s might be null
    // return s.length;

    // ✅ Must narrow first
    if (s === null) return 0;
    return s.length;
}
```

**3. `strictFunctionTypes`** — Enforces contravariant parameter checking for function types.
Without this flag, function parameters are checked **bivariantly** (both covariant and
contravariant), which is unsound. With it enabled, only contravariant checking applies:

```typescript
type Handler = (event: MouseEvent) => void;

// ❌ Error with strictFunctionTypes — Event is wider than MouseEvent
const handler: Handler = (event: Event) => { /* ... */ };
```

**4. `strictBindCallApply`** — Ensures that `bind()`, `call()`, and `apply()` are type-checked
against the original function signature instead of returning `any`:

```typescript
function greet(name: string, age: number): string {
    return `${name} is ${age}`;
}

// ❌ Error — wrong argument types
greet.call(undefined, "Alice", "thirty");

// ✅ Correct
greet.call(undefined, "Alice", 30);
```

**5. `strictPropertyInitialization`** — Requires that class properties declared without
an initializer are assigned in the constructor. Prevents accessing `undefined` properties
on class instances:

```typescript
class User {
    name: string;    // ❌ Error — not assigned in constructor
    age: number;

    constructor(age: number) {
        this.age = age;
        // Forgot to assign this.name!
    }
}
```

Use the definite assignment assertion (`!`) only when you know initialization happens
elsewhere (e.g., an ORM hydrates the property): `name!: string;`

**6. `noImplicitThis`** — Errors when `this` has an implicit `any` type. This catches
bugs in standalone functions and callbacks where `this` context is lost:

```typescript
// ❌ Error — 'this' implicitly has type 'any'
function getName() {
    return this.name;
}

// ✅ Fixed — explicit this parameter
function getName(this: { name: string }) {
    return this.name;
}
```

**7. `alwaysStrict`** — Emits `"use strict"` at the top of every generated JavaScript file.
This enables JavaScript strict mode, which catches silent errors like assigning to
undeclared variables. With ES modules this is already the default, but it matters for
script files.

**8. `useUnknownInCatchVariables`** — Types the `error` variable in `catch` blocks as
`unknown` instead of `any`. This forces you to narrow the error before accessing properties:

```typescript
try {
    riskyOperation();
} catch (error) {
    // With useUnknownInCatchVariables: true, error is 'unknown'
    if (error instanceof Error) {
        console.log(error.message); // ✅ narrowed to Error
    }
}
```

## How It Works

### Beyond `strict` — Strict-Adjacent Flags

TypeScript offers several additional flags that are **not** part of `strict` but provide
valuable extra safety. These must be enabled individually:

**`noUncheckedIndexedAccess`** — When accessing a property via an index signature, the
result type includes `undefined`. Without this flag, `Record<string, number>` returns
`number` for any key — even keys that don't exist. With it enabled, the return type is
`number | undefined`, forcing you to handle missing keys:

```typescript
const scores: Record<string, number> = { alice: 95 };

// Without noUncheckedIndexedAccess: bob is 'number' (wrong!)
// With noUncheckedIndexedAccess: bob is 'number | undefined' (correct!)
const bob = scores["bob"];
```

**`noPropertyAccessFromIndexSignature`** — Forces you to use bracket notation (`obj["key"]`)
instead of dot notation (`obj.key`) when accessing properties that come from an index
signature. This makes it visually clear which property accesses are "known" (declared
properties) vs "dynamic" (index signature):

```typescript
interface Config {
    name: string;
    [key: string]: string;
}
const config: Config = { name: "app", version: "1.0" };

config.name;        // ✅ 'name' is a declared property
// config.version;  // ❌ Error — must use bracket notation
config["version"];  // ✅ Bracket notation for index signature access
```

**`exactOptionalPropertyTypes`** — Distinguishes between a property that is `undefined`
and a property that is missing entirely. Without this flag, `{ x?: number }` allows
`{ x: undefined }`. With it enabled, you must omit the property or provide a `number`:

```typescript
interface Settings {
    theme?: "light" | "dark";
}

// With exactOptionalPropertyTypes: true
const a: Settings = {};                    // ✅ property omitted
const b: Settings = { theme: "dark" };     // ✅ valid value
// const c: Settings = { theme: undefined }; // ❌ Error — can't explicitly set undefined
```

**`noFallthroughCasesInSwitch`** — Errors on `switch` cases that fall through to the next
case without a `break`, `return`, or `throw`. Prevents accidental fallthrough bugs:

```typescript
switch (status) {
    case "active":
        activate();
        // ❌ Error — falls through to next case
    case "inactive":
        deactivate();
        break;
}
```

### Module-Related Strict Flags

**`isolatedModules`** — Ensures every file can be independently transpiled by tools like
esbuild, swc, or Babel. Disallows `const enum` re-exports and files without imports/exports.
Enable this whenever you use a transpiler other than `tsc`:

```typescript
// ❌ Error with isolatedModules — re-exporting const enum
export { Direction } from "./enums"; // if Direction is a const enum
```

**`verbatimModuleSyntax`** — Replaces the older `importsNotUsedAsValues` and
`preserveValueImports` flags. Enforces that type-only imports use `import type` syntax
and are erased, while value imports are preserved as written:

```typescript
// ✅ Correct with verbatimModuleSyntax
import type { User } from "./models";    // erased — type only
import { createUser } from "./models";   // preserved — runtime value
```

### Recommended Production tsconfig

A production-ready configuration enables `strict` plus all strict-adjacent flags:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noPropertyAccessFromIndexSignature": true,
        "exactOptionalPropertyTypes": true,
        "noFallthroughCasesInSwitch": true,
        "isolatedModules": true,
        "verbatimModuleSyntax": true,
        "declaration": true,
        "sourceMap": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    }
}
```

## Common Pitfalls

- **Disabling `strict` entirely when one flag causes errors.** Understand which specific
  flag triggered the error and address it directly instead of turning off all checks.

- **Ignoring `noUncheckedIndexedAccess`.** Not part of `strict`, so many projects miss it.
  Without it, every `Record` and array index access is a potential `undefined` bug.

- **Using `exactOptionalPropertyTypes` without updating existing code.** Code that
  explicitly sets `undefined` on optional properties will break. Adopt carefully.

- **Forgetting `isolatedModules` with esbuild/swc.** These transpilers process files
  individually and can silently miscompile `const enum` values without this flag.

- **Overusing `!` (definite assignment assertion).** The fix for `strictPropertyInitialization`
  errors should be proper initialization, not `!` on every property.

## Key Takeaways

- `strict: true` enables 8 individual flags: `noImplicitAny`, `strictNullChecks`,
  `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`,
  `noImplicitThis`, `alwaysStrict`, and `useUnknownInCatchVariables`.
- You can enable `strict` and selectively disable individual flags for incremental migration.
- Four strict-adjacent flags (`noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`,
  `exactOptionalPropertyTypes`, `noFallthroughCasesInSwitch`) provide additional safety
  beyond `strict` and should be enabled in production projects.
- `isolatedModules` is essential when using transpilers like esbuild or swc.
- `verbatimModuleSyntax` enforces explicit `import type` usage.
- A production tsconfig should enable `strict` plus all strict-adjacent flags, module
  isolation, and source maps.

<div class="hint">
When migrating a large JavaScript codebase to strict TypeScript, start with `strict: true`
and then disable the flags that produce the most errors — typically `strictNullChecks` and
`noImplicitAny`. Fix the remaining errors first, then re-enable the disabled flags one at
a time. This "strict-minus" approach is faster than enabling flags one by one because new
code is immediately written under full strictness.
</div>

<div class="hint">
TypeScript adds new flags to the `strict` family over time. When you upgrade TypeScript
versions, check the release notes — a new strict sub-flag might cause new errors in your
codebase. For example, `useUnknownInCatchVariables` was added in TypeScript 4.4 and
`strictPropertyInitialization` was added in TypeScript 2.7. Pinning your TypeScript version
in `package.json` and upgrading deliberately prevents surprises.
</div>
