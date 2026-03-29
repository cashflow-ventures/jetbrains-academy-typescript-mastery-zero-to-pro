# Working with Strings and Numbers

Time to practice with the two most common primitive types. In this exercise you'll write
functions that accept and return specific primitive types, reinforcing the type annotation
skills you learned in the previous task.

## Instructions

1. Implement the function `formatPrice` that takes a `price` of type `number` and a
   `currency` of type `string`, and returns a string in the format `"$29.99"` (currency
   symbol followed by the price fixed to 2 decimal places). Use `toFixed(2)` on the price.

2. Implement the function `initials` that takes a `firstName` of type `string` and a
   `lastName` of type `string`, and returns a string with the first character of each name
   in uppercase, separated by a dot. For example, `initials("john", "doe")` returns `"J.D"`.

3. Implement the function `isEven` that takes a `value` of type `number` and returns a
   `boolean` — `true` if the number is even, `false` otherwise.

4. Implement the function `celsiusToFahrenheit` that takes a `celsius` of type `number`
   and returns the equivalent temperature in Fahrenheit as a `number`. The formula is:
   `F = C × 9/5 + 32`.

## Example

```typescript
formatPrice(29.9, "$");       // returns "$29.90"
formatPrice(100, "€");        // returns "€100.00"
initials("john", "doe");      // returns "J.D"
initials("Alice", "Smith");   // returns "A.S"
isEven(4);                    // returns true
isEven(7);                    // returns false
celsiusToFahrenheit(0);       // returns 32
celsiusToFahrenheit(100);     // returns 212
```

<div class="hint">
`toFixed(2)` returns a string with exactly 2 decimal places. For `initials`, remember that
`"hello"[0]` gives you the first character, and `.toUpperCase()` converts it to uppercase.
</div>
