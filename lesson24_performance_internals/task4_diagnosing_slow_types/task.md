# Diagnosing Slow Types

You know that deep recursion, large unions, and distributive conditionals can slow
the TypeScript compiler. But when your project takes 30 seconds to type-check and
your editor lags on every keystroke, you need more than theory — you need tools that
tell you *exactly* which types are expensive and *where* the checker is spending its
time. TypeScript ships two built-in diagnostic flags and an official trace analysis
tool that together form a complete performance profiling workflow.

## Core Concept

TypeScript provides three complementary tools for diagnosing type-checking
performance:

1. **`--extendedDiagnostics`** — a compiler flag that prints high-level timing
   information: how long the checker, parser, binder, and emitter each took, plus
   memory usage and total type count.
2. **`--generateTrace`** — a compiler flag that writes detailed Chrome-compatible
   trace files showing every type instantiation, check duration, and file-level
   breakdown.
3. **`@typescript/analyze-trace`** — an official npm tool that reads trace files
   and produces a human-readable summary of the most expensive types and files.

The workflow is straightforward: start with `--extendedDiagnostics` to confirm
there's a problem and identify which phase is slow, then use `--generateTrace` to
capture a detailed trace, and finally run `analyze-trace` to pinpoint the exact
types causing the bottleneck.

## How It Works

### Step 1: `--extendedDiagnostics` — The Quick Health Check

This flag adds timing and memory statistics to the compiler output. Run it from
the command line:

```bash
tsc --extendedDiagnostics --noEmit
```

The output looks like this:

```
Files:              142
Lines of Library:   35470
Lines of Definitions: 78234
Lines of TypeScript:  12456
Nodes of TypeScript:  58923
Identifiers:         21345
Symbols:             15678
Types:               8234
Instantiations:      124567
Memory used:         187432K
Assignability cache size: 4523
Identity cache size:  234
Subtype cache size:   1456
Strict subtype cache size: 892
I/O Read time:       0.12s
Parse time:          0.34s
ResolveModule time:  0.08s
ResolveTypeReference time: 0.02s
Program time:        0.58s
Bind time:           0.15s
Check time:          4.82s
Emit time:           0.00s
Total time:          5.55s
```

The key numbers to watch:

- **Check time** — if this dominates total time, you have expensive types. Parse
  and bind times are rarely the bottleneck.
- **Instantiations** — the total number of type instantiations the checker created.
  A healthy project might have 100,000–500,000. Millions suggest runaway generics
  or recursive types.
- **Types** — the total number of unique types. Compare this across builds to spot
  regressions.

If check time is under a second, your types are fine. If it's 5+ seconds, it's
time to dig deeper with `--generateTrace`.

### Step 2: `--generateTrace` — The Detailed Trace

This flag tells the compiler to write Chrome Trace Event format files to a
directory:

```bash
tsc --generateTrace ./trace --noEmit
```

This creates a `trace` directory containing:

```
trace/
├── trace.json       # Main trace file (Chrome DevTools format)
├── types.json       # All type instantiations with IDs and details
```

The `trace.json` file can be opened directly in Chrome DevTools (navigate to
`chrome://tracing` and load the file) or in the online Perfetto UI at
`https://ui.perfetto.dev`. You'll see a flame chart showing:

- **File-level bars** — how long the checker spent on each `.ts` file.
- **Type instantiation events** — individual type evaluations nested inside file
  bars.
- **Check durations** — how long each assignability check or type resolution took.

The `types.json` file maps type IDs to their string representations, so you can
look up what `Type #12345` actually is.

### Reading the Trace in Chrome DevTools

1. Open `chrome://tracing` in Chrome.
2. Click "Load" and select `trace/trace.json`.
3. Look for the widest bars — these are the most expensive operations.
4. Click a bar to see details: the type being checked, the file and line number,
   and the duration in microseconds.
5. Sort by duration to find the top offenders.

Wide bars in the "checkExpression" or "checkSourceFile" categories point directly
to the files and expressions causing slowdowns. Nested bars show which specific
type instantiations are expensive within those expressions.

