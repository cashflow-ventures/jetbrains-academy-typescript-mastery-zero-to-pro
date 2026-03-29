# Array Manipulation

Arrays are everywhere in real code. In this exercise you'll practice using typed array
operations — `filter`, `map`, and `reduce` — with proper type annotations. TypeScript
infers the types flowing through these methods, but understanding what's happening under
the hood is key to writing correct, type-safe code.

## Instructions

1. Implement the function `doubleAll` that takes an array of numbers and returns a new
   array where every element is doubled. Use `map`.

2. Implement the function `filterLongStrings` that takes an array of strings and a
   `minLength` number, and returns a new array containing only strings whose length is
   greater than or equal to `minLength`. Use `filter`.

3. Implement the function `sumAll` that takes an array of numbers and returns their sum.
   Use `reduce`. Return `0` for an empty array.

4. Implement the function `getFirstAndLast` that takes an array of strings (with at least
   one element) and returns a tuple `[string, string]` containing the first and last
   elements.

## Example

```typescript
doubleAll([1, 2, 3]);                    // returns [2, 4, 6]
filterLongStrings(["hi", "hello", "hey"], 3); // returns ["hello", "hey"]
sumAll([10, 20, 30]);                    // returns 60
getFirstAndLast(["a", "b", "c"]);        // returns ["a", "c"]
```

<div class="hint">
`reduce` takes a callback and an initial value. For summing numbers, the initial value is `0`:
`arr.reduce((acc, val) => acc + val, 0)`. The type of the accumulator is inferred from the
initial value.
</div>
