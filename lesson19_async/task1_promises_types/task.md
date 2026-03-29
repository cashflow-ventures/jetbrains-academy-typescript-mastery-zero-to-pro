# Promise Types

Asynchronous programming is at the heart of modern JavaScript and TypeScript.
Whether you are fetching data from an API, reading files, or waiting on timers,
promises are the foundation. TypeScript adds a powerful layer on top: the
`Promise<T>` generic type, which tells the compiler exactly what value a promise
will resolve to. Understanding how TypeScript types promises — and the subtle
`PromiseLike` interface — is essential for writing safe async code.

## Core Concept

A `Promise<T>` represents an asynchronous computation that will eventually
produce a value of type `T` (or reject with an error). TypeScript's built-in
`Promise<T>` interface is generic, so the compiler tracks the resolved type
through every `.then()` and `.catch()` call:

```typescript
const p: Promise<number> = new Promise((resolve) => {
    setTimeout(() => resolve(42), 100);
});

// TypeScript knows `value` is `number`
p.then((value) => {
    console.log(value.toFixed(2)); // "42.00"
});
```

When you create a `Promise` with `new Promise<T>()`, the `resolve` callback
is typed as `(value: T | PromiseLike<T>) => void`. This means you can resolve
with a plain value or another promise — TypeScript handles both.

## How It Works

### Typing `.then()` Chains

Each `.then()` call returns a new `Promise` whose type is inferred from the
callback's return type. TypeScript tracks this automatically:

```typescript
const result: Promise<string> = Promise.resolve(10)
    .then((n) => n * 2)        // Promise<number>
    .then((n) => n.toString()) // Promise<string>
    .then((s) => s + "!");     // Promise<string>
```

If a `.then()` callback returns a `Promise<U>`, TypeScript unwraps it — the
chain continues with `U`, not `Promise<U>`:

```typescript
function fetchId(): Promise<number> {
    return Promise.resolve(42);
}

function fetchName(id: number): Promise<string> {
    return Promise.resolve(`User_${id}`);
}

// TypeScript infers Promise<string>, not Promise<Promise<string>>
const name: Promise<string> = fetchId().then((id) => fetchName(id));
```

### The `.catch()` Typing Problem

The `.catch()` callback receives `any` by default (not `unknown`), because
the Promise spec predates TypeScript's strict mode. This is a known gap:

```typescript
Promise.resolve(42)
    .then((n) => {
        if (n < 0) throw new Error("negative");
        return n;
    })
    .catch((error) => {
        // `error` is `any` — be careful!
        // Narrow it yourself:
        if (error instanceof Error) {
            console.log(error.message);
        }
    });
```

Always narrow caught errors in `.catch()` just as you would in a `catch` block.

### `PromiseLike<T>` — The Minimal Interface

TypeScript defines `PromiseLike<T>` as a minimal interface with only a `.then()`
method. It represents any "thenable" — an object that behaves like a promise
but may not be a native `Promise`:

```typescript
interface PromiseLike<T> {
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
    ): PromiseLike<TResult1 | TResult2>;
}
```

`Promise<T>` extends `PromiseLike<T>`, so every `Promise` is a `PromiseLike`,
but not every `PromiseLike` is a `Promise`. This matters when writing library
code that should accept any thenable:

```typescript
async function unwrap<T>(thenable: PromiseLike<T>): Promise<T> {
    return thenable;
}
```

### The `Awaited<T>` Utility Type

TypeScript 4.5 introduced `Awaited<T>`, which recursively unwraps `Promise`
and `PromiseLike` types:

```typescript
type A = Awaited<Promise<string>>;              // string
type B = Awaited<Promise<Promise<number>>>;     // number
type C = Awaited<string>;                       // string (non-promise passes through)
type D = Awaited<boolean | Promise<string>>;    // boolean | string
```

`Awaited<T>` is what the `await` keyword uses internally — it is the type you
get when you `await` a value.

## Common Pitfalls

- **Forgetting that `.catch()` receives `any`**: Unlike `catch (e: unknown)` in
  try/catch, `.catch()` callbacks get `any`. Always narrow manually.
- **Double-wrapping promises**: `Promise<Promise<T>>` almost never makes sense.
  If a `.then()` callback returns a promise, TypeScript unwraps it automatically.
- **Ignoring `PromiseLike`**: If you write a library that accepts promises, use
  `PromiseLike<T>` for maximum compatibility with third-party thenables.
- **Not using `Awaited<T>`**: When you need the resolved type of a promise in a
  generic context, `Awaited<T>` is the correct tool — do not try to manually
  unwrap with conditional types.

## Key Takeaways

- `Promise<T>` is a generic type that tracks the resolved value through chains.
- Each `.then()` returns a new `Promise` typed by the callback's return value.
- Returning a `Promise<U>` from `.then()` is automatically unwrapped to `U`.
- `PromiseLike<T>` is the minimal thenable interface — use it in library APIs.
- `Awaited<T>` recursively unwraps promise types, matching `await` behavior.
- `.catch()` receives `any`, not `unknown` — always narrow caught errors.

<div class="hint">
The `Awaited<T>` utility type was added in TypeScript 4.5 specifically to fix
issues with `Promise.all()` and other concurrent methods. Before `Awaited`,
the type signatures for `Promise.all` used complex overloads. Now they use
`Awaited<T>` for clean, recursive unwrapping.
</div>
