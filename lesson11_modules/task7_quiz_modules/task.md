# Quiz: Modules

Choose the correct answer about TypeScript's module system.

## What happens when you use `import type { User } from "./models"` in TypeScript?

Consider the difference between type-level and value-level imports, and what the
TypeScript compiler emits for each.

<div class="hint">
Think about what exists at runtime versus compile time. Types in TypeScript are erased
during compilation — they don't appear in the JavaScript output. How does `import type`
interact with this erasure?
</div>
