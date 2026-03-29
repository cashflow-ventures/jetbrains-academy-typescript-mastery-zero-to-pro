# Union Types Exercise

Time to practice working with union types. You'll write functions that accept values of multiple
types and use narrowing to handle each type correctly.

## Instructions

1. Implement `stringify` — it takes a `value` parameter of type `string | number | boolean` and
   returns a `string`. If the value is a string, return it as-is. If it's a number, return it
   with exactly 2 decimal places (e.g., `"3.14"`). If it's a boolean, return `"yes"` for `true`
   or `"no"` for `false`.

2. Implement `addOrConcat` — it takes two parameters `a` and `b`, both of type `string | number`.
   If both are numbers, return their sum (a number). If either is a string, concatenate them
   as strings (return a string). The return type should be `string | number`.

3. Implement `getLength` — it takes a `value` parameter of type `string | number[]` and returns
   a `number`. Return the length of the string or the length of the array.

4. Export all three functions.

## Example

```typescript
stringify("hello");   // returns "hello"
stringify(3.14159);   // returns "3.14"
stringify(true);      // returns "yes"

addOrConcat(1, 2);       // returns 3
addOrConcat("a", "b");   // returns "ab"
addOrConcat("a", 1);     // returns "a1"

getLength("hello");      // returns 5
getLength([1, 2, 3]);    // returns 3
```

<div class="hint">
Use `typeof` to narrow union types. For `addOrConcat`, check if both values are numbers first —
if either one is a string, convert both to strings with `String()` and concatenate.
</div>