### Step 3: `@typescript/analyze-trace` — The Automated Summary

Reading raw trace files is powerful but tedious. The TypeScript team provides an
official analysis tool:

```bash
npx @typescript/analyze-trace ./trace
```

This reads the trace directory and prints a ranked summary:

```
Hot Spots
├── src/utils/deep-merge.ts
│   └── DeepMerge<Config, Overrides> — 2,847 instantiations, 1.2s
├── src/types/api-routes.ts
│   └── RouteParams<AllRoutes> — 12,456 instantiations, 3.4s
└── src/models/schema.ts
    └── ValidateSchema<FullSchema> — 892 instantiations, 0.8s
```

The output tells you exactly which types to optimize. The tool also flags:

- Types with unusually high instantiation counts.
- Files where the checker spends disproportionate time.
- Potential infinite recursion patterns.

This is the fastest path from "my build is slow" to "I know which type to fix."

## The Complete Workflow

Here's the practical workflow for diagnosing a slow TypeScript project:

```bash
# 1. Confirm the problem and identify the slow phase
tsc --extendedDiagnostics --noEmit

# 2. If Check time is high, capture a detailed trace
tsc --generateTrace ./trace --noEmit

# 3. Get an automated summary of expensive types
npx @typescript/analyze-trace ./trace

# 4. (Optional) Open trace.json in Chrome DevTools for visual inspection
#    Navigate to chrome://tracing → Load → trace/trace.json

# 5. Fix the identified types, then re-run step 1 to verify improvement
tsc --extendedDiagnostics --noEmit
```

Always measure before and after. The `--extendedDiagnostics` output gives you a
concrete number (check time, instantiation count) to compare against.

## Common Pitfalls

- **Forgetting `--noEmit` when profiling.** Without it, the compiler also runs the
  emitter, which adds time unrelated to type-checking. Always use `--noEmit` to
  isolate checker performance.

- **Profiling in watch mode.** The first compilation in watch mode includes startup
  costs. Subsequent incremental checks are faster but may not reflect the full
  picture. Profile with a clean single-pass build for accurate numbers.

- **Ignoring the `Instantiations` count.** A project with 5 million instantiations
  will be slow regardless of how clever the types are. If the count is high, look
  for types that are instantiated thousands of times — often a generic utility type
  used in a hot loop of mapped or conditional types.

- **Blaming the wrong file.** The trace shows where the checker *spends time*, not
  necessarily where the slow type is *defined*. A type defined in `types.ts` might
  cause slowdowns in `app.ts` where it's instantiated with a complex argument.
  Follow the instantiation chain back to the root cause.

- **Not using `analyze-trace`.** Reading raw `trace.json` in Chrome DevTools is
  useful for deep dives, but `analyze-trace` surfaces the top offenders in seconds.
  Always start with the automated summary.

## Key Takeaways

- Use `--extendedDiagnostics` as a quick health check — watch the Check time and
  Instantiations count to detect regressions early.
- Use `--generateTrace` to capture a detailed trace when you need to identify
  specific expensive types.
- Use `@typescript/analyze-trace` to get a ranked summary of the most expensive
  types without manually reading trace files.
- Always profile with `--noEmit` to isolate type-checking cost from emit cost.
- The workflow is: confirm → trace → analyze → fix → re-measure. Treat it like
  any other performance optimization loop.

<div class="hint">
You can add `--extendedDiagnostics` to your CI pipeline as a performance gate.
Record the Check time and Instantiations count, and fail the build if either
exceeds a threshold. This catches type performance regressions before they reach
production — the same way you'd gate on bundle size or test coverage.
</div>

<div class="hint">
The `--generateTrace` flag was added in TypeScript 4.1. If you're on an older
version, you can still use `--extendedDiagnostics` (available since TypeScript 2.0)
for basic timing info. But the trace files and `analyze-trace` tool are far more
actionable — upgrading TypeScript is worth it for the diagnostics alone.
</div>
