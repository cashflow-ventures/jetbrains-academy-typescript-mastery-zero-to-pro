# Const Enums

Regular enums generate a JavaScript object at runtime. **Const enums** take a different
approach — the compiler **inlines** every reference, replacing enum members with their
literal values. The enum object itself is erased from the output entirely.

## Core Concept

Prefix an enum with `const` to make it a const enum:

```typescript
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

const d = Direction.Up;
```

The compiled JavaScript for the line above is simply:

```javascript
const d = 0 /* Direction.Up */;
```

No `Direction` object exists at runtime. Every usage is replaced with the raw value,
and the compiler adds a comment showing which member it came from.

## Why Use Const Enums?

### 1. Zero Runtime Overhead

Regular enums add an object to your bundle. In performance-sensitive code or large
codebases with many enums, const enums eliminate that overhead completely.

### 2. Smaller Bundle Size

Since the enum object is erased, your compiled output is smaller. This matters in
front-end applications where every kilobyte counts.

### 3. Compile-Time Safety

You still get full type checking and autocompletion — the enum exists in the type system,
just not at runtime.

## Limitations

Const enums come with important restrictions:

### No Reverse Mapping

Because there is no runtime object, you cannot do `Direction[0]` to get `"Up"`. The
object simply doesn't exist.

```typescript
const enum Status {
    Active,
    Inactive
}

// ❌ This would fail at runtime — Status doesn't exist
// console.log(Status[0]);
```

### No Computed Members

All members must be constant expressions. You cannot use runtime computations:

```typescript
const enum Valid {
    A = 1,
    B = 2,
    C = A + B  // ✅ constant expression
}

// ❌ This would be an error:
// const enum Invalid {
//     X = Math.random()  // computed — not allowed
// }
```

### The `isolatedModules` Problem

When `isolatedModules` is enabled (common with Babel, esbuild, or SWC), const enums
from other files cannot be inlined because each file is compiled independently. The
compiler cannot see the enum values from another module.

TypeScript will error if you try to import a const enum with `isolatedModules: true`.
The workaround is to either:

- Avoid const enums in projects using single-file transpilation
- Use the `preserveConstEnums` compiler option (emits the object anyway)

### `preserveConstEnums`

This tsconfig option tells the compiler to emit the enum object even for const enums,
while still inlining references. This gives you the best of both worlds — inlined values
plus a runtime object for debugging or interop:

```json
{
    "compilerOptions": {
        "preserveConstEnums": true
    }
}
```

## When to Use Const Enums

Use const enums when:

- You want zero runtime cost for a set of named constants
- You don't need reverse mapping
- Your project doesn't use `isolatedModules` (or you enable `preserveConstEnums`)
- The enum is used within a single module or a tightly coupled set of files

Avoid const enums when:

- You need to iterate over enum members at runtime
- You need reverse mapping (value → name)
- Your build tool compiles files in isolation (Babel, esbuild, SWC)
- The enum is part of a public API consumed by other packages

## Common Pitfalls

- **Assuming the enum object exists at runtime.** It doesn't — any code that tries to
  access the enum as an object (e.g., `Object.keys(MyConstEnum)`) will fail.
- **Using const enums across package boundaries.** Consumers of your library can't inline
  values from your const enum — use regular enums for public APIs.
- **Forgetting `isolatedModules` restrictions.** Many modern build setups enable this flag.
  Check your tsconfig before reaching for const enums.

## Key Takeaways

- `const enum` inlines member values at every usage site — no runtime object is emitted.
- This eliminates bundle size overhead but removes reverse mapping and runtime iteration.
- All members must be constant expressions (no computed values).
- `isolatedModules` prevents cross-file const enum inlining — use `preserveConstEnums` as
  a workaround.
- Prefer regular enums or union literals for public APIs and cross-module usage.

<div class="hint">
The TypeScript team has acknowledged that const enums have tricky edge cases. The official
recommendation is to prefer union literal types (`type Dir = "up" | "down"`) in most
cases, reserving const enums for performance-critical internal code.
</div>
