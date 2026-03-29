# Quiz: Branded and Opaque Types

Test your understanding of branded types, opaque types, structural vs nominal
typing, and when to use each pattern.

## Which statement about branded types in TypeScript is correct?

Consider how branded types achieve compile-time safety, whether they have
runtime overhead, the difference between type aliases and branded types,
and how opaque types compare to branded types.

<div class="hint">
Think about what `string & { readonly __brand: "UserId" }` actually does
at the type level. Does it change the runtime value? Does TypeScript check
type alias names for compatibility, or only structure? And consider whether
`unique symbol` makes a type more or less strict.
</div>
