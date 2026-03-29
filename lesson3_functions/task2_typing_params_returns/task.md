# Typing Parameters and Returns

Now it's time to practice writing functions with explicit type annotations. You'll create
several small functions, each with clearly typed parameters and return values. This is the
most fundamental skill in TypeScript — getting comfortable with function signatures.

## Instructions

1. Implement the function `toUpperCase` that takes a `text` parameter of type `string` and
   returns the text converted to uppercase (a `string`).

2. Implement the function `square` that takes a `value` parameter of type `number` and
   returns the value multiplied by itself (a `number`).

3. Implement the function `isLong` that takes a `text` parameter of type `string` and a
   `threshold` parameter of type `number`, and returns `true` if the text's length is
   greater than or equal to the threshold, `false` otherwise (a `boolean`).

4. Implement the arrow function `joinWords` that takes `first` of type `string` and `second`
   of type `string`, and returns them joined with a space in between (a `string`).

## Example

```typescript
toUpperCase("hello");          // returns "HELLO"
square(5);                     // returns 25
isLong("TypeScript", 5);      // returns true
isLong("Hi", 5);              // returns false
joinWords("Hello", "World");   // returns "Hello World"
```

<div class="hint">
Use the built-in `.toUpperCase()` method on strings. For `square`, simply multiply the
value by itself. Remember that `string.length` gives you the number of characters.
</div>
