# Function Type Annotations

Functions are the building blocks of any program, and TypeScript gives you powerful tools to
describe exactly what a function accepts and what it returns. By annotating your function
parameters and return types, you catch mistakes at compile time — before they become runtime bugs.

## Core Concept

In TypeScript, you can annotate three things on a function:

1. **Parameter types** — what each argument must be
2. **Return type** — what the function gives back
3. **The function type itself** — a type expression describing the entire signature

### Parameter and Return Type Annotations

The most common pattern is annotating parameters inline and adding a return type after the
parameter list:

```typescript
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function with the same annotations
const multiply = (x: number, y: number): number => x * y;
```

TypeScript checks that callers pass the right types and that the function body actually returns
the declared type. If you return a `string` from a function declared to return `number`, the
compiler catches it immediately.

### Function Type Expressions

Sometimes you need to describe a function's shape as a standalone type — for example, when
passing callbacks or storing functions in variables. A **function type expression** uses arrow
syntax in the type position:

```typescript
// A type describing a function that takes two numbers and returns a number
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const divide: MathOperation = (a, b) => a / b;
```

Notice that when you assign a function to a variable with a function type, TypeScript infers
the parameter types from the type annotation — you don't need to annotate them again.

### Arrow Functions vs Function Declarations

Both arrow functions and function declarations support the same type annotations. The syntax
differs slightly:

```typescript
// Function declaration
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// Arrow function (explicit return type)
const greetArrow = (name: string): string => `Hello, ${name}!`;

// Arrow function (inferred return type — TS figures out it's string)
const greetInferred = (name: string) => `Hello, ${name}!`;
```

TypeScript can often **infer** the return type from the function body. Explicit return types
are optional but recommended for exported functions and public APIs — they serve as documentation
and catch accidental changes.

## How It Works

When TypeScript encounters a function call, it performs these checks:

- **Argument count**: Are you passing the right number of arguments?
- **Argument types**: Does each argument match the declared parameter type?
- **Return type**: Does the function body return a value matching the declared return type?
- **Usage context**: Is the return value used in a way that's compatible with its type?

```typescript
function formatName(first: string, last: string): string {
    return `${first} ${last}`;
}

formatName("Alice", "Smith");   // OK
// formatName("Alice");          // Error: Expected 2 arguments, got 1
// formatName("Alice", 42);      // Error: number is not assignable to string
```

Function type expressions also work in interfaces and type aliases:

```typescript
interface StringTransformer {
    (input: string): string;
}

const toUpper: StringTransformer = (s) => s.toUpperCase();
```

## Common Pitfalls

- **Forgetting the return type on complex functions.** TypeScript infers return types, but
  complex functions with multiple return paths can infer unexpected union types. Adding an
  explicit return type catches this early.
- **Confusing `=>` in type expressions with arrow functions.** In a type position,
  `(a: number) => string` describes a function type. In a value position, `(a: number) => "hello"`
  is an arrow function. Context matters.
- **Annotating parameters twice.** If a variable already has a function type, you don't need
  to re-annotate the parameters in the implementation:
  ```typescript
  type Greeter = (name: string) => string;
  // No need to annotate `name` again — it's inferred from Greeter
  const greet: Greeter = (name) => `Hi, ${name}!`;
  ```

## Key Takeaways

- Annotate function parameters with `: type` after each parameter name.
- Annotate return types with `: type` after the parameter list.
- Use function type expressions (`(params) => returnType`) to describe function shapes as types.
- TypeScript infers return types automatically, but explicit annotations improve readability.
- Arrow functions and function declarations support the same type annotations.

<div class="hint">
A good rule of thumb: always add explicit return types to exported functions and public APIs.
For local helper functions, letting TypeScript infer the return type is perfectly fine — it
reduces noise without sacrificing safety.
</div>

<div class="hint">
You can also use the `Function` type in TypeScript, but it's essentially the same as
`(...args: any[]) => any` — it disables type checking on the parameters and return value.
Avoid it in favor of specific function type expressions.
</div>
