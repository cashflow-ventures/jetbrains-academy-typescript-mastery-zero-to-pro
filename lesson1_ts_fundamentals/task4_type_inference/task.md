# Type Inference in Action

TypeScript doesn't always need you to write out every type. It can often figure out the type on its own
by looking at the value you assign. This is called **type inference**, and it's one of the features
that makes TypeScript feel lightweight despite being statically typed.

## Instructions

1. In `task.ts`, implement the function `inferredString` that takes no parameters and returns the string `"TypeScript"`. Do **not** add a return type annotation — let TypeScript infer it.
2. Implement the function `inferredNumber` that takes no parameters and returns the number `42`. Do **not** add a return type annotation.
3. Implement the function `double` that takes a `value` parameter of type `number` and returns `value * 2`. Do **not** add a return type annotation — TypeScript will infer the return type as `number`.
4. Implement the function `joinWords` that takes two parameters `a` and `b`, both of type `string`, and returns them joined with a space (`a + " " + b`). Do **not** add a return type annotation.
5. Implement the function `describeValue` that takes a `label` parameter of type `string` and a `value` parameter of type `number`, and returns a string in the format `"{label}: {value}"`. Do **not** add a return type annotation.
6. Export all functions.

## Example

```typescript
inferredString();              // returns "TypeScript"
inferredNumber();              // returns 42
double(5);                     // returns 10
joinWords("Hello", "World");   // returns "Hello World"
describeValue("Age", 25);     // returns "Age: 25"
```

<div class="hint">
When you assign a value or return an expression, TypeScript infers the type from the expression itself.
For example, `return 42` tells TypeScript the return type is `number` — no annotation needed.
You can hover over a function in your IDE to see what type TypeScript inferred.
</div>
