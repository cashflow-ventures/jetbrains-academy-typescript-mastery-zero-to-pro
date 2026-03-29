# Type-Level Arithmetic

TypeScript has no built-in numeric operations at the type level — you cannot
write `type Sum = 3 + 5`. But you can simulate arithmetic using **tuple lengths**.
By building tuples of a specific length and reading their `"length"` property,
you can perform addition, subtraction, and comparison entirely at compile time.

## Core Concept: Tuple-Length Counting

A tuple's `"length"` property is a numeric literal type:

```typescript
type T = [unknown, unknown, unknown];
type L = T["length"];  // 3

// Build a tuple of length N
type BuildTuple<N extends number, Acc extends unknown[] = []> =
    Acc["length"] extends N ? Acc : BuildTuple<N, [...Acc, unknown]>;

type Five = BuildTuple<5>;          // [unknown, unknown, unknown, unknown, unknown]
type FiveLen = Five["length"];      // 5
```

## Addition

To add two numbers, build tuples for each and spread them together:

```typescript
type Add<A extends number, B extends number> =
    [...BuildTuple<A>, ...BuildTuple<B>]["length"] extends infer S extends number
        ? S
        : never;

type Eight = Add<3, 5>;   // 8
type Ten = Add<7, 3>;     // 10
```

## Subtraction

To subtract, build a tuple of length A and drop B elements from the front:

```typescript
type Subtract<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest]
        ? Rest["length"] extends infer D extends number ? D : never
        : never;

type Three = Subtract<8, 5>;  // 3
type Zero = Subtract<5, 5>;   // 0
```

The pattern `[...BuildTuple<B>, ...infer Rest]` matches the first B elements
and captures the remainder. If A < B, the match fails and returns `never`.

## Comparison

```typescript
type IsGreaterOrEqual<A extends number, B extends number> =
    BuildTuple<A> extends [...BuildTuple<B>, ...infer _] ? true : false;

type Yes = IsGreaterOrEqual<5, 3>;  // true
type No = IsGreaterOrEqual<2, 7>;   // false
```

## Practical Limits

Tuple-based arithmetic works for small numbers (typically up to ~999).
Beyond that, you hit TypeScript's recursion depth limit. For most real-world
type-level programming, this range is more than sufficient.

## Key Takeaways

- Tuples encode numbers as their `"length"` property
- `BuildTuple<N>` recursively constructs a tuple of length N
- Addition: spread two tuples together and read the combined length
- Subtraction: pattern-match to drop elements and read the remainder's length
- Practical limit: ~999 due to recursion depth constraints

<div class="hint">
This technique is the foundation of type-level Fibonacci sequences,
factorial computation, and even type-level sorting algorithms. Libraries
like `ts-arithmetic` and `hotscript` use these patterns to provide
full numeric operations at the type level.
</div>
