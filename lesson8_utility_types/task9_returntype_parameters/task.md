# ReturnType, Parameters, and ConstructorParameters

Sometimes you need to extract the return type of a function or the types of its parameters
without manually duplicating them. TypeScript provides three utility types for this:
`ReturnType<T>`, `Parameters<T>`, and `ConstructorParameters<T>`.

## Core Concept

```typescript
// Simplified definitions (using infer)
type ReturnType<T extends (...args: any) => any> =
    T extends (...args: any) => infer R ? R : any;

type Parameters<T extends (...args: any) => any> =
    T extends (...args: infer P) => any ? P : never;

type ConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never;
```

All three use the `infer` keyword inside a conditional type to extract part of a function's
signature. You will learn how `infer` works in detail in the Conditional Types lesson — for now,
focus on how to use these utilities.

## How It Works

### ReturnType — extract what a function returns

```typescript
function createUser(name: string, age: number) {
    return { id: Math.random(), name, age, createdAt: new Date() };
}

// Instead of manually writing the return type:
type User = ReturnType<typeof createUser>;
// { id: number; name: string; age: number; createdAt: Date }
```

This is especially useful when a function returns a complex object and you want to reference
that shape elsewhere without duplicating it.

### Parameters — extract the argument types as a tuple

```typescript
function sendEmail(to: string, subject: string, body: string): void {
    // ...
}

type EmailArgs = Parameters<typeof sendEmail>;
// [to: string, subject: string, body: string]

// Use it to create a wrapper with the same signature
function logAndSend(...args: EmailArgs): void {
    console.log("Sending email to:", args[0]);
    sendEmail(...args);
}
```

`Parameters<T>` returns a **tuple type** matching the function's parameter list.

### ConstructorParameters — extract constructor argument types

```typescript
class Database {
    constructor(
        public host: string,
        public port: number,
        public name: string
    ) {}
}

type DbArgs = ConstructorParameters<typeof Database>;
// [host: string, port: number, name: string]

function createDatabase(...args: DbArgs): Database {
    return new Database(...args);
}
```

Note the use of `typeof Database` — you need the constructor type (the class itself), not
an instance type.

### Combining with other utilities

These types compose well with indexed access:

```typescript
function processOrder(id: number, items: string[], priority: boolean) {
    return { id, items, priority, total: items.length * 10 };
}

// Get just the second parameter type
type ItemsParam = Parameters<typeof processOrder>[1];
// string[]

// Get the return type and make it readonly
type OrderResult = Readonly<ReturnType<typeof processOrder>>;
```

## Common Pitfalls

- **`typeof` is required for named functions**: `ReturnType<createUser>` is an error.
  You need `ReturnType<typeof createUser>` because the type parameter expects a type, not a value.
- **Overloaded functions**: For overloaded functions, `ReturnType` and `Parameters` use the
  **last** overload signature. This can be surprising if overloads have different return types.
- **Generic functions lose their generics**: `ReturnType<typeof identity>` where
  `identity` is `<T>(x: T) => T` resolves to `unknown`, not `T`. The generic parameter
  is not preserved.

## Key Takeaways

- `ReturnType<T>` extracts the return type of a function type `T`.
- `Parameters<T>` extracts the parameter types as a tuple.
- `ConstructorParameters<T>` extracts constructor parameter types.
- Always use `typeof` when passing a named function or class.
- These utilities keep your code DRY by deriving types from existing functions.

<div class="hint">
There is also `InstanceType<T>` which extracts the instance type from a constructor type.
`InstanceType<typeof Database>` gives you `Database` — useful when working with class
references stored in variables.
</div>
