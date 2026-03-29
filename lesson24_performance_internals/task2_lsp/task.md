# tsserver and the Language Server Protocol

Every time you hover over a variable and see its type, press Ctrl+Space for autocomplete,
or click "Go to Definition" — you're not running the full TypeScript compiler. Instead,
your IDE communicates with a long-running process called **tsserver** that keeps a live,
incremental model of your project. Understanding how this works demystifies the "magic"
behind modern IDE features and helps you reason about why some operations feel instant
while others lag.

## Core Concept

TypeScript ships two main entry points: the batch compiler `tsc` (which you run from the
command line) and **tsserver** (which your IDE runs in the background). They share the same
core code — the scanner, parser, binder, checker, and emitter from the
[previous task](course://lesson24_performance_internals/task1_compiler_pipeline/task.ts) —
but tsserver wraps them in a **language service** layer designed for interactive use.

The Language Server Protocol (LSP) is a JSON-RPC protocol that standardizes how editors
talk to language-specific backend processes. Microsoft created LSP alongside VS Code, and
it has since been adopted across dozens of editors. For TypeScript specifically:

- **VS Code** talks to tsserver directly via a custom protocol (predating LSP), though the
  concepts are identical.
- **Other editors** (Neovim, Sublime, Emacs, etc.) use `typescript-language-server`, a thin
  wrapper that translates LSP messages into tsserver commands.
- **WebStorm/IntelliJ** uses its own TypeScript integration that communicates with tsserver.

Regardless of the editor, the architecture is the same: your IDE sends requests ("what's
the type at line 12, column 5?") and tsserver responds with structured data.

## How It Works

### The Language Service Architecture

```
┌─────────────────────────────────────────────┐
│                   IDE / Editor               │
│  (VS Code, WebStorm, Neovim, etc.)          │
└──────────────────┬──────────────────────────┘
                   │  JSON-RPC / custom protocol
                   ▼
┌─────────────────────────────────────────────┐
│                  tsserver                    │
│  ┌───────────────────────────────────────┐  │
│  │         Language Service              │  │
│  │  ┌─────────┐  ┌─────────┐            │  │
│  │  │ Program │  │ Checker │ (on demand) │  │
│  │  └─────────┘  └─────────┘            │  │
│  │  ┌─────────┐  ┌─────────┐            │  │
│  │  │ Scanner │  │ Parser  │            │  │
│  │  └─────────┘  └─────────┘            │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

When your IDE starts, it launches tsserver as a child process. tsserver reads your
`tsconfig.json`, parses all the files in your project, and builds an in-memory **Program**
object — the same data structure `tsc` uses. But unlike `tsc`, tsserver doesn't exit after
one pass. It stays alive, holding the parsed ASTs, symbols, and (lazily) type information
in memory.

### How IDE Features Map to Compiler Phases

Each IDE feature you use triggers a specific language service API call, which in turn
exercises particular phases of the compiler pipeline:

```typescript
// Hover information → getQuickInfoAtPosition()
//   Runs: Parser (for AST position) + Checker (to resolve the type)
const message: string = "hello";
//    ^ Hover here: tsserver asks the checker "what type is this symbol?"

// Autocomplete → getCompletionsAtPosition()
//   Runs: Parser + Binder (scope lookup) + Checker (filter by type)
message.  // ← Cursor here: tsserver lists all string methods

// Go to Definition → getDefinitionAtPosition()
//   Runs: Parser + Binder (follow symbol to its declaration node)

// Error squiggles → getSemanticDiagnostics()
//   Runs: Full checker pass on the file (the most expensive operation)

// Rename symbol → findRenameLocations()
//   Runs: Binder (find all references to the symbol across files)
```

### Incremental Checking — Why Your IDE Feels Fast

The key insight is that tsserver doesn't re-check your entire project on every keystroke.
It uses several strategies to stay responsive:

1. **Lazy type resolution.** The checker doesn't compute every type upfront. It resolves
   types on demand — when you hover, when you trigger autocomplete, or when the editor
   requests diagnostics for the visible file.

2. **File-level caching.** When you edit a file, tsserver re-parses only that file. The
   ASTs and symbols for untouched files remain cached. The checker invalidates type
   information only for files that depend on the changed file.

3. **Debounced diagnostics.** Your IDE doesn't request error squiggles on every keystroke.
   It waits until you pause typing (typically 200-300ms), then asks tsserver for
   diagnostics. This prevents the checker from running mid-word.

4. **Partial program updates.** When a single file changes, tsserver creates a new Program
   object that shares unchanged SourceFile nodes with the previous Program. This structural
   sharing avoids re-parsing the entire project.

```typescript
// Editing this file triggers:
// 1. Re-parse ONLY this file (new AST)
// 2. Create new Program sharing all other file ASTs
// 3. Invalidate cached types for this file + dependents
// 4. On next hover/diagnostic request, re-check only what's needed
```

### The Request/Response Cycle

Here's what happens when you hover over a variable in your editor:

1. **Editor** detects cursor position and sends a `quickinfo` request to tsserver with the
   file path, line number, and column.
2. **tsserver** locates the AST node at that position using the parser's position map.
3. **tsserver** asks the binder for the **symbol** associated with that node.
4. **tsserver** asks the checker to **resolve the type** of that symbol (if not cached).
5. **tsserver** formats the type as a display string and sends it back.
6. **Editor** renders the hover tooltip with the type information.

This entire round-trip typically takes 5-50ms for a warm cache. The first request after
opening a project may take longer because the checker hasn't resolved types yet.

## Common Pitfalls

- **Confusing `tsc` errors with IDE errors.** Your IDE shows errors from tsserver's
  language service, which uses the same checker as `tsc` — but the timing differs. The IDE
  shows errors incrementally as you type, while `tsc` runs a full batch check. Occasionally
  they can disagree if tsserver's cache is stale; restarting the TypeScript server in your
  IDE ("TypeScript: Restart TS Server" in VS Code) fixes this.

- **Thinking the IDE runs `tsc` in the background.** It doesn't. tsserver is a separate
  process with its own in-memory Program. Running `tsc --watch` alongside your IDE means
  you have two independent TypeScript processes, each with its own copy of your project in
  memory.

- **Blaming the editor when TypeScript is slow.** If autocomplete or hover feels sluggish,
  the bottleneck is almost always the checker inside tsserver — not the editor itself. The
  same complex types that slow down `tsc` also slow down your IDE experience. The upcoming
  tasks on performance diagnostics apply equally to tsserver.

- **Ignoring `tsconfig.json` scope.** tsserver uses your `tsconfig.json` to determine which
  files belong to the project. If a file isn't included, tsserver won't provide full
  IntelliSense for it. Misconfigured `include`/`exclude` patterns are a common source of
  "missing" IDE features.

## Key Takeaways

- tsserver is a long-running process that powers all IDE features — hover, autocomplete,
  go-to-definition, error squiggles, and refactoring.
- It uses the same compiler pipeline (scanner, parser, binder, checker) as `tsc`, but
  wrapped in a language service layer optimized for interactive, incremental use.
- The Language Server Protocol (LSP) standardizes editor-to-language-server communication;
  TypeScript's tsserver predates LSP but serves the same role.
- Incremental checking, lazy type resolution, and file-level caching keep the IDE
  responsive even on large projects.
- When your IDE feels slow, the bottleneck is the checker — the same phase that dominates
  `tsc` build times.

<div class="hint">
You can launch tsserver yourself from the command line to see the raw protocol in action.
Run `npx tsserver` and paste JSON requests like
`{"seq":1,"type":"request","command":"open","arguments":{"file":"/path/to/file.ts"}}`.
The responses show exactly what your IDE receives — type strings, diagnostic arrays,
completion lists. It's a great way to peek behind the curtain.
</div>

<div class="hint">
In VS Code, open the Output panel and select "TypeScript" from the dropdown to see the
actual messages flowing between the editor and tsserver. This log shows every request
(completions, hover, diagnostics) and its response time — invaluable for diagnosing
why IntelliSense might feel slow on a particular file.
</div>
