# Global Declarations

Sometimes you need to tell TypeScript about values that exist in the **global scope** —
environment variables injected by a bundler, properties added to `window` by a script tag,
or global functions provided by a runtime. The `declare global` construct lets you extend
TypeScript's understanding of the global environment without modifying library code.

## Core Concept

In a module file (any file with `import` or `export`), you can use `declare global` to
add declarations to the global scope:

```typescript
// globals.d.ts (or any module file)
export {}; // makes this a module

declare global {
    const BUILD_VERSION: string;
    const IS_PRODUCTION: boolean;

    function trackEvent(name: string, data: Record<string, unknown>): void;
}
```

After this declaration, `BUILD_VERSION`, `IS_PRODUCTION`, and `trackEvent` are available
everywhere in your project without importing them.

### Augmenting the `Window` Interface

A common use case is adding custom properties to the browser's `window` object:

```typescript
export {};

declare global {
    interface Window {
        analytics: {
            track(event: string, properties?: Record<string, unknown>): void;
            identify(userId: string): void;
        };
        __APP_CONFIG__: {
            apiUrl: string;
            environment: "dev" | "staging" | "production";
        };
    }
}
```

Now TypeScript accepts `window.analytics.track("click", { button: "submit" })` without
errors. This works because TypeScript's `Window` interface supports **declaration merging**
— your additions are merged with the built-in definition.

## How It Works

### Why `declare global` Needs a Module Context

The `declare global` block only works inside a **module** — a file with at least one
`import` or `export`. In a plain script file (no imports/exports), top-level `declare`
statements are already global, so `declare global` is unnecessary:

```typescript
// In a script file (no import/export), this is already global:
declare const API_KEY: string;

// In a module file, you need declare global:
import { something } from "./somewhere";

declare global {
    const API_KEY: string;
}
```

The `export {}` trick turns a file into a module without actually exporting anything,
which is useful when you only want to write global declarations.

### Augmenting Built-in Types

You can extend any global interface, not just `Window`:

```typescript
export {};

declare global {
    interface Array<T> {
        customShuffle(): T[];
    }

    interface String {
        toTitleCase(): string;
    }
}
```

This tells TypeScript that all arrays have a `customShuffle` method and all strings have
`toTitleCase`. Of course, you must also provide the runtime implementation (typically via
prototype extension) — `declare global` only handles the type side.

### Environment-Specific Globals

Different environments provide different globals. Node.js has `process` and `Buffer`,
browsers have `window` and `document`, and bundlers like Webpack inject `__dirname` or
custom defines:

```typescript
// webpack-env.d.ts
export {};

declare global {
    const __DEV__: boolean;
    const __COMMIT_HASH__: string;

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            DATABASE_URL: string;
            API_SECRET: string;
        }
    }
}
```

The `ProcessEnv` augmentation gives you type-safe access to `process.env.NODE_ENV` with
autocomplete and narrowed string literal types.

## Common Pitfalls

- **Forgetting `export {}` in a `.d.ts` file.** Without it, the file is a script and
  `declare global` is a syntax error. Add `export {}` to make it a module.
- **Declaring globals without runtime implementations.** `declare global` only adds types.
  If the runtime value doesn't actually exist, you'll get a runtime error despite no
  TypeScript errors. Make sure the global is actually provided by your environment.
- **Polluting the global scope.** Overusing global declarations makes code harder to
  trace and test. Prefer module imports when possible — reserve `declare global` for
  values that are genuinely global (environment variables, analytics SDKs, polyfills).
- **Conflicting augmentations.** Multiple files can augment the same global interface,
  but conflicting property types will cause errors. Coordinate global declarations in
  a single file when possible.

## Key Takeaways

- `declare global { ... }` extends the global scope from within a module file.
- Use it to type environment variables, `window` properties, and runtime globals.
- The file must be a module (have `import` or `export`) for `declare global` to work.
- Global interface augmentation uses declaration merging — your additions merge with
  existing definitions.
- Always ensure the runtime value actually exists — `declare global` only adds types.

<div class="hint">
A common pattern in React apps is to declare `window.__INITIAL_STATE__` for server-side
rendered data. Using `declare global` to type this property gives you type safety when
hydrating the client-side state from the server's injected data.
</div>

<div class="hint">
If you're using Vite, you can type its `import.meta.env` variables by augmenting the
`ImportMetaEnv` interface in a `.d.ts` file. Each bundler has its own pattern for
environment variable typing — check the bundler's documentation.
</div>
