# Conditional Types Introduction

Conditional types are one of TypeScript's most powerful features. They let you express
type-level logic — choosing one type or another based on a condition. If mapped types are
the `for` loop of the type system, conditional types are the `if` statement.

## Core Concept

A conditional type follows the familiar ternary syntax from JavaScript, but operates
entirely at the type level:

```typescript
type Result = T extends U ? X : Y;
```

This reads as: "If `T` is assignable to `U`, the result is `X`; otherwise it is `Y`."
The `extends` keyword here is not about class inheritance — it means "is assignable to"
or "is a subtype of."

## How It Works

### Basic Conditional Types

The simplest conditional types check whether a type matches a specific shape:

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
type C = IsString<"hello">;   // true — "hello" extends string
```

The condition `T extends string` is true when `T` is `string` or any string literal type.
String literals like `"hello"` are subtypes of `string`, so they satisfy the condition.

### Choosing Between Types

Conditional types are not limited to returning `true` or `false`. They can return any type:

```typescript
type Wrap<T> = T extends string ? string[] : T extends number ? number[] : T[];

type WrapString = Wrap<string>;   // string[]
type WrapNumber = Wrap<number>;   // number[]
type WrapBool = Wrap<boolean>;    // boolean[]
```

You can chain conditions by nesting ternaries, just like in JavaScript. The first matching
branch wins.

### Using `extends` for Structural Checks

The `extends` check is structural, not nominal. It works with any type shape:

```typescript
type HasLength<T> = T extends { length: number } ? true : false;

type A = HasLength<string>;     // true — strings have .length
type B = HasLength<number[]>;   // true — arrays have .length
type C = HasLength<number>;     // false — numbers don't have .length
```

This is the same structural typing you already know from generics constraints, but now
applied as a branching condition.

### Conditional Types with Generics

Conditional types become truly powerful when combined with generic type parameters:

```typescript
type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type A = TypeName<string>;       // "string"
type B = TypeName<() => void>;   // "function"
type C = TypeName<number[]>;     // "object"
```

This pattern creates a type-level `typeof` operator that maps types to descriptive
string literal types.

### Built-in Conditional Types

TypeScript's standard library uses conditional types extensively. `Exclude` and `Extract`
are both conditional types:

```typescript
// Built-in definitions:
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;

type Numbers = Exclude<string | number | boolean, string>;
// number | boolean

type Strings = Extract<string | number | boolean, string>;
// string
```

Returning `never` from a conditional type effectively removes that branch from a union,
which is how `Exclude` filters out unwanted members.

## Common Pitfalls

- **Confusing `extends` with equality**: `T extends U` means "T is assignable to U", not "T equals U". `"hello" extends string` is true, but `string extends "hello"` is false.
- **Forgetting about `never`**: `never extends anything` is true in a non-distributive context, but `never` distributed over a conditional type produces `never` (the empty union). This catches many people off guard — you will learn more in the distributive types task.
- **Deeply nested ternaries**: Chaining more than 3-4 conditions becomes hard to read. Consider breaking complex conditions into named helper types.

## Key Takeaways

- Conditional types use `T extends U ? X : Y` syntax to branch at the type level.
- `extends` means "is assignable to" — it checks structural compatibility.
- You can chain conditions with nested ternaries for multi-branch logic.
- Returning `never` from a branch removes that type from a union.
- Built-in utilities like `Exclude` and `Extract` are conditional types under the hood.

<div class="hint">
Think of conditional types as the type-level equivalent of JavaScript's ternary operator.
Just as `x instanceof String ? doA() : doB()` branches at runtime, `T extends string ? A : B`
branches at compile time. The key difference is that the "condition" is a type relationship
check (`extends`), not a runtime value check.
</div>
