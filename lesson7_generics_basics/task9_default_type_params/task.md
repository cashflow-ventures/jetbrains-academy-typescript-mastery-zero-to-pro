# Default Type Parameters

Just like function parameters can have default values, generic type parameters can have
**default types**. This lets callers skip the type argument when the default makes sense,
while still allowing explicit overrides when needed.

## Core Concept

You assign a default type with `= Type` after the type parameter:

```typescript
interface Container<T = string> {
    value: T;
}

// No type argument needed — defaults to string
const greeting: Container = { value: "hello" };

// Explicit override when you need a different type
const count: Container<number> = { value: 42 };
```

Without the default, `Container` would require a type argument every time. The default
makes the common case convenient while keeping the generic flexible.

## How It Works

### Default Types in Functions

Generic functions can also have default type parameters:

```typescript
function createArray<T = string>(length: number, fill: T): T[] {
    return new Array(length).fill(fill);
}

// T is inferred from the argument — defaults rarely matter for functions
const nums = createArray(3, 0);       // T inferred as number
const strs = createArray(3, "x");     // T inferred as string
```

For functions, TypeScript usually infers `T` from the arguments, so defaults are less
impactful. They're most useful for interfaces, type aliases, and classes.

### Default Types in Classes

```typescript
class EventEmitter<T = Record<string, unknown>> {
    private handlers = new Map<string, Array<(data: T) => void>>();

    on(event: string, handler: (data: T) => void): void {
        const list = this.handlers.get(event) ?? [];
        list.push(handler);
        this.handlers.set(event, list);
    }
}

// Uses the default — generic event data
const emitter = new EventEmitter();

// Explicit type for specific event data
const typedEmitter = new EventEmitter<{ userId: string; action: string }>();
```

### Combining Defaults with Constraints

A type parameter can have both a constraint and a default. The default must satisfy
the constraint:

```typescript
interface Serializable {
    toString(): string;
}

function format<T extends Serializable = string>(value: T): string {
    return `[${value.toString()}]`;
}

format("hello");  // T = string (inferred), OK — string extends Serializable
format(42);       // T = number (inferred), OK — number extends Serializable
```

### Multiple Defaults

When you have multiple type parameters, defaults must come after non-default parameters
(just like function parameters):

```typescript
type ApiResponse<T, E = Error> = {
    data: T | null;
    error: E | null;
};

// Only need to specify T — E defaults to Error
const response: ApiResponse<string> = { data: "ok", error: null };

// Override both when needed
const custom: ApiResponse<string, { code: number; message: string }> = {
    data: null,
    error: { code: 404, message: "Not found" },
};
```

## Common Pitfalls

- **Defaults don't override inference.** If TypeScript can infer `T` from the arguments,
  it uses the inferred type, not the default. Defaults only kick in when there's no
  other information.
- **Default must satisfy the constraint.** If you write `<T extends HasId = string>`,
  TypeScript will error because `string` doesn't extend `HasId`.
- **Ordering matters.** Parameters with defaults must come after parameters without
  defaults: `<T, U = string>` is valid, `<T = string, U>` is not.

## Key Takeaways

- Default type parameters use `= Type` syntax: `<T = string>`.
- They make the common case convenient — callers can skip the type argument.
- Defaults are most useful for interfaces, type aliases, and classes.
- For functions, TypeScript usually infers `T` from arguments, making defaults less impactful.
- Defaults must satisfy any constraints on the type parameter.
- Parameters with defaults must come after parameters without defaults.

<div class="hint">
You'll see default type parameters frequently in library code. For example, React's
`useState<S = undefined>()` uses a default so you can write `useState()` without
specifying a type when the initial value is `undefined`. Many utility libraries use
defaults to provide sensible "out of the box" behavior while allowing customization.
</div>
