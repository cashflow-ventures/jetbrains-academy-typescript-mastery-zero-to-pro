# Taming `unknown`

In real-world code, you often receive data whose type you can't predict at compile time —
JSON from an API, user input, or values from a third-party library. The `unknown` type lets
you accept these values safely and forces you to validate them before use.

## Instructions

1. Implement the function `formatValue` that takes a `value` of type `unknown` and returns
   a `string`:
   - If `value` is a `string`, return it as-is.
   - If `value` is a `number`, return it converted to a string using `String(value)`.
   - If `value` is a `boolean`, return `"true"` or `"false"`.
   - For anything else, return `"unknown"`.

2. Implement the function `safeParseInt` that takes a `value` of type `unknown` and returns
   a `number`:
   - If `value` is already a `number`, return it (use `Math.floor` to ensure integer).
   - If `value` is a `string`, parse it with `parseInt(value, 10)`. If the result is `NaN`,
     return `0`.
   - For anything else, return `0`.

3. Implement the function `getLength` that takes a `value` of type `unknown` and returns
   a `number`:
   - If `value` is a `string`, return its `.length`.
   - If `value` is an array (use `Array.isArray`), return its `.length`.
   - For anything else, return `0`.

## Example

```typescript
formatValue("hello");   // returns "hello"
formatValue(42);        // returns "42"
formatValue(true);      // returns "true"
formatValue(null);      // returns "unknown"

safeParseInt(42.7);     // returns 42
safeParseInt("123");    // returns 123
safeParseInt("abc");    // returns 0

getLength("hello");     // returns 5
getLength([1, 2, 3]);   // returns 3
getLength(42);          // returns 0
```

<div class="hint">
Use `typeof` to narrow `unknown` to primitive types: `typeof value === "string"`,
`typeof value === "number"`, `typeof value === "boolean"`. For arrays, use `Array.isArray(value)`.
</div>
