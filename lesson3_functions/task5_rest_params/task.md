# Rest Parameters

Sometimes a function needs to accept a variable number of arguments. TypeScript's rest
parameters let you collect any number of arguments into a typed array, giving you flexibility
without sacrificing type safety.

## Core Concept

A **rest parameter** uses the `...` spread syntax to collect all remaining arguments into
an array. In TypeScript, you annotate the rest parameter with an array type:

```typescript
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);       // 6
sum(10, 20);         // 30
sum();               // 0 (empty array)
```

The `...numbers: number[]` syntax means "collect all arguments into an array of numbers."
TypeScript ensures every argument passed to `sum` is a `number`.

### Rest Parameters with Leading Parameters

You can combine regular parameters with a rest parameter. The rest parameter must always
be last:

```typescript
function log(level: string, ...messages: string[]): void {
    console.log(`[${level}]`, ...messages);
}

log("INFO", "Server started");
log("ERROR", "Connection failed", "Retrying in 5s");
```

## How It Works

- The rest parameter is always an array, even if zero arguments are passed (it becomes `[]`).
- It must be the last parameter in the function signature.
- TypeScript infers the type of each argument from the rest parameter's element type.

### Typed Rest Parameters with Tuples

For more precise control, you can type rest parameters as tuples:

```typescript
function makePoint(...coords: [number, number]): { x: number; y: number } {
    return { x: coords[0], y: coords[1] };
}

makePoint(10, 20);   // { x: 10, y: 20 }
// makePoint(10);    // Error: Expected 2 arguments
```

This restricts both the count and types of arguments.

### Destructured Parameters

TypeScript also supports destructured object parameters with full type annotations:

```typescript
function createUser({ name, age }: { name: string; age: number }): string {
    return `${name} is ${age} years old`;
}

createUser({ name: "Alice", age: 30 }); // "Alice is 30 years old"
```

You can combine destructuring with default values:

```typescript
function configure({ host = "localhost", port = 3000 }: { host?: string; port?: number } = {}): string {
    return `${host}:${port}`;
}

configure();                    // "localhost:3000"
configure({ port: 8080 });     // "localhost:8080"
```

## Common Pitfalls

- **Putting the rest parameter before other parameters.** The rest parameter must always be
  last: `function bad(...args: number[], extra: string)` is a compile error.
- **Forgetting that rest params are always arrays.** Even with zero arguments, the rest
  parameter is `[]`, not `undefined`. No need to check for `undefined`.
- **Confusing rest parameters with spread syntax.** Rest parameters *collect* arguments into
  an array (in the function definition). Spread syntax *expands* an array into arguments
  (at the call site). They use the same `...` syntax but serve opposite purposes.

## Key Takeaways

- Use `...param: type[]` to accept a variable number of arguments as a typed array.
- Rest parameters must be the last parameter in the function signature.
- Rest parameters are always arrays — even when no arguments are passed.
- Use tuple types with rest parameters for fixed-length, multi-type argument lists.
- Destructured parameters let you accept objects with named, typed properties.

<div class="hint">
Rest parameters pair beautifully with array methods like `.reduce()`, `.map()`, and
`.filter()`. Since the rest parameter is already a typed array, you get full IntelliSense
and type checking on all array operations — no casting needed.
</div>
