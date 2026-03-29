# Quiz: Template Literal Types

Test your understanding of template literal types, union expansion,
intrinsic string manipulation types, and pattern matching with `infer`.

## Which statement about template literal types is correct?

Consider how unions interact with template literal placeholders, the
difference between `Capitalize` and `Uppercase`, whether template
literal types have runtime effects, and how `infer` works in pattern
matching.

<div class="hint">
Think about what happens when you put a union type inside a template
literal placeholder. Does TypeScript pick one member, or does it
expand all combinations? Also consider whether `Capitalize<"hello">`
gives `"Hello"` or `"HELLO"`.
</div>
