# Assertion Functions Exercise

Practice writing assertion functions that throw on invalid input and narrow types for
subsequent code.

## Instructions

1. Implement `assertDefined<T>` — a generic assertion function that takes a value of type
   `T | null | undefined` and a `name` string. If the value is `null` or `undefined`, throw
   an `Error` with the message `"<name> must be defined"`. Otherwise, the value is narrowed
   to `T`.

2. Implement `assertIsString` — takes `unknown` and throws an `Error` with the message
   `"Expected string, got <typeof value>"` if the value is not a string. After the call,
   the value is narrowed to `string`.

3. Implement `assertPositive` — takes a `number` and throws an `Error` with the message
   `"Expected positive number, got <value>"` if the number is not greater than zero.
   After the call, the value is narrowed to `number`.

4. Implement `safeTrim` — takes a `string | null | undefined`, uses `assertDefined` to
   validate it, then returns the trimmed string.

## Example

```typescript
assertDefined("hello", "input");  // OK, no throw
assertDefined(null, "input");     // throws Error("input must be defined")

assertIsString("hi");   // OK
assertIsString(42);     // throws Error("Expected string, got number")

assertPositive(5);      // OK
assertPositive(-1);     // throws Error("Expected positive number, got -1")

safeTrim("  hello  ");  // "hello"
safeTrim(null);         // throws Error("value must be defined")
```

<div class="hint">
Assertion functions use the `asserts param is Type` return type. They don't return a value —
they either throw or succeed. Use `typeof` to check the actual type of `unknown` values.
</div>
