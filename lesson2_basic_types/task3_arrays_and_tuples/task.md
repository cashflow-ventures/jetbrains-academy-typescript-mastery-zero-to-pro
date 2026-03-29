# Arrays and Tuples

Arrays are one of the most common data structures in any language. TypeScript gives you two
ways to type them, plus a powerful cousin called a tuple that lets you define arrays with a
fixed number of elements where each position has its own type.

## Core Concept

### Typed Arrays

There are two equivalent syntaxes for typing an array in TypeScript:

```typescript
// Syntax 1: type[]
const numbers: number[] = [1, 2, 3];
const names: string[] = ["Alice", "Bob"];

// Syntax 2: Array<type> (generic syntax)
const scores: Array<number> = [90, 85, 92];
const flags: Array<boolean> = [true, false, true];
```

Both syntaxes are identical in behavior. The `type[]` form is more common and concise. The
`Array<type>` form is useful when the element type is complex (like a union or object type).

TypeScript enforces that every element in the array matches the declared type:

```typescript
const values: number[] = [1, 2, 3];
// values.push("four"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Tuples

A tuple is a fixed-length array where each position has a specific type. Unlike regular arrays,
tuples know exactly how many elements they contain and what type each one is.

```typescript
// A tuple: [string, number]
const person: [string, number] = ["Alice", 30];

// Accessing elements — TypeScript knows the type at each index
const name: string = person[0]; // string
const age: number = person[1];  // number

// Error: not enough elements
// const bad: [string, number] = ["Alice"]; // Error

// Error: wrong type at position
// const wrong: [string, number] = [30, "Alice"]; // Error
```

Tuples are perfect for representing pairs, coordinates, or any fixed-structure data where
position carries meaning.

## How It Works

### Array Type Inference

When you initialize an array with values, TypeScript infers the element type:

```typescript
const inferred = [1, 2, 3];       // inferred as number[]
const mixed = [1, "two", true];   // inferred as (string | number | boolean)[]
```

Notice that a mixed array gets a union type. If you want a tuple instead, you need an explicit
annotation or `as const` (covered in Lesson 5).

### Readonly Arrays and Tuples

You can make arrays and tuples immutable with `readonly`:

```typescript
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);    // Error: Property 'push' does not exist on type 'readonly number[]'
// frozen[0] = 99;    // Error: Index signature in type 'readonly number[]' only permits reading

const point: readonly [number, number] = [10, 20];
// point[0] = 5;      // Error: Cannot assign to '0' because it is a read-only property
```

The `ReadonlyArray<type>` generic is equivalent to `readonly type[]`:

```typescript
const items: ReadonlyArray<string> = ["a", "b", "c"];
// items.push("d"); // Error
```

### Tuple with Optional and Rest Elements

Tuples can have optional elements (with `?`) and rest elements:

```typescript
// Optional third element
const entry: [string, number, boolean?] = ["Alice", 30];

// Rest element — first is string, rest are numbers
const record: [string, ...number[]] = ["scores", 90, 85, 92];
```

## Common Pitfalls

- **Assuming tuples prevent extra elements at runtime.** TypeScript checks tuple length at
  compile time, but at runtime a tuple is just a regular JavaScript array. You can still
  `push()` onto a tuple (unless it's `readonly`).
- **Confusing `number[]` with `[number]`.** The first is an array of any length containing
  numbers. The second is a tuple with exactly one number element.
- **Forgetting that `readonly` arrays lose mutating methods.** Methods like `push`, `pop`,
  `splice`, and `sort` are not available on `readonly` arrays. Use non-mutating methods like
  `map`, `filter`, and `concat` instead.

## Key Takeaways

- Use `type[]` or `Array<type>` to type arrays — both are equivalent.
- Tuples (`[type1, type2]`) define fixed-length arrays with per-position types.
- Use `readonly` to prevent mutations on arrays and tuples.
- TypeScript infers mixed arrays as union types, not tuples.
- Tuples support optional (`?`) and rest (`...type[]`) elements.

<div class="hint">
When should you use a tuple vs an object? Tuples are great for short, positional data like
coordinates `[x, y]` or key-value pairs `[string, number]`. For anything with more than 2-3
elements, an object with named properties is usually more readable.
</div>
