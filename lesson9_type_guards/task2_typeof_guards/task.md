# typeof Guards

The `typeof` operator is the simplest and most common way to narrow types in TypeScript.
When you check `typeof x === "string"`, TypeScript narrows the type of `x` to `string`
inside that branch.

## Instructions

1. Implement `formatValue` — it takes a `string | number` and returns a formatted string.
   If the value is a string, return it wrapped in double quotes (e.g., `"hello"` → `'"hello"'`).
   If the value is a number, return it with exactly 2 decimal places (e.g., `42` → `"42.00"`).

2. Implement `add` — it takes two parameters, each of type `string | number`.
   If both are numbers, return their numeric sum.
   If both are strings, return them concatenated with a space between.
   If they are mixed types, convert both to strings and concatenate with a space.

3. Implement `describeType` — it takes a value of type `string | number | boolean | undefined`
   and returns a description string:
   - string → `"string: <value>"`
   - number → `"number: <value>"`
   - boolean → `"boolean: <value>"`
   - undefined → `"undefined"`

## Example

```typescript
formatValue("hello");   // '"hello"'
formatValue(3.14159);   // "3.14"

add(1, 2);              // 3
add("hello", "world");  // "hello world"
add("count", 5);        // "count 5"

describeType("hi");     // "string: hi"
describeType(42);       // "number: 42"
describeType(true);     // "boolean: true"
describeType(undefined); // "undefined"
```

<div class="hint">
Use `typeof x === "string"` and `typeof x === "number"` to narrow union types.
For numbers, `.toFixed(2)` returns a string with exactly 2 decimal places.
</div>
