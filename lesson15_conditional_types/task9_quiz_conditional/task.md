# Quiz: Conditional Types

Test your understanding of conditional types, distribution, the `infer` keyword,
and recursive type patterns.

## Which statement about conditional types is correct?

Consider how distribution works with union types, what `infer` does, how
`never` behaves in distributive contexts, and how recursive conditional
types handle nested structures.

<div class="hint">
Think about what happens when you pass a union to a distributive conditional type,
how `[T] extends [U]` differs from `T extends U`, and what `infer` captures
in a pattern like `T extends Promise<infer U>`.
</div>
