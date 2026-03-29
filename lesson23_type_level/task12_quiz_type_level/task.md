# Quiz: Type-Level Programming

Test your understanding of type-level computation, `infer` patterns,
and recursive types.

## How does `UnionToIntersection<U>` convert a union into an intersection?

Think about what happens when you place a type in a function parameter
position and how TypeScript resolves inference from multiple candidates.

<div class="hint">
Consider the difference between covariant and contravariant positions.
Function parameters are contravariant — when TypeScript infers from
multiple candidates in a contravariant position, it produces an
intersection rather than a union.
</div>
