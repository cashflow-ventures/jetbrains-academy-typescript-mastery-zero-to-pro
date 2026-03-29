# The `infer` Keyword

The `infer` keyword lets you extract a type from within a larger type structure.
It is like pattern matching for types — you describe the shape you expect, mark
the part you want to capture with `infer`, and TypeScript fills it in for you.

## Core Concept

The `infer` keyword can only appear in the `extends` clause of a conditional type.
It introduces a new type variable that TypeScript infers from the matched structure:

```typescript
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type A = ReturnOf<() => string>;        // string
type B = ReturnOf<(x: number) => boolean>; // boolean
```

Here, `infer R` tells TypeScript: "If `T` is a function, figure out what the return
type is and call it `R`." The inferred `R` is then available in the true branch.

## How It Works

### Extracting Function Return Types

The most common use of `infer` is extracting parts of function types. TypeScript's
built-in `ReturnType<T>` is implemented exactly this way:

```typescript
type ReturnType<T extends (...args: any) => any> =
    T extends (...args: any) => infer R ? R : any;
```

The pattern `(...args: any) => infer R` matches any function shape and captures
the return type as `R`.

### Extracting Function Parameters

You can also extract parameter types:

```typescript
type FirstParam<T> = T extends (first: infer P, ...rest: any[]) => any
    ? P
    : never;

type A = FirstParam<(name: string, age: number) => void>;  // string
type B = FirstParam<() => void>;                             // never
```

The `infer P` captures the type of the first parameter. If the function has no
parameters, the pattern does not match and the result is `never`.

### Unwrapping Container Types

`infer` excels at peeling away wrapper types to get at the inner type:

```typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnpackPromise<Promise<string>>;   // string
type B = UnpackPromise<Promise<number[]>>; // number[]
type C = UnpackPromise<string>;            // string (not a Promise, return as-is)
```

```typescript
type ElementType<T> = T extends (infer E)[] ? E : T;

type A = ElementType<number[]>;    // number
type B = ElementType<string[]>;    // string
type C = ElementType<boolean>;     // boolean (not an array, return as-is)
```

The pattern `(infer E)[]` matches any array type and captures the element type.
When `T` is not an array, the false branch returns `T` unchanged.

### Multiple `infer` Positions

You can use `infer` multiple times in the same conditional to extract several
parts at once:

```typescript
type FunctionParts<T> = T extends (...args: infer A) => infer R
    ? { args: A; returnType: R }
    : never;

type Parts = FunctionParts<(x: number, y: string) => boolean>;
// { args: [x: number, y: string]; returnType: boolean }
```

### `infer` with Constraints (TypeScript 4.7+)

Since TypeScript 4.7, you can add an `extends` constraint directly on the
inferred type variable:

```typescript
type StringReturn<T> = T extends (...args: any[]) => infer R extends string
    ? R
    : never;

type A = StringReturn<() => "hello">;   // "hello"
type B = StringReturn<() => number>;    // never
```

The `infer R extends string` means "infer R, but only if it extends string."
If the inferred type does not match the constraint, the condition fails.

## Common Pitfalls

- **Using `infer` outside conditional types**: `infer` can only appear in the `extends` clause of a conditional type. Writing `type X = infer T` is a syntax error.
- **Forgetting the false branch**: Always provide a meaningful false branch. Using `never` is common when the pattern does not match, but sometimes returning `T` unchanged (like `UnpackPromise`) is more useful.
- **Over-inferring**: Trying to infer too many parts in a single conditional can make types hard to read. Break complex extractions into smaller helper types.

## Key Takeaways

- `infer` introduces a type variable that TypeScript fills in by pattern matching.
- It can only appear in the `extends` clause of a conditional type.
- Common uses: extracting return types, parameter types, and unwrapping containers.
- You can use multiple `infer` positions in one conditional.
- Since TS 4.7, `infer R extends Constraint` adds a constraint to the inferred variable.

<div class="hint">
Think of `infer` as a "capture group" in a regular expression. Just as a regex like
`/Hello, (.+)!/` captures the name in a greeting, `T extends Promise<infer U>` captures
the inner type of a Promise. The pattern describes the shape, and `infer` marks what
you want to extract.
</div>
