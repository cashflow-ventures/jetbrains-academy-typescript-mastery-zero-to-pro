# Project Architecture

Building a real-world TypeScript application is more than knowing the language features — it's
about organizing code so that it scales, stays maintainable, and catches mistakes early. This
task introduces the three architectural pillars you'll use throughout the capstone project:
**layered architecture** for separation of concerns, **barrel exports** for clean module
boundaries, and a **strict `tsconfig`** that turns TypeScript's safety dial to maximum.

## Core Concept

Production TypeScript projects typically organize code into distinct **layers**, each with a
clear responsibility and a well-defined boundary. The most common layering follows this
pattern:

```
┌─────────────────────────────────┐
│         API / Handlers          │  ← HTTP routes, CLI commands, event handlers
├─────────────────────────────────┤
│         Service Layer           │  ← Business logic, orchestration, validation
├─────────────────────────────────┤
│         Domain Layer            │  ← Types, interfaces, branded IDs, enums
├─────────────────────────────────┤
│       Infrastructure Layer      │  ← Database, external APIs, file system
└─────────────────────────────────┘
```

Each layer depends only on the layers below it — never upward. The **domain layer** sits at
the bottom and has zero dependencies on anything else. It defines the vocabulary of your
application: `User`, `OrderId`, `ValidationError`, `Result<T, E>`. The **service layer**
contains business rules and orchestrates domain objects. The **API layer** translates external
requests into service calls. The **infrastructure layer** provides concrete implementations
for persistence, networking, and other I/O.

This separation means you can swap your database without touching business logic, test
services without spinning up an HTTP server, and reason about domain types without worrying
about how they're stored.

### Folder Structure

A typical layered TypeScript project looks like this:

```
src/
├── domain/
│   ├── models/
│   │   ├── user.ts          ← User interface, UserId branded type
│   │   ├── order.ts         ← Order interface, OrderStatus union
│   │   └── index.ts         ← barrel: re-exports all models
│   ├── errors.ts            ← AppError, ValidationError, NotFoundError
│   └── index.ts             ← barrel: re-exports models/ and errors
├── services/
│   ├── userService.ts       ← Business logic for users
│   ├── orderService.ts      ← Business logic for orders
│   └── index.ts             ← barrel: re-exports all services
├── api/
│   ├── handlers/
│   │   ├── userHandler.ts   ← HTTP handler for /users
│   │   └── index.ts         ← barrel
│   └── index.ts             ← barrel
├── infrastructure/
│   ├── database.ts          ← Database connection, queries
│   ├── repositories/
│   │   ├── userRepo.ts      ← Concrete UserRepository
│   │   └── index.ts         ← barrel
│   └── index.ts             ← barrel
└── index.ts                 ← application entry point
```

## How It Works

### Barrel Exports

A **barrel** is an `index.ts` file that re-exports the public API of a folder. Instead of
importing from deep paths, consumers import from the folder itself:

```typescript
// Without barrels — fragile, exposes internal structure
import { User } from "../domain/models/user";
import { UserId } from "../domain/models/user";
import { AppError } from "../domain/errors";

// With barrels — clean, stable API surface
import { User, UserId, AppError } from "../domain";
```

A barrel file looks like this:

```typescript
// domain/models/index.ts
export { User, UserId } from "./user";
export { Order, OrderId, OrderStatus } from "./order";

// domain/index.ts
export * from "./models";
export * from "./errors";
```

Barrels give you three benefits:

1. **Encapsulation** — internal file structure can change without breaking imports elsewhere.
   You can split `user.ts` into `userTypes.ts` and `userBranded.ts` and only update the
   barrel — every consumer's import stays the same.
2. **Discoverability** — a single `index.ts` acts as a table of contents for the module.
   New team members can read the barrel to understand what a layer exposes.
3. **Enforced boundaries** — linting rules (like `eslint-plugin-import`) can restrict
   imports to barrel files only, preventing layers from reaching into each other's internals.

### Strict `tsconfig` for Production

A production `tsconfig.json` should enable every strict flag. The `"strict": true` shorthand
enables a family of flags, but there are additional flags worth turning on:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "lib": ["ES2022"],

        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noPropertyAccessFromIndexSignature": true,
        "exactOptionalPropertyTypes": true,
        "noFallthroughCasesInSwitch": true,

        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "outDir": "./dist",
        "rootDir": "./src",

        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "verbatimModuleSyntax": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

