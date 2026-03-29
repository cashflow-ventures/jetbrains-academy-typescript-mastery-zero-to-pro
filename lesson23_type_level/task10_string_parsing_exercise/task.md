# String Parsing Exercise

Implement a type-level `Split` type and runtime string utilities that
mirror the type-level parsing concepts.

## Instructions

1. In `task.ts`, implement the type alias `Split<S, D>` that splits a
   string type `S` on delimiter `D` and produces a tuple of string
   literal types. Empty string input should produce an empty tuple.

2. Implement the function `splitString(str: string, delimiter: string): string[]`
   that splits a string on a delimiter at runtime. Do NOT use
   `String.prototype.split` — implement it manually with a loop or
   recursion using `indexOf`.

3. Implement the function `countOccurrences(str: string, search: string): number`
   that counts how many non-overlapping times `search` appears in `str`.
   Return 0 if `search` is empty.

## Example

```typescript
type T = Split<"a.b.c", ".">;  // ["a", "b", "c"]

splitString("hello-world-foo", "-");  // ["hello", "world", "foo"]
countOccurrences("abcabc", "abc");    // 2
```

<div class="hint">
For `Split`, use the pattern `S extends \`\${infer Head}\${D}\${infer Tail}\``
to match the first delimiter, emit `Head`, and recurse on `Tail`. Base cases:
empty string → `[]`, no delimiter found → `[S]`.
</div>
