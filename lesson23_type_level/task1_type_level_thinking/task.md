# Type-Level Thinking

TypeScript's type system is not just a safety net — it is a full programming language
that runs at compile time. In this lesson, you will learn to think of types as programs:
they accept inputs (generic parameters), perform computation (conditional types, mapped
types, recursion), and produce outputs (resolved types). Mastering this mindset unlocks
the most powerful patterns in TypeScript.

## Types as a Programming Language

Every programming language has primitives, variables, conditionals, loops, and functions.
TypeScript's type system has all of these:

| Runtime Concept | Type-Level Equivalent |
|---|---|
| Variables | `type X = ...` |
| Functions | `type F<T> = ...` (generics) |
| Conditionals | `T extends U ? A : B` |
| Pattern matching | `infer` keyword |
| Loops / Recursion | Recursive type aliases |
| Data structures | Tuples, mapped objects |
| Strings | Template literal types |

```typescript
// A "function" that takes a type and returns a type
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false
```

## Compile-Time Computation

Type-level programs execute during compilation — they produce zero runtime overhead.
The compiler resolves every generic, conditional, and recursive type before emitting
JavaScript. This means you can encode complex invariants that are checked statically
and erased completely.

```typescript
// Compile-time string manipulation
type Greeting<Name extends string> = `Hello, ${Name}!`;
type G = Greeting<"World">;  // "Hello, World!"

// Compile-time arithmetic via tuple lengths
type BuildTuple<N extends number, T extends unknown[] = []> =
    T["length"] extends N ? T : BuildTuple<N, [...T, unknown]>;

type Three = BuildTuple<3>;  // [unknown, unknown, unknown]
```

## The Type-Level Toolkit

The building blocks you will use throughout this lesson:

- **Generics** — type-level function parameters (`<T, U>`)
- **Conditional types** — branching logic (`T extends U ? X : Y`)
- **`infer`** — pattern matching and extraction
- **Mapped types** — iteration over object keys
- **Template literal types** — string manipulation at the type level
- **Recursive types** — self-referencing type aliases for unbounded computation
- **Tuple manipulation** — `[...A, ...B]`, indexed access, `T["length"]`

```typescript
// Combining tools: extract all string keys from an object
type StringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type S = StringKeys<User>;  // "name" | "email"
```

## Why Type-Level Programming Matters

Real-world libraries like Zod, tRPC, Prisma, and TanStack Router use type-level
programming to deliver end-to-end type safety. When you define a Zod schema, the
library infers the TypeScript type from it — no duplication. When tRPC defines an
API route, the client automatically knows the request and response types. These
"magic" developer experiences are powered by the techniques in this lesson.

## Key Takeaways

- TypeScript's type system is Turing-complete — it can express any computation
- Type-level programs run at compile time with zero runtime cost
- Generics are functions, conditionals are branches, recursion is looping
- Mastering type-level programming enables library-grade type inference

<div class="hint">
TypeScript's type system was proven Turing-complete in 2017. This means it can
theoretically compute anything — people have built type-level chess engines,
SQL parsers, and even a Brainfuck interpreter entirely in the type system.
In practice, the compiler imposes a recursion depth limit (typically ~1000)
to prevent infinite loops.
</div>
