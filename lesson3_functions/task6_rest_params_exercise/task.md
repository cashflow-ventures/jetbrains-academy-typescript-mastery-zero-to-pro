# Rest Parameters Exercise

Practice using rest parameters to build functions that accept a variable number of arguments.
You'll implement a numeric sum, a string joiner, and an object merger — all using typed
rest parameters.

## Instructions

1. Implement the function `sumAll` that accepts any number of `number` arguments using a
   rest parameter and returns their sum. If no arguments are passed, return `0`.

2. Implement the function `joinStrings` that takes a `separator` of type `string` as the
   first parameter, followed by any number of `string` parts as a rest parameter. Return
   all parts joined by the separator.

3. Implement the function `mergeObjects` that accepts any number of
   `Record<string, unknown>` objects as a rest parameter and returns a single merged object.
   Later objects should override properties from earlier ones.

## Example

```typescript
sumAll(1, 2, 3);                    // returns 6
sumAll();                           // returns 0

joinStrings("-", "a", "b", "c");    // returns "a-b-c"
joinStrings(", ", "x", "y");        // returns "x, y"

mergeObjects({ a: 1 }, { b: 2 });           // returns { a: 1, b: 2 }
mergeObjects({ a: 1 }, { a: 2, b: 3 });     // returns { a: 2, b: 3 }
```

<div class="hint">
For `sumAll`, the `.reduce()` method on arrays is perfect — start with an initial value of
`0` and add each number. For `joinStrings`, the built-in `.join()` method on arrays does
exactly what you need. For `mergeObjects`, `Object.assign({}, ...objects)` merges all
objects into a new one.
</div>
