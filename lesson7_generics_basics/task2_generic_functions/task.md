# Generic Functions

Time to write your own generic functions. You'll implement three utility functions that
work with any type while preserving full type safety.

## Instructions

1. In `task.ts`, implement the `identity` function. It takes a value of type `T` and
   returns it unchanged. This is the simplest possible generic function.

2. Implement the `firstElement` function. It takes an array of type `T[]` and returns
   the first element. If the array is empty, return `undefined`.

3. Implement the `lastElement` function. It takes an array of type `T[]` and returns
   the last element. If the array is empty, return `undefined`.

4. Implement the `reverseArray` function. It takes an array of type `T[]` and returns
   a new array with the elements in reverse order. Do not modify the original array.

## Example

```typescript
identity(42);              // 42
identity("hello");         // "hello"

firstElement([10, 20, 30]); // 10
firstElement([]);            // undefined

lastElement(["a", "b"]);    // "b"
lastElement([]);             // undefined

reverseArray([1, 2, 3]);    // [3, 2, 1]
```

<div class="hint">
For `firstElement` and `lastElement`, think about array indexing. The first element is
at index `0`, and the last is at index `array.length - 1`. When the array is empty,
accessing these indices returns `undefined` naturally in JavaScript.
</div>

<div class="hint">
For `reverseArray`, remember that `Array.prototype.reverse()` mutates the original array.
To avoid mutation, create a copy first — the spread operator `[...arr]` is a clean way
to do this.
</div>
