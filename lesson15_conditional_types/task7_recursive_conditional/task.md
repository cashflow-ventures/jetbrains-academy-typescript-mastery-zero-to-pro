# Recursive Conditional Types

TypeScript allows conditional types to reference themselves, creating recursive
type definitions. This unlocks the ability to transform deeply nested structures
at the type level — making every property readonly, optional, or transformed
all the way down.

## Core Concept

A recursive conditional type calls itself in one of its branches. The recursion
continues until a base case is reached — typically a primitive type or a type
that does not match the recursive pattern:

```typescript
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
```

This reads as: "If `T` is an object, make every property readonly and recursively
apply `DeepReadonly` to each property's type. If `T` is a primitive, return it
unchanged."

## How It Works

### DeepReadonly

The built-in `Readonly<T>` only makes top-level properties readonly. Nested objects
remain mutable. A recursive version fixes this:

```typescript
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

interface Config {
    server: {
        host: string;
        port: number;
    };
    debug: boolean;
}

type FrozenConfig = DeepReadonly<Config>;
// {
//     readonly server: {
//         readonly host: string;
//         readonly port: number;
//     };
//     readonly debug: boolean;
// }
```

The recursion bottoms out when `T[K]` is a primitive (`string`, `number`, etc.),
because primitives do not extend `object`.

### Handling Arrays in Recursive Types

A naive `T extends object` check also matches arrays (since arrays are objects).
To handle arrays specially, check for them before the general object case:

```typescript
type DeepReadonly<T> =
    T extends (infer E)[]
        ? readonly DeepReadonly<E>[]
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
```

This ensures arrays become `readonly` arrays with deeply readonly elements,
rather than being treated as objects with numeric index properties.

### DeepPartial

The same recursive pattern works for making all properties optional at every level:

```typescript
type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type PartialConfig = DeepPartial<Config>;
// {
//     server?: {
//         host?: string;
//         port?: number;
//     };
//     debug?: boolean;
// }
```

### Flattening Nested Arrays

Recursive conditional types can also flatten nested array structures:

```typescript
type Flatten<T> = T extends (infer E)[] ? Flatten<E> : T;

type A = Flatten<number[][][]>;  // number
type B = Flatten<string[]>;      // string
type C = Flatten<boolean>;       // boolean
```

Each recursion peels off one layer of array nesting until a non-array type remains.

### Recursion Depth Limits

TypeScript imposes a recursion depth limit (currently around 50 levels for
instantiation and 1000 for type resolution). In practice, this is rarely an
issue for data structures, but deeply recursive type computations (like
type-level arithmetic) can hit these limits. If you see "Type instantiation
is excessively deep and possibly infinite," you have hit the ceiling.

## Common Pitfalls

- **Forgetting the base case**: Without a non-recursive branch (the primitive check), the type recurses infinitely and TypeScript reports an error.
- **Not handling arrays**: Arrays are objects, so `T extends object` matches them. If you want arrays to remain arrays (not become objects with numeric keys), add an explicit array branch.
- **Functions in objects**: Functions are also objects. If your recursive type should not recurse into function types, add `T extends Function ? T :` before the object branch.
- **Performance**: Very deep or wide recursive types can slow down the compiler. Keep recursion shallow when possible.

## Key Takeaways

- Recursive conditional types reference themselves in a branch to handle nested structures.
- Always provide a base case (typically primitives) to stop the recursion.
- `DeepReadonly` and `DeepPartial` are the most common recursive type patterns.
- Handle arrays explicitly if you want them to stay as arrays.
- TypeScript has recursion depth limits — keep recursive types reasonably shallow.

<div class="hint">
Recursive conditional types follow the same pattern as recursive functions: check a
condition, handle the base case, and recurse on the smaller subproblem. Just as
`function flatten(arr)` checks if elements are arrays and recurses, `type Flatten<T>`
checks if `T` is an array type and recurses on the element type.
</div>