Here's what the key strict flags do beyond `"strict": true`:

- **`noUncheckedIndexedAccess`** — adds `| undefined` to index signature access. Without it,
  `record["key"]` is typed as `T` even though the key might not exist. With it, you get
  `T | undefined` and must narrow before use.
- **`noPropertyAccessFromIndexSignature`** — forces bracket notation for index signature
  properties (`obj["key"]` instead of `obj.key`), making it clear you're accessing a
  dynamic key.
- **`exactOptionalPropertyTypes`** — distinguishes between `{ x?: string }` (property
  missing) and `{ x: string | undefined }` (property present but undefined). This catches
  subtle bugs where `undefined` is explicitly assigned to an optional property.
- **`isolatedModules`** — ensures each file can be transpiled independently, which is
  required by tools like esbuild, swc, and Babel that process files one at a time.

### How the Layers Connect

The dependency rule is simple: **imports flow downward only**.

```typescript
// ✅ api/ imports from services/ and domain/
import { createUser } from "../services";
import { User } from "../domain";

// ✅ services/ imports from domain/ and infrastructure/
import { UserId, ValidationError } from "../domain";
import { UserRepository } from "../infrastructure";

// ✅ domain/ imports from nothing (or only other domain files)
// ❌ domain/ must NEVER import from services/, api/, or infrastructure/
```

The domain layer's independence is what makes the architecture powerful. Your `User` type,
your `Result<T, E>`, your branded `UserId` — these are pure TypeScript with no runtime
dependencies. They can be shared across the entire codebase, tested in isolation, and even
published as a separate package in a monorepo.

## Common Pitfalls

- **Circular barrel exports.** If `domain/index.ts` re-exports from `models/index.ts` and
  `models/user.ts` imports from `domain/index.ts`, you create a circular dependency. The
  rule: files within a folder import from siblings directly, never from their own barrel.

- **Barrels that re-export everything.** Using `export * from "./internal"` can accidentally
  expose implementation details. Prefer named re-exports (`export { User, UserId }`) so the
  public API is explicit and intentional.

- **Skipping strict flags "for now."** Teams often start with `"strict": false` planning to
  enable it later. Retrofitting strict mode onto an existing codebase is painful — hundreds
  of errors appear at once. Start strict from day one and you'll never have to migrate.

- **Upward dependencies.** The moment your domain layer imports from `services/` or `api/`,
  the architecture collapses. Use dependency injection (interfaces in the domain, concrete
  implementations in infrastructure) to invert the dependency when a lower layer needs
  something from above.

- **Over-layering.** Not every project needs four layers. A small CLI tool might only need
  `domain/` and `services/`. Add layers when complexity demands it, not because a diagram
  says so.

## Key Takeaways

- Layered architecture separates concerns into domain, service, API, and infrastructure
  layers with a strict downward-only dependency rule.
- Barrel exports (`index.ts` re-export files) create clean module boundaries, hide internal
  structure, and make refactoring safe.
- A strict `tsconfig` with flags like `noUncheckedIndexedAccess` and
  `exactOptionalPropertyTypes` catches entire categories of bugs that `"strict": true`
  alone misses.
- The domain layer should have zero external dependencies — it defines the vocabulary of
  your application using pure TypeScript types, interfaces, and branded types.
- These three patterns — layers, barrels, and strict config — form the foundation of every
  production TypeScript project. The remaining capstone tasks will build on this architecture.

<div class="hint">
You can enforce layer boundaries automatically using ESLint's
`eslint-plugin-import` with the `no-restricted-paths` rule. Configure it to forbid
`domain/` from importing anything in `services/`, `api/`, or `infrastructure/`. This
turns your architectural rules into compile-time errors — no code review required.
</div>

<div class="hint">
The `"verbatimModuleSyntax"` flag (TypeScript 5.0+) replaces the older
`"importsNotUsedAsValues"` and `"preserveValueImports"` flags. It enforces that
`import type` is used for type-only imports and that the emitted JavaScript preserves
exactly what you wrote. This is especially important when using bundlers that don't
run the full TypeScript compiler.
</div>
