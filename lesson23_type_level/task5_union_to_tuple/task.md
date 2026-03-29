# Union to Tuple

Converting a union `A | B | C` into a tuple `[A, B, C]` is one of the most
advanced type-level patterns in TypeScript. It builds on `UnionToIntersection`
and introduces two new techniques: extracting the **last member** of a union
and **recursive accumulation** into a tuple.

## Core Concept

The strategy has three steps:

1. **Extract the last member** of the union using `LastOfUnion<U>`
2. **Remove it** from the union using `Exclude<U, Last>`
3. **Recurse**, prepending the last member to an accumulating tuple
4. **Base case**: when the union is `never` (empty), return the accumulator

## LastOfUnion

To get the last member of a union, we exploit overloaded function inference.
When TypeScript infers from an intersection of functions, it picks the **last**
overload signature:

```typescript
type UnionToIntersection<U> =
    (U extends unknown ? (x: U) => void : never) extends
    (x: infer I) => void ? I : never;

type LastOfUnion<U> =
    UnionToIntersection<
        U extends unknown ? () => U : never
    > extends () => infer Last ? Last : never;
```

**How it works:**

1. `U extends unknown ? () => U : never` distributes the union into function types:
   `(() => A) | (() => B) | (() => C)`
2. `UnionToIntersection` converts this to: `(() => A) & (() => B) & (() => C)`
3. This is an overloaded function — TypeScript picks the **last** signature
4. `extends () => infer Last` extracts the return type of the last overload

## The Full UnionToTuple

```typescript
type UnionToTuple<U, Acc extends unknown[] = []> =
    [U] extends [never]
        ? Acc
        : UnionToTuple<
            Exclude<U, LastOfUnion<U>>,
            [LastOfUnion<U>, ...Acc]
          >;

type T = UnionToTuple<"a" | "b" | "c">;  // ["a", "b", "c"]
```

**Trace for `"a" | "b" | "c"`:**

| Step | U | LastOfUnion\<U\> | Acc |
|------|---|-----------------|-----|
| 1 | `"a" \| "b" \| "c"` | `"c"` | `[]` |
| 2 | `"a" \| "b"` | `"b"` | `["c"]` |
| 3 | `"a"` | `"a"` | `["b", "c"]` |
| 4 | `never` | — | `["a", "b", "c"]` ✓ |

## Important Caveat

The order of elements in the resulting tuple depends on TypeScript's internal
union ordering, which is **not guaranteed** to be stable across compiler versions.
For most practical purposes the order is consistent, but you should not rely on
a specific ordering in production code.

## Key Takeaways

- `LastOfUnion` exploits overloaded function inference to extract one member
- Recursive accumulation builds the tuple one element at a time
- `[U] extends [never]` is the base case check (prevents distribution over `never`)
- Union ordering is implementation-defined — don't depend on exact tuple order

<div class="hint">
The `[U] extends [never]` check wraps both sides in tuples to prevent
distributive behavior. A bare `U extends never` would distribute and
never match, because conditional types distribute over naked type
parameters. Wrapping in `[...]` disables distribution.
</div>
