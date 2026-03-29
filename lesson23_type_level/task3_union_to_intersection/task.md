# Union to Intersection

Converting a union type `A | B | C` into an intersection `A & B & C` is one of
the most famous type-level tricks in TypeScript. It exploits a deep property of
the type system: **contravariant inference** in function parameter positions.
Understanding this technique is essential for advanced type-level programming.

## Core Concept

The key insight is that function parameters are in a **contravariant** position.
When TypeScript infers a type from multiple candidates in a contravariant position,
it produces an **intersection** rather than a union.

```typescript
// Step 1: Distribute the union into a union of functions
// A | B  →  ((x: A) => void) | ((x: B) => void)

// Step 2: Infer from the contravariant position
// ((x: A) => void) | ((x: B) => void)  →  infer produces A & B
```

## How It Works

The implementation uses two nested conditional types:

```typescript
type UnionToIntersection<U> =
    (U extends unknown ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;
```

Let's trace through `UnionToIntersection<{ a: 1 } | { b: 2 }>`:

**Step 1 — Distribution:** The outer conditional `U extends unknown ? ... : never`
distributes over the union. Each member `U` is wrapped in a function type:

```
((x: { a: 1 }) => void) | ((x: { b: 2 }) => void)
```

**Step 2 — Contravariant inference:** The result is matched against
`(x: infer I) => void`. TypeScript must find a single `I` that satisfies
both function signatures. The only type that works is the intersection:

```
I = { a: 1 } & { b: 2 }
```

## Why Contravariance?

Variance describes how subtyping flows through type constructors:

- **Covariant** (output position): `Dog extends Animal` → `Producer<Dog> extends Producer<Animal>`
- **Contravariant** (input position): `Dog extends Animal` → `Consumer<Animal> extends Consumer<Dog>`

Function parameters are contravariant. When inferring from a union of functions,
TypeScript needs a type that is assignable to ALL parameter positions — that's
the intersection.

## Practical Uses

```typescript
type UnionToIntersection<U> =
    (U extends unknown ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;

// Merge event handler maps
type Events = { onClick: () => void } | { onHover: () => void };
type AllEvents = UnionToIntersection<Events>;
// { onClick: () => void } & { onHover: () => void }
```

## Key Takeaways

- Contravariant positions (function params) produce intersections when inferred
- `U extends unknown ? (x: U) => void : never` distributes a union into function types
- Inferring from the parameter position collapses the union into an intersection
- This is the foundation for `UnionToTuple` and many advanced patterns

<div class="hint">
This technique was first described by Jcalz on StackOverflow and has become
a standard building block in the TypeScript type-level ecosystem. It works
because TypeScript follows the rules of type theory — contravariant positions
invert the subtyping relationship, turning unions into intersections.
</div>
