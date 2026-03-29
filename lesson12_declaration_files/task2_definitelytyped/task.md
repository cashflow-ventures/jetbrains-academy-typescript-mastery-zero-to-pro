# Using DefinitelyTyped

Not every JavaScript library ships its own TypeScript declarations. When a library lacks
built-in types, the **DefinitelyTyped** repository fills the gap. It's the world's largest
collection of community-maintained type definitions, published to npm under the `@types`
scope. Understanding how to find, install, and use these packages is essential for working
with the broader JavaScript ecosystem in TypeScript.

## Core Concept

DefinitelyTyped is a GitHub repository containing thousands of `.d.ts` files for popular
JavaScript libraries. Each set of declarations is published as a separate npm package
under the `@types` scope:

```bash
# Install types for a library that doesn't ship its own
npm install --save-dev @types/lodash
npm install --save-dev @types/express
npm install --save-dev @types/node
```

Once installed, TypeScript automatically picks up the types — no extra configuration
needed. When you write `import _ from "lodash"`, TypeScript resolves the types from
`node_modules/@types/lodash`.

### How Type Resolution Works

TypeScript looks for types in this order:

1. **Package's own types** — The `"types"` or `"typings"` field in the library's
   `package.json` pointing to a `.d.ts` file.
2. **`@types` packages** — TypeScript checks `node_modules/@types/` for a matching
   package name.
3. **Local declarations** — Any `declare module "library-name"` in your project's
   `.d.ts` files.

```typescript
// After installing @types/lodash, this just works:
import { groupBy, sortBy } from "lodash";

const data = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 30 },
];

// TypeScript knows groupBy returns Dictionary<T[]>
const grouped = groupBy(data, "age");

// TypeScript knows sortBy returns T[]
const sorted = sortBy(data, "name");
```

## How It Works

### Automatic Type Acquisition

Some editors (like VS Code) support **automatic type acquisition** — they detect
JavaScript libraries in your project and silently download `@types` packages for
IntelliSense. This is controlled by the `typeAcquisition` field in `tsconfig.json`
or `jsconfig.json`:

```json
{
    "typeAcquisition": {
        "enable": true,
        "include": ["lodash"],
        "exclude": ["jquery"]
    }
}
```

For TypeScript projects, you typically install `@types` packages explicitly as
`devDependencies` rather than relying on automatic acquisition.

### The `types` and `typeRoots` Compiler Options

By default, TypeScript loads all `@types` packages it finds in `node_modules/@types`.
You can restrict which packages are loaded:

```json
{
    "compilerOptions": {
        "types": ["node", "jest"]
    }
}
```

With `"types"` specified, only `@types/node` and `@types/jest` are included — other
`@types` packages are ignored. This prevents unwanted global type pollution.

The `typeRoots` option changes where TypeScript looks for `@types`:

```json
{
    "compilerOptions": {
        "typeRoots": ["./custom-types", "./node_modules/@types"]
    }
}
```

### Version Matching

`@types` packages use a versioning convention that mirrors the library version:

- `lodash@4.17.21` → `@types/lodash@4.17.x`
- `express@4.18.2` → `@types/express@4.18.x`

Keep the major and minor versions aligned. A mismatch can cause missing or incorrect
type definitions.

```json
{
    "devDependencies": {
        "express": "^4.18.2",
        "@types/express": "^4.17.21"
    }
}
```

### Checking if Types Exist

Before writing your own declarations, check if types already exist:

```bash
# Search for types on npm
npm search @types/library-name

# Or check the DefinitelyTyped search tool
# https://www.typescriptlang.org/dt/search
```

Many modern libraries now bundle their own types. Check the library's `package.json`
for a `"types"` field — if it exists, you don't need `@types`.

## Common Pitfalls

- **Installing `@types` for a self-typed library.** If a library already ships `.d.ts`
  files, installing `@types` can cause conflicts. Check the library's `package.json`
  first.
- **Version drift.** When you update a library but forget to update its `@types` package,
  the types may not match the runtime API. Keep versions in sync.
- **Global type pollution.** Some `@types` packages (like `@types/node`) add global
  types. If you're building a browser library, `@types/node` can introduce `Buffer`,
  `process`, etc. into your global scope. Use the `"types"` compiler option to limit
  which packages are loaded.
- **Missing types for niche libraries.** Not every library has `@types` coverage. For
  small or niche libraries, you may need to write your own `.d.ts` file (covered in the
  next task).

## Key Takeaways

- DefinitelyTyped provides community-maintained type definitions via `@types/*` packages.
- Install them as `devDependencies` — they're only needed at compile time.
- TypeScript resolves types automatically: package's own types → `@types` → local declarations.
- Use the `"types"` compiler option to control which `@types` packages are loaded.
- Keep `@types` versions aligned with the library versions they describe.
- Always check if a library ships its own types before reaching for `@types`.

<div class="hint">
The DefinitelyTyped repository on GitHub has over 8,000 type definition packages. If you
find a bug or want to improve types for a library, you can submit a pull request directly
to the repository — it's one of the most active open-source projects in the TypeScript
ecosystem.
</div>
