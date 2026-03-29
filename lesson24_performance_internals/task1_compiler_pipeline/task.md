# The TypeScript Compiler Pipeline

Every time you run `tsc`, your TypeScript source code passes through a five-stage pipeline
before JavaScript appears on the other side. Understanding these stages gives you a mental
model for why certain errors appear when they do, why some mistakes are caught instantly in
your IDE while others only surface at build time, and how the compiler transforms your
type-rich `.ts` files into plain `.js` output.

## Core Concept

The TypeScript compiler (`tsc`) processes source code through five sequential phases:

```
Source Code (.ts)
    │
    ▼
┌──────────┐
│  Scanner  │  → Converts raw text into a stream of tokens
└──────────┘
    │
    ▼
┌──────────┐
│  Parser   │  → Builds an Abstract Syntax Tree (AST) from tokens
└──────────┘
    │
    ▼
┌──────────┐
│  Binder   │  → Creates symbols and connects declarations to scopes
└──────────┘
    │
    ▼
┌──────────┐
│  Checker  │  → Performs full type checking against the AST + symbols
└──────────┘
    │
    ▼
┌──────────┐
│  Emitter  │  → Generates JavaScript output (and .d.ts if configured)
└──────────┘
    │
    ▼
Output (.js, .d.ts, .js.map)
```

Each phase has a single responsibility and feeds its output into the next stage.

## How It Works

### 1. Scanner (Lexical Analysis)

The scanner reads raw source text character by character and produces **tokens** — the
smallest meaningful units of the language. For example, the line `const x: number = 42;`
becomes tokens like `const`, `x`, `:`, `number`, `=`, `42`, and `;`.

The scanner doesn't understand structure. It doesn't know that `const x` is a variable
declaration — it just knows these are valid tokens. Syntax errors like unterminated strings
or illegal characters are caught here.

```typescript
// The scanner turns this:
const greeting: string = "hello";

// Into a token stream roughly like:
// [ConstKeyword, Identifier("greeting"), ColonToken,
//  Identifier("string"), EqualsToken, StringLiteral("hello"),
//  SemicolonToken]
```

### 2. Parser (Syntactic Analysis)

The parser consumes the token stream and builds an **Abstract Syntax Tree (AST)** — a tree
data structure that represents the grammatical structure of your program. Each node in the
tree corresponds to a syntactic construct: a variable declaration, a function call, an
if-statement, a type annotation, and so on.

```typescript
// For: const x: number = 42;
// The AST (simplified) looks like:
//
// VariableStatement
//   └─ VariableDeclarationList
//       └─ VariableDeclaration
//           ├─ name: Identifier("x")
//           ├─ type: NumberKeyword
//           └─ initializer: NumericLiteral(42)
```

The AST is the central data structure of the compiler. Every subsequent phase reads from
or annotates the AST. Structural syntax errors (like a missing closing brace or an
unexpected token) are reported during parsing.

### 3. Binder (Scope and Symbol Creation)

The binder walks the AST and creates **symbols** — internal objects that represent named
entities like variables, functions, classes, and interfaces. It also builds a **scope tree**
that tracks which symbols are visible in which parts of the code.

This is where the compiler connects a variable's usage back to its declaration. If you
declare `const x = 10` in one scope and reference `x` in a nested scope, the binder is
what links them together. It also handles:

- Merging declarations (e.g., interface merging, function overloads)
- Flagging duplicate declarations in the same scope
- Setting up the symbol table that the checker will use

### 4. Checker (Semantic Analysis / Type Checking)

The checker is the largest and most complex phase — it's where TypeScript earns its name.
It walks the AST with full knowledge of symbols and scopes, and performs **type checking**:

- Resolves type annotations and infers types where annotations are missing
- Checks assignability (can this value go into that variable?)
- Validates function call signatures, generic constraints, and overload resolution
- Evaluates conditional types, mapped types, and template literal types
- Reports type errors like "Type 'string' is not assignable to type 'number'"

The checker is also what powers your IDE experience. When you hover over a variable and see
its type, or get a red squiggly under a type mismatch, that's the checker running
incrementally via the language service.

```typescript
// The checker catches this:
const count: number = "hello";
//    ~~~~~ Error: Type 'string' is not assignable to type 'number'

// And infers this:
const items = [1, 2, 3]; // Checker infers: number[]
```

### 5. Emitter (Code Generation)

The emitter walks the AST one final time and produces output files. This is where **type
erasure** happens — all type annotations, interfaces, and type aliases are stripped away
because JavaScript has no concept of them. The emitter generates:

- **`.js` files** — your runnable JavaScript, downleveled to the `target` you configured
- **`.d.ts` files** — declaration files preserving your type information for consumers
- **`.js.map` files** — source maps linking generated JS back to original TS

```typescript
// Input (TypeScript):
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Output (JavaScript — types erased):
function greet(name) {
    return `Hello, ${name}!`;
}
```

The emitter also handles downleveling — converting modern syntax (like `async/await` or
optional chaining) to older JavaScript targets when your `tsconfig.json` specifies an
earlier `target`.

## The AST — The Backbone of the Pipeline

The Abstract Syntax Tree deserves special attention because it's the shared data structure
that connects all five phases. The parser creates it, the binder annotates it with symbols,
the checker annotates it with types, and the emitter reads it to produce output.

Every node in the AST has a `kind` property (e.g., `SyntaxKind.VariableDeclaration`), a
position in the source file, and child nodes representing its sub-expressions. You can
explore the AST of any TypeScript code at [ts-ast-viewer.com](https://ts-ast-viewer.com) —
it's an invaluable tool for understanding how the compiler sees your code.

## Common Pitfalls

- **Assuming type errors are syntax errors.** Syntax errors come from the parser (phase 2);
  type errors come from the checker (phase 4). A file can parse perfectly but still have
  dozens of type errors. These are fundamentally different stages.
- **Thinking types exist at runtime.** The emitter erases all types. If you need runtime
  type information, you must use type guards, discriminated unions, or other runtime
  patterns — the compiler won't preserve your `interface` in the output.
- **Ignoring the checker's cost.** The checker is by far the most expensive phase. When
  your build is slow, it's almost always the checker struggling with deeply nested
  conditional types, massive unions, or complex generic inference. We'll cover diagnosing
  this in upcoming tasks.

## Key Takeaways

- The TypeScript compiler has five phases: Scanner → Parser → Binder → Checker → Emitter.
- The scanner tokenizes, the parser builds the AST, the binder creates symbols and scopes.
- The checker performs all type checking — it's the largest and slowest phase.
- The emitter strips types and produces `.js`, `.d.ts`, and source map files.
- The AST is the central data structure shared across all phases.
- Understanding the pipeline helps you reason about when and why errors appear.

<div class="hint">
You can inspect the AST of any TypeScript snippet at
<a href="https://ts-ast-viewer.com">ts-ast-viewer.com</a>. Try pasting a simple variable
declaration and expanding the tree — you'll see exactly the node structure the parser
creates. This is the same tree the checker walks when validating your types.
</div>

<div class="hint">
The checker phase alone accounts for roughly 60-80% of total compilation time in most
projects. When people say "TypeScript is slow," they almost always mean the checker is
doing heavy work — not the scanner, parser, or emitter. Lesson 24's later tasks will
show you how to diagnose and fix this.
</div>
