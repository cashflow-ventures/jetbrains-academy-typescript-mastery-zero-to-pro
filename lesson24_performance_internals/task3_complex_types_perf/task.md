# Complex Types and Compiler Performance

TypeScript's type system is remarkably expressive — you can encode recursive data
structures, distribute conditional types over unions, and build type-level parsers.
But that power comes with a cost. The checker is doing real computational work for
every type it resolves, and certain patterns can push it from milliseconds into
seconds or even cause it to bail out entirely. Understanding *why* some types are
slow is the first step toward writing types that scale.

## Core Concept

The TypeScript checker resolves types by walking the AST and evaluating type
expressions. Most types are cheap: a simple `string`, an interface lookup, even a
generic function call resolve in microseconds. The trouble starts when type
evaluation branches, recurses, or expands combinatorially.

Three patterns dominate compiler slowdowns:

1. **Deep recursion** — types that reference themselves many levels deep.
2. **Exponential union expansion** — conditional types that distribute over unions,
   multiplying the number of branches at each step.
3. **Large union types** — unions with hundreds or thousands of members that the
   checker must iterate over for every assignability check.

TypeScript has built-in safety limits to prevent the checker from running forever,
but hitting those limits means your type either produces an error or silently
collapses to a less precise result.

### The Checker's Internal Limits

The compiler enforces several hard limits:

| Limit | Default | What Happens |
|-------|---------|-------------|
| Type instantiation depth | 50 levels | Error: "Type instantiation is excessively deep and possibly infinite" |
| Conditional type recursion | 50 levels | Same error as above |
| Union constituent count | ~1,000,000 | Unions beyond this are reduced or trigger errors |
| Total type count | ~5,000,000 | Checker may run out of memory |
| Maximum constraint depth | 50 | Constraint resolution stops |

These aren't configurable via `tsconfig.json` — they're hardcoded in the checker
source. When you hit one, the only fix is to restructure your types.

## How It Works

### Deep Recursion: Why Depth Matters

When the checker evaluates a recursive type, it creates a new **type instantiation**
at each level. Each instantiation is a unique type object in memory. A type that
recurses 10 levels deep creates 10 instantiations; one that recurses 50 levels
creates 50. Beyond 50, the checker gives up.

```typescript
// A recursive type that flattens nested arrays
type DeepFlatten<T> = T extends Array<infer U> ? DeepFlatten<U> : T;

// Fine: resolves in a few steps
type A = DeepFlatten<number[][][]>; // number

// Problematic: the checker must recurse once per nesting level.
// With 50+ levels of nesting, it hits the depth limit.
```

The depth limit exists because recursive types can easily become infinite. Consider
a type that accidentally references itself without a proper base case — without the
limit, the checker would loop forever.

### Exponential Blowup: Conditional Types + Unions

This is the most common performance trap. When a conditional type receives a union,
TypeScript **distributes** the conditional over each union member. If you chain
multiple distributive conditionals, the number of type evaluations multiplies:

```typescript
type Process<T> = T extends string ? `str_${T}` : T extends number ? `num_${T}` : T;

// With a union of 3 members, the checker evaluates Process<> 3 times.
// That's fine. But consider:
type A = "a" | "b";
type B = 1 | 2;
type C = true | false;

// A cross-product type built from distributed conditionals:
// If each step distributes over the union, you get |A| × |B| × |C| evaluations.
// 2 × 2 × 2 = 8 — still fine.
// But with larger unions: 50 × 50 × 50 = 125,000 evaluations.
```

Each evaluation creates type instantiations, allocates memory, and runs
assignability checks. At scale, this turns a simple-looking type into a
multi-second compilation bottleneck.

### The 1,000-Union Practical Limit

While the theoretical maximum for union members is much higher, the practical
limit is around **1,000 constituents**. Beyond that, the checker's performance
degrades noticeably because:

- **Assignability checks are O(n).** To check if a value is assignable to a union,
  the checker tries each member in order. A 1,000-member union means up to 1,000
  comparisons per check.
