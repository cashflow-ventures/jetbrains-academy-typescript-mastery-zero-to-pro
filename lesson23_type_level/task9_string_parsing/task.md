# Type-Level String Parsing

Template literal types don't just build strings — they can **parse** them.
By combining template literals with `infer`, you can decompose strings
character by character, split on delimiters, and build recursive parsers
that operate entirely at compile time.

## Core Concept

The key pattern is using `infer` inside a template literal to extract parts:

```typescript
// Extract the first character
type FirstChar<S extends string> =
    S extends `${infer First}${infer _Rest}` ? First : never;

type F = FirstChar<"hello">;  // "h"

// Split on a known delimiter
type BeforeColon<S extends string> =
    S extends `${infer Before}:${infer _After}` ? Before : S;

type B = BeforeColon<"key:value">;  // "key"
```

## Recursive String Parsing

To process an entire string, recurse character by character or chunk by chunk:

```typescript
// Count characters in a string
type StringLength<S extends string, Acc extends unknown[] = []> =
    S extends `${infer _}${infer Rest}`
        ? StringLength<Rest, [...Acc, unknown]>
        : Acc["length"];

type L = StringLength<"hello">;  // 5
```

## Split\<S, Delimiter\>

One of the most useful string parsers splits a string on a delimiter:

```typescript
type Split<S extends string, D extends string> =
    S extends `${infer Head}${D}${infer Tail}`
        ? [Head, ...Split<Tail, D>]
        : S extends ""
            ? []
            : [S];

type Parts = Split<"a.b.c", ".">;  // ["a", "b", "c"]
type Words = Split<"hello world", " ">;  // ["hello", "world"]
type Single = Split<"solo", ".">;  // ["solo"]
```

**How it works:**

1. Try to match `Head + Delimiter + Tail`
2. If matched, emit `Head` and recurse on `Tail`
3. If no delimiter found and string is non-empty, wrap in a single-element tuple
4. Empty string produces an empty tuple

## Practical Applications

Libraries use string parsing types for:

- **Route parsing**: `"/users/:id/posts/:postId"` → `{ id: string; postId: string }`
- **SQL parsing**: `"SELECT name, age FROM users"` → typed column results
- **CSS parsing**: `"margin: 10px 20px"` → structured property types
- **Event names**: `"click.button.primary"` → namespace hierarchy

## Key Takeaways

- Template literal `infer` can decompose strings at the type level
- Recursive patterns process strings character by character or chunk by chunk
- `Split<S, D>` is a fundamental building block for string parsing
- Real-world libraries use these patterns for route typing and DSL parsing

<div class="hint">
When splitting strings, the `infer` in `${infer Head}${D}${infer Tail}`
is greedy from the left — `Head` matches the shortest possible prefix
before the first occurrence of `D`. This is why `Split<"a.b.c", ".">` 
correctly produces `["a", "b", "c"]` rather than `["a.b", "c"]`.
</div>
