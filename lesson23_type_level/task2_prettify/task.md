# Prettify\<T\>

When you intersect multiple types with `&`, TypeScript often displays the result
as `A & B & C` in hover tooltips instead of showing the flattened object shape.
The `Prettify` utility forces TypeScript to expand an intersection into a single
flat object type — making it far easier to read during development.

## Instructions

1. In `task.ts`, implement the type alias `Prettify<T>` that takes an object type
   and returns an identical type with all properties expanded into a single flat
   object. Use a mapped type that iterates over `keyof T` and maps each key to
   `T[K]`.

2. Implement the function `prettifyObject<T extends object>(obj: T): Prettify<T>`
   that returns the same object at runtime but typed as `Prettify<T>`. This is a
   no-op at runtime — it only changes the type.

3. Implement the function `mergeAndPrettify<A extends object, B extends object>(a: A, b: B): Prettify<A & B>`
   that merges two objects using `Object.assign` and returns the result typed as
   `Prettify<A & B>`.

## Example

```typescript
type A = { name: string } & { age: number } & { active: boolean };
// Hover shows: { name: string } & { age: number } & { active: boolean }

type B = Prettify<A>;
// Hover shows: { name: string; age: number; active: boolean }

mergeAndPrettify({ x: 1 }, { y: 2 });  // { x: 1, y: 2 }
```

<div class="hint">
`Prettify` is deceptively simple: `{ [K in keyof T]: T[K] }` with an
`& {}` at the end forces the compiler to eagerly evaluate the mapped type.
The `& {}` is the key trick — without it, TypeScript may still show the
unexpanded form.
</div>