- **Intersection reduction is O(n²).** When unions interact with intersections, the
  checker may need to compare every pair of members.
- **Error messages explode.** A type error involving a 1,000-member union produces
  an unreadable error message listing every member.

```typescript
// Generating a large union from template literals:
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// 10 × 10 = 100 members — fine
type TwoDigit = `${Digit}${Digit}`;

// 10 × 10 × 10 = 1,000 members — at the practical limit
type ThreeDigit = `${Digit}${Digit}${Digit}`;

// 10 × 10 × 10 × 10 = 10,000 members — the checker will struggle
// type FourDigit = `${Digit}${Digit}${Digit}${Digit}`; // Don't do this!
```

TypeScript 5.0+ will produce an error for template literal types that would
generate unions exceeding ~100,000 members: *"Expression produces a union type
that is too complex to represent."* But even well below that threshold, you'll
feel the slowdown.

### How Mapped Types Interact with Performance

Mapped types iterate over every key in a type. When combined with conditional
types and unions, they can amplify the cost:

```typescript
// For each key in T, evaluate a conditional type
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// With a flat object of 10 properties: 10 evaluations — instant.
// With a deeply nested object (5 levels, 10 props each):
// 10 + 10×10 + 10×10×10 + ... evaluations.
// The checker handles this, but it's measurably slower than a shallow Readonly<T>.
```

## Common Pitfalls

- **Unbounded recursive types without tail-call optimization.** TypeScript doesn't
  optimize tail-recursive types the way a runtime optimizes tail calls. Every
  recursion level creates a new instantiation. If your recursive type processes a
  tuple element-by-element, a 100-element tuple means 100 levels of recursion —
  dangerously close to the 50-level limit (or past it, depending on the pattern).
  Use accumulator patterns to keep depth shallow.

- **Template literal types generating huge unions.** It's tempting to use template
  literals to generate every valid CSS color string or every possible route path.
  Each combination creates a union member. Four template slots with 10 options each
  produce 10,000 members — enough to noticeably slow your editor.

- **Distributive conditional types on large unions.** A `type Transform<T> = T extends
  infer U ? ... : never` applied to a 500-member union runs the conditional body
  500 times. If that body itself distributes over another union, you get
  multiplicative blowup.

- **Forgetting that `keyof` produces a union.** `keyof LargeInterface` with 200
  properties creates a 200-member string literal union. Mapping over it with a
  conditional type means 200 conditional evaluations — usually fine, but worth
  knowing when debugging slow types.

- **Deeply nested `Partial`/`Required`/`Readonly` chains.** Each utility type
  creates a new mapped type. `Partial<Required<Readonly<DeepType>>>` forces the
  checker to iterate all keys three times. For large types, flatten the
  transformation into a single mapped type.

## Key Takeaways

- The checker has a hard recursion depth limit of 50 levels — restructure recursive
  types to stay well below it using accumulator patterns.
- Conditional types distribute over unions, creating one evaluation per member.
  Chaining distributive conditionals multiplies the cost exponentially.
- Unions beyond ~1,000 members cause noticeable slowdowns in assignability checks,
  error messages, and IDE responsiveness.
- Template literal types are a common source of accidentally huge unions — count
  the cross-product before combining multiple union slots.
- When a type is slow, the fix is almost always to reduce branching: fewer union
  members, shallower recursion, or non-distributive conditionals (`[T] extends [U]`).

<div class="hint">
You can prevent conditional type distribution by wrapping both sides in a tuple:
`type NoDistribute<T> = [T] extends [string] ? "yes" : "no"`. This forces the
checker to evaluate the union as a whole instead of distributing over each member.
It's the single most effective trick for taming runaway conditional types.
</div>

<div class="hint">
The TypeScript team tracks compiler performance regressions with a benchmark suite.
If you suspect a type is slow, you can measure it yourself using `--generateTrace`
(covered in the next task). The trace shows exactly how many type instantiations
each type creates and how long the checker spends on each file.
</div>
