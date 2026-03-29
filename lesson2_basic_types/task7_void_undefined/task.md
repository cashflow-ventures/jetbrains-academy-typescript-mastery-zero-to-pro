# `void` and `undefined`

These two types are closely related but serve different purposes. Understanding the distinction
helps you write clearer function signatures and avoid subtle bugs.

## Core Concept

### `void` — "No Meaningful Return Value"

The `void` type is used as the return type of functions that don't return a meaningful value.
A `void` function may return `undefined` implicitly (by reaching the end) or explicitly
(with a bare `return;`), but the caller should not use the return value.

```typescript
function logMessage(message: string): void {
    console.log(message);
    // implicitly returns undefined
}

function earlyExit(value: number): void {
    if (value < 0) return; // explicit return with no value
    console.log(value);
}
```

### `undefined` — A Specific Type

The `undefined` type represents the actual value `undefined`. When used as a return type,
it means the function explicitly returns `undefined` as a meaningful result.

```typescript
function findUser(id: number): string | undefined {
    const users = ["Alice", "Bob"];
    return users[id]; // returns undefined if id is out of bounds
}

const user = findUser(5);
if (user !== undefined) {
    console.log(user.toUpperCase()); // safe — TypeScript knows it's a string
}
```

## How It Works

The key difference is about **intent**:

- `void` says: "This function performs a side effect. Don't use its return value."
- `undefined` says: "This function may return `undefined` as a meaningful result."

There's also a subtle but important behavioral difference with callbacks:

```typescript
// void in callback position means "return value is ignored"
type Callback = (value: number) => void;

// This is valid! push returns a number, but void means "we don't care"
const cb: Callback = (n) => [].push(n);

// undefined in callback position means "must return undefined"
type StrictCallback = (value: number) => undefined;

// This would be an error — push returns number, not undefined
// const strictCb: StrictCallback = (n) => [].push(n);
```

This is why `Array.forEach` uses `void` for its callback — it allows you to pass functions
that happen to return a value, because `forEach` ignores the return value anyway.

### Variables of Type `void`

You can declare a variable of type `void`, but it can only hold `undefined`:

```typescript
const nothing: void = undefined; // OK
// const bad: void = null;       // Error in strict mode
// const worse: void = 42;       // Error
```

In practice, you'll rarely type a variable as `void`. It's almost exclusively used for
function return types.

## Common Pitfalls

- **Using `void` when you mean `undefined`.** If a function returns `undefined` as a
  meaningful result (like a lookup that might fail), use `T | undefined`, not `void`.
- **Expecting `void` functions to return exactly `undefined`.** A `void` return type means
  the return value should be ignored, not that it's guaranteed to be `undefined`.
- **Confusing `void` with `never`.** A `void` function completes normally (returning
  `undefined`). A `never` function never completes — it throws or loops forever.

## Key Takeaways

- Use `void` for functions that perform side effects and don't return a meaningful value.
- Use `undefined` (usually as `T | undefined`) when `undefined` is a meaningful return value.
- `void` in callback types means "the return value is ignored" — this allows flexible callback usage.
- `void` variables can only hold `undefined`.
- Don't confuse `void` (completes normally) with `never` (never completes).

<div class="hint">
Here's a quick decision guide for function return types:
- The function logs something or updates state → `void`
- The function might not find what it's looking for → `T | undefined`
- The function always throws an error → `never`
- The function always returns a value → use that specific type
</div>
