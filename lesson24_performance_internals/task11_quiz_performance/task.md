# Quiz: Performance and Compiler Internals

Choose the correct answer about the TypeScript compiler pipeline and performance tooling.

## Which phase of the TypeScript compiler pipeline is the most expensive, and why does it matter for performance?

The TypeScript compiler processes source code through five sequential phases:
Scanner → Parser → Binder → Checker → Emitter.

Think about what each phase does:
- The **Scanner** tokenizes raw source text.
- The **Parser** builds an Abstract Syntax Tree (AST).
- The **Binder** creates symbols and scope trees.
- The **Checker** performs type checking and inference.
- The **Emitter** generates `.js`, `.d.ts`, and source maps.

Consider which phase would be most affected by deeply nested conditional types,
large unions, or complex generic inference — and how tools like `--generateTrace`
and `--extendedDiagnostics` help you identify the bottleneck.

<div class="hint">
When you run `tsc --extendedDiagnostics`, the output shows timing for each phase.
In most projects, one phase dominates the total time — often consuming 60-80% of
the entire build. That same phase is what `--generateTrace` and `analyze-trace`
are designed to profile. Think about which phase actually evaluates your types.
</div>
