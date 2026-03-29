# Awaited and NoInfer

TypeScript includes two more specialized utility types that solve common pain points:
`Awaited<T>` for unwrapping Promise types, and `NoInfer<T>` (TypeScript 5.4+) for controlling
where the compiler infers generic type parameters.

## Core Concept

### Awaited — unwrap Promises recursively

```typescript
// Simplified definition
type Awaited<T> =
    T extends null | undefined ? T :
    T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ?
        F extends ((value: infer V, ...args: infer _) => any) ?
            Awaited<V> : never :
    T;
```

`Awaited<T>` recursively unwraps `Promise` (and `PromiseLike`) types to get the final
resolved value type:

```typescript
type A = Awaited<Promise<string>>;
// string

type B = Awaited<Promise<Promise<number>>>;
// number (unwraps nested promises)

type C = Awaited<string>;
// string (non-promise types pass through unchanged)
```

### NoInfer — prevent inference at a specific site

```typescript
// Simplified: NoInfer<T> = T (but blocks inference)
type NoInfer<T> = intrinsic;
```

`NoInfer<T>` is an identity type at the value level — it does not change the type. But it
tells the compiler **not** to use that position as an inference site for `T`.

## How It Works

### Awaited in practice

Before `Awaited`, extracting the resolved type of a promise was awkward. Now it is built in:

```typescript
async function fetchUser(): Promise<{ id: number; name: string }> {
    return { id: 1, name: "Alice" };
}

// Extract the resolved type without calling the function
type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }
```

`Awaited` is also used internally by `Promise.all`, `Promise.race`, and `Promise.allSettled`
to correctly infer the resolved types of their inputs.

```typescript
async function loadData() {
    const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts(),
    ]);
    // TypeScript uses Awaited internally to infer user and posts types
}

async function fetchPosts(): Promise<string[]> {
    return ["post1", "post2"];
}
```

### NoInfer in practice

Consider a function where you want `T` to be inferred from one argument but not another:

```typescript
// Without NoInfer — T is inferred from BOTH arguments
function createFSM<T extends string>(initial: T, states: T[]): { state: T } {
    return { state: initial };
}

// TypeScript infers T = "idle" | "running" | "stopped" | "error"
// even though "error" was a typo — no compile error!
createFSM("idle", ["idle", "running", "stopped", "error"]);
```

With `NoInfer`, you block inference on the second parameter:

```typescript
function createFSM<T extends string>(initial: T, states: NoInfer<T>[]): { state: T } {
    return { state: initial };
}

type ValidState = "idle" | "running" | "stopped";

// Now T is inferred only from `initial`, and states must match
// createFSM<ValidState>("idle", ["idle", "running", "error"]);
// Error: "error" is not assignable to "idle" | "running" | "stopped"
```

### Another NoInfer example — default values

```typescript
function withDefault<T>(value: T, fallback: NoInfer<T>): T {
    return value ?? fallback;
}

// T is inferred as string from the first argument
withDefault("hello", "default"); // OK
// withDefault("hello", 42);     // Error: number is not assignable to string
```

Without `NoInfer`, TypeScript would infer `T` as `string | number` from both arguments,
which defeats the purpose of the constraint.

## Common Pitfalls

- **`Awaited` on non-thenable types**: `Awaited<number>` is just `number`. It only unwraps
  types that have a `.then()` method.
- **`NoInfer` requires TypeScript 5.4+**: If you are on an older version, `NoInfer` is not
  available. You can approximate it with `T & {}` in some cases, but it is not identical.
- **`NoInfer` does not change the type**: It is purely an inference hint. At runtime and in
  type assignments, `NoInfer<T>` is identical to `T`.

## Key Takeaways

- `Awaited<T>` recursively unwraps Promise types to get the resolved value type.
- Combine `Awaited` with `ReturnType` to extract the resolved type of async functions.
- `NoInfer<T>` prevents the compiler from using a parameter position for type inference.
- Use `NoInfer` when you want `T` inferred from one argument but enforced on another.
- Both are identity types at the value level — they only affect the type checker.

<div class="hint">
`Awaited` was introduced in TypeScript 4.5 and is used internally by the `Promise.all`
type definitions. Before 4.5, library authors had to write their own recursive unwrap types.
</div>
