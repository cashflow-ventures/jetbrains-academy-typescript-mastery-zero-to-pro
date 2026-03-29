# Type Narrowing Overview

TypeScript's type system doesn't just check types at declaration — it **tracks how types change**
as your code flows through branches, loops, and assignments. This process is called **type
narrowing**, and it's one of the most powerful features that separates TypeScript from simpler
type checkers. Understanding narrowing is essential for writing code that is both type-safe and
free of unnecessary type assertions.

## Core Concept

When you declare a variable with a union type like `string | number`, TypeScript initially knows
only that the value could be either type. But the moment you write a conditional check, TypeScript
**narrows** the type inside that branch:

```typescript
function printValue(value: string | number): void {
    // Here, value is string | number
    if (typeof value === "string") {
        // Here, TypeScript knows value is string
        console.log(value.toUpperCase());
    } else {
        // Here, TypeScript knows value is number
        console.log(value.toFixed(2));
    }
}
```

This isn't magic — it's **control flow analysis**. The compiler follows every possible execution
path and updates the type of each variable based on the checks it has passed through.

## How It Works

### Control Flow Analysis

TypeScript's compiler builds a **control flow graph** of your code. At every branch point
(`if`, `switch`, ternary, `while`, etc.), it splits the possible types based on the condition:

```typescript
function processInput(input: string | number | boolean): string {
    if (typeof input === "string") {
        return input.trim();           // input: string
    }
    if (typeof input === "number") {
        return input.toString();       // input: number
    }
    return input ? "yes" : "no";       // input: boolean
}
```

After each check eliminates a possibility, the remaining type gets narrower. By the time you
reach the final `return`, TypeScript knows `input` can only be `boolean`.

### Narrowing Techniques

TypeScript recognizes several patterns as narrowing guards:

- **`typeof` checks**: `typeof x === "string"` narrows to `string`
- **`instanceof` checks**: `x instanceof Date` narrows to `Date`
- **`in` operator**: `"name" in obj` narrows to types that have a `name` property
- **Equality checks**: `x === null`, `x !== undefined`
- **Truthiness checks**: `if (x)` eliminates `null`, `undefined`, `0`, `""`, `false`
- **Custom type guards**: Functions returning `param is Type`
- **Assertion functions**: Functions with `asserts param is Type`

Each of these will be covered in detail in the following tasks.

### Assignments Also Narrow

TypeScript re-narrows a variable when you assign to it:

```typescript
let value: string | number;
value = "hello";
// value is now string
console.log(value.toUpperCase()); // OK

value = 42;
// value is now number
console.log(value.toFixed(2)); // OK
```

## Common Pitfalls

- **Narrowing doesn't persist across function boundaries**: If you pass a narrowed variable to
  another function, the called function sees the original declared type, not the narrowed one.
- **Callbacks can invalidate narrowing**: TypeScript can't guarantee that a closure captures the
  narrowed type if the variable might be reassigned before the callback runs.
- **Truthiness narrows out more than you expect**: `if (value)` removes `null`, `undefined`,
  `0`, `""`, `NaN`, and `false`. If `0` or `""` are valid values, use explicit checks instead.
- **Type assertions bypass narrowing**: Using `as` tells the compiler to trust you, skipping
  the safety that narrowing provides. Prefer guards over assertions.

## Key Takeaways

- TypeScript uses control flow analysis to narrow union types inside branches.
- Every `if`, `switch`, and conditional expression is an opportunity for narrowing.
- Multiple narrowing techniques exist: `typeof`, `instanceof`, `in`, equality, truthiness,
  custom guards, and assertion functions.
- Narrowing is compile-time only — it doesn't add runtime overhead.
- Prefer narrowing over type assertions (`as`) for type-safe code.

<div class="hint">
TypeScript's narrowing is smart enough to handle negation too. If you check
`if (typeof x !== "string")`, the `else` branch knows `x` is `string`. The compiler
tracks both the "true" and "false" paths of every condition.
</div>
