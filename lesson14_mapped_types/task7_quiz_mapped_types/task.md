# Quiz: Mapped Types

Test your understanding of mapped type syntax, modifiers, and key remapping.

## Which statement about mapped types is correct?

Consider how the `{ [K in keyof T]: ... }` syntax works, what modifiers do,
how `as` clauses affect keys, and what types you can iterate over.

<div class="hint">
Think about what `?` does after the key bracket, what a plain mapped type preserves,
what `as never` does to a key, and whether `in` is limited to `keyof T` or can
accept any union.
</div>
