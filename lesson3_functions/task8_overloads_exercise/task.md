# Function Overloads Exercise

Time to write your own overloaded functions. You'll create functions that accept different
types and return appropriately typed results — the core use case for function overloads.

## Instructions

1. Implement the function `formatValue` with three overloads:
   - `formatValue(value: string): string` — returns the string converted to uppercase
   - `formatValue(value: number): string` — returns the number formatted to 2 decimal places
   - `formatValue(value: Date): string` — returns the date in `"YYYY-MM-DD"` format

2. Implement the function `pickFirst` with two overloads:
   - `pickFirst(items: string[]): string` — returns the first element of a string array
   - `pickFirst(items: number[]): number` — returns the first element of a number array
   - You can assume the arrays are non-empty.

## Example

```typescript
formatValue("hello");                    // returns "HELLO"
formatValue(3.14159);                    // returns "3.14"
formatValue(new Date(2024, 0, 15));      // returns "2024-01-15"

pickFirst(["apple", "banana"]);          // returns "apple"
pickFirst([10, 20, 30]);                 // returns 10
pickFirst([100, 200, 300]);              // returns 100
```

<div class="hint">
For `formatValue`, use `typeof` to check for `string` and `number`, and `instanceof` to
check for `Date`. For the date format, remember that `getMonth()` is zero-based (January
is 0), so add 1. Use `.toString().padStart(2, "0")` to ensure month and day are always
two digits.
</div>

<div class="hint">
For `pickFirst`, check if the array has elements with `items.length > 0`. The implementation
signature accepts `string[] | number[]`, so you'll need to check the type of the first
element to determine the return value for empty arrays — or simply check `items.length`.
</div>
