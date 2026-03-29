# Callback Typing

Higher-order functions — functions that accept other functions as arguments — are everywhere
in JavaScript. In this exercise, you'll practice typing callbacks with specific signatures
so TypeScript can verify both the callback and the code that calls it.

## Instructions

1. Implement the function `applyToEach` that takes an array of `number` values and a
   `callback` of type `(value: number) => number`. Return a new array where each element
   is the result of calling the callback on the original element.

2. Implement the function `filterStrings` that takes an array of `string` values and a
   `predicate` of type `(str: string) => boolean`. Return a new array containing only the
   strings for which the predicate returns `true`.

3. Implement the function `createMultiplier` that takes a `factor` of type `number` and
   returns a function of type `(value: number) => number`. The returned function should
   multiply its argument by the factor.

4. Implement the function `applyTwice` that takes a `value` of type `string` and a
   `transform` of type `(input: string) => string`. Apply the transform to the value
   twice (pass the result of the first call into the second call) and return the final result.

## Example

```typescript
applyToEach([1, 2, 3], (n) => n * 2);           // returns [2, 4, 6]
filterStrings(["hi", "hello", "hey"], (s) => s.length > 2);  // returns ["hello", "hey"]

const triple = createMultiplier(3);
triple(5);                                        // returns 15

applyTwice("hello", (s) => s + "!");              // returns "hello!!"
```

<div class="hint">
For `applyToEach`, use `.map()` with the callback. For `filterStrings`, use `.filter()`
with the predicate. For `createMultiplier`, return an arrow function that captures `factor`
in its closure. For `applyTwice`, call `transform(transform(value))`.
</div>
