# Enums vs Union Literal Types

TypeScript gives you two ways to represent a fixed set of values: **enums** and **union
literal types**. Both solve the same problem — restricting a value to a known set — but
they differ in runtime behavior, ergonomics, and trade-offs.

## Core Concept

Here's the same concept expressed both ways:

```typescript
// Enum approach
enum StatusEnum {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Pending = "PENDING"
}

// Union literal approach
type StatusUnion = "ACTIVE" | "INACTIVE" | "PENDING";
```

Both give you autocompletion and compile-time checking. The difference is what happens
at runtime.

## How They Compare

### Runtime Existence

Enums generate a JavaScript object. Union types are erased completely:

```typescript
// Enum — exists at runtime
enum Fruit { Apple = "APPLE", Banana = "BANANA" }
console.log(Fruit.Apple);           // "APPLE"
console.log(Object.values(Fruit));  // ["APPLE", "BANANA"]

// Union — gone at runtime
type Veggie = "CARROT" | "BROCCOLI";
// No Veggie object exists — you just use the strings directly
```

### Assignability

Enums are **nominal-ish** — you must use the enum member, not a raw string:

```typescript
enum Color { Red = "RED" }
let c: Color = Color.Red;  // ✅
// c = "RED";              // ❌ Type '"RED"' is not assignable to type 'Color'
```

Union literals accept the raw value directly:

```typescript
type Color = "RED" | "GREEN";
let c: Color = "RED";  // ✅ — no wrapper needed
```

### Iteration and Runtime Reflection

Enums can be iterated at runtime because they're real objects:

```typescript
enum Direction { Up = "UP", Down = "DOWN", Left = "LEFT", Right = "RIGHT" }
const allDirections = Object.values(Direction); // ["UP", "DOWN", "LEFT", "RIGHT"]
```

Union types have no runtime representation. If you need an array of all values, you must
maintain it manually:

```typescript
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
const allDirections: Direction[] = ["UP", "DOWN", "LEFT", "RIGHT"]; // manual duplication
```

### Bundle Size

Enums add code to your bundle. Union types add zero bytes — they're purely compile-time.
For applications with dozens of enums, this can add up.

### Refactoring and Renaming

Enums provide a layer of indirection. If you rename the string value, you only change it
in one place:

```typescript
enum Status { Active = "active" }
// Change to "ACTIVE" — only one edit, all usages still say Status.Active
```

With union types, renaming a value means finding and replacing every occurrence of the
string literal across your codebase.

## When to Use Each

### Prefer Union Literals When:

- You want zero runtime overhead
- The values are simple strings or numbers
- You don't need to iterate over all members at runtime
- You're building a library and want consumers to pass plain strings
- You want the simplest possible approach

### Prefer Enums When:

- You need to iterate over all members at runtime (e.g., populating a dropdown)
- You want reverse mapping (numeric enums only)
- You need a namespace-like grouping for related constants
- The values might change and you want a single point of update
- You're modeling bit flags with bitwise operations

## The `as const` + Object Pattern

There's a middle ground that combines the best of both worlds — a plain object with
`as const`:

```typescript
const Status = {
    Active: "ACTIVE",
    Inactive: "INACTIVE",
    Pending: "PENDING"
} as const;

type Status = typeof Status[keyof typeof Status];
// type Status = "ACTIVE" | "INACTIVE" | "PENDING"
```

This gives you:
- A runtime object you can iterate over (`Object.values(Status)`)
- A union type for type annotations
- No enum-specific quirks
- Tree-shakeable by bundlers

Many TypeScript teams prefer this pattern over enums entirely.

## Common Pitfalls

- **Choosing enums by default.** Enums are a TypeScript-specific feature with quirks.
  Union literals are simpler and more aligned with plain JavaScript.
- **Forgetting that union types can't be iterated.** If you need runtime access to all
  values, you'll need an array or an enum.
- **Mixing approaches inconsistently.** Pick one pattern for your project and stick with
  it. Mixing enums and unions for similar concepts creates confusion.

## Key Takeaways

- Union literal types are simpler, lighter, and erased at compile time.
- Enums provide a runtime object, reverse mapping (numeric), and a single rename point.
- The `as const` object pattern is a popular alternative that offers runtime values plus
  a derived union type.
- Choose based on whether you need runtime reflection — if not, unions are usually enough.

<div class="hint">
The TypeScript documentation itself notes that "in most cases, enums are a perfectly valid
solution. However, sometimes requirements are tighter" — and union types are the tighter
alternative. When in doubt, start with a union and upgrade to an enum only if you need
runtime features.
</div>
