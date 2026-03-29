# Writing Declaration Files

Practice writing type declarations for untyped JavaScript code. You'll create TypeScript
functions and types that simulate the patterns used in `.d.ts` files — describing the
shapes of values, functions, and interfaces that a JavaScript library might expose.

## Instructions

1. Export an interface `StringUtils` with the following method signatures:
   - `capitalize(str: string): string` — capitalizes the first letter
   - `reverse(str: string): string` — reverses the string
   - `countWords(str: string): number` — counts words separated by spaces

2. Export a function `createStringUtils` that takes no arguments and returns a
   `StringUtils` object with working implementations of all three methods.

3. Export an interface `MathLib` with:
   - `clamp(value: number, min: number, max: number): number` — clamps value to range
   - `lerp(start: number, end: number, t: number): number` — linear interpolation
   - `isPrime(n: number): boolean` — checks if a number is prime

4. Export a function `createMathLib` that takes no arguments and returns a `MathLib`
   object with working implementations.

5. Export an interface `TypeChecker` with:
   - `isString(value: unknown): boolean`
   - `isNumber(value: unknown): boolean`
   - `getTypeName(value: unknown): string` — returns `"string"`, `"number"`, `"boolean"`, `"object"`, `"undefined"`, `"null"`, or `"function"`

6. Export a function `createTypeChecker` that returns a `TypeChecker` with working
   implementations. For `getTypeName`, return `"null"` for `null` values (not `"object"`).

## Example

```typescript
const str = createStringUtils();
str.capitalize("hello");  // "Hello"
str.reverse("abc");       // "cba"
str.countWords("a b c");  // 3

const math = createMathLib();
math.clamp(15, 0, 10);   // 10
math.lerp(0, 100, 0.5);  // 50
math.isPrime(7);          // true

const checker = createTypeChecker();
checker.isString("hi");       // true
checker.getTypeName(null);    // "null"
```

<div class="hint">
For `capitalize`, use `str.charAt(0).toUpperCase() + str.slice(1)`. Handle the empty
string case — capitalizing an empty string should return an empty string.
</div>

<div class="hint">
For `lerp` (linear interpolation), the formula is `start + (end - start) * t` where
`t` ranges from 0 to 1. At `t = 0` you get `start`, at `t = 1` you get `end`.
</div>
