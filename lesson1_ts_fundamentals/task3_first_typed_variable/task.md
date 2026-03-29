# Your First Typed Variable

Time to write some TypeScript! In this exercise you'll practice declaring variables with explicit
type annotations and writing functions with typed parameters and return values. These are the
building blocks of every TypeScript program.

## Instructions

1. In `task.ts`, create a variable called `courseName` of type `string` and assign it the value `"TypeScript Mastery"`.
2. Create a variable called `lessonCount` of type `number` and assign it the value `25`.
3. Create a variable called `isPublished` of type `boolean` and assign it the value `true`.
4. Implement the function `greet` that takes a `name` parameter of type `string` and returns a `string` in the format `"Hello, {name}!"`.
5. Implement the function `add` that takes two `number` parameters (`a` and `b`) and returns their sum.
6. Implement the function `isPositive` that takes a `number` parameter called `value` and returns `true` if the value is greater than zero, `false` otherwise.
7. Export all three variables and all three functions.

## Example

```typescript
greet("Alice");     // returns "Hello, Alice!"
add(2, 3);          // returns 5
isPositive(-1);     // returns false
isPositive(10);     // returns true
```

<div class="hint">
To annotate a variable, place a colon and the type after the variable name:
`const myVar: string = "value";`. For functions, annotate each parameter and the return type:
`function myFunc(param: string): number { ... }`.
</div>
