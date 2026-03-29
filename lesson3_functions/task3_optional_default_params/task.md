# Optional and Default Parameters

Not every function argument is required every time. TypeScript lets you mark parameters as
optional or give them default values, making your functions more flexible while keeping
full type safety.

## Core Concept

TypeScript provides two ways to make parameters non-required:

1. **Optional parameters** — marked with `?` after the parameter name
2. **Default parameters** — assigned a fallback value with `=`

### Optional Parameters

An optional parameter can be omitted by the caller. Inside the function, its type becomes
`T | undefined`:

```typescript
function greet(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}!`;
    }
    return `Hello, ${name}!`;
}

greet("Alice");          // "Hello, Alice!"
greet("Alice", "Dr.");   // "Hello, Dr. Alice!"
```

The `title` parameter has type `string | undefined`. When the caller omits it, its value
is `undefined`.

### Default Parameters

A default parameter has a fallback value that's used when the caller doesn't provide one
(or passes `undefined`):

```typescript
function createUrl(path: string, protocol: string = "https"): string {
    return `${protocol}://${path}`;
}

createUrl("example.com");          // "https://example.com"
createUrl("example.com", "http");  // "http://example.com"
```

Default parameters are always optional from the caller's perspective — you never need to
pass them. But unlike `?` parameters, the value inside the function is never `undefined`
(it falls back to the default).

## How It Works

- **Optional parameters** must come after all required parameters. You can't put a `?`
  parameter before a required one.
- **Default parameters** can technically appear anywhere, but placing them last is the
  convention. TypeScript infers the type from the default value, so you often don't need
  an explicit annotation:

```typescript
function repeat(text: string, times = 3): string {
    // times is inferred as number from the default value 3
    return text.repeat(times);
}
```

- When a default parameter is passed `undefined`, the default value kicks in:

```typescript
repeat("ha", undefined); // same as repeat("ha") — uses default 3
```

- You can combine optional and default parameters in the same function:

```typescript
function formatCurrency(amount: number, currency = "$", decimals?: number): string {
    const fixed = decimals !== undefined ? amount.toFixed(decimals) : amount.toString();
    return `${currency}${fixed}`;
}
```

## Common Pitfalls

- **Putting optional parameters before required ones.** TypeScript won't allow
  `function bad(a?: string, b: number)` — optional parameters must follow required ones.
- **Forgetting to check for `undefined`.** An optional parameter is `T | undefined`. If you
  use it without checking, you might get a runtime error. Default parameters avoid this
  problem entirely.
- **Confusing optional with default.** An optional parameter (`?`) is `undefined` when
  omitted. A default parameter (`= value`) uses the fallback when omitted. They solve
  different problems — use default when you have a sensible fallback, optional when the
  absence of a value is meaningful.

## Key Takeaways

- Use `param?: type` to make a parameter optional (its type becomes `type | undefined`).
- Use `param: type = defaultValue` to provide a fallback value.
- Default parameters infer their type from the default value — no annotation needed.
- Optional parameters must come after required parameters.
- Default parameters are never `undefined` inside the function body.

<div class="hint">
A subtle difference: with `function f(x?: number)`, calling `f()` and `f(undefined)` are
equivalent — `x` is `undefined` in both cases. With `function f(x = 10)`, calling `f()`
and `f(undefined)` both give `x` the value `10`. But `f(undefined)` explicitly triggers
the default, which can be useful when you want to "reset" a parameter to its default in
a wrapper function.
</div>
