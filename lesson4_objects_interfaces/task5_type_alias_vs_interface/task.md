# Type Aliases vs Interfaces

You've now seen both inline object types and interfaces. TypeScript offers another way to name
types: the `type` keyword (type aliases). Both `type` and `interface` can describe object shapes,
but they have important differences. Knowing when to use each is a common source of confusion
for TypeScript developers.

## Core Concept

A **type alias** creates a name for any type — not just objects. An **interface** declares the
shape of an object specifically. For object shapes, they look almost identical:

```typescript
// Using a type alias
type PointType = {
    x: number;
    y: number;
};

// Using an interface
interface PointInterface {
    x: number;
    y: number;
}

// Both work the same way
const p1: PointType = { x: 1, y: 2 };
const p2: PointInterface = { x: 3, y: 4 };
```

So when should you use which?

## How It Works

### What Only Type Aliases Can Do

Type aliases can represent **any** type, not just objects:

```typescript
// Union types — interfaces can't do this
type StringOrNumber = string | number;

// Tuple types
type Pair = [string, number];

// Primitive aliases
type ID = string;

// Function types
type Formatter = (value: string) => string;

// Mapped types and conditional types (advanced — covered later)
type Readonly<T> = { readonly [K in keyof T]: T[K] };
```

### What Only Interfaces Can Do

Interfaces support **declaration merging** — defining the same interface name multiple times
merges them into one:

```typescript
interface Window {
    title: string;
}

interface Window {
    scrollY: number;
}

// Window now has both title and scrollY
const win: Window = { title: "App", scrollY: 100 };
```

Type aliases cannot merge. Declaring the same `type` name twice is a compile error:

```typescript
type Window = { title: string };
// type Window = { scrollY: number }; // Error: Duplicate identifier 'Window'
```

### Extending and Combining

Both can be extended, but the syntax differs:

```typescript
// Interface extends interface
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}

// Type alias extends type alias (using intersection)
type AnimalType = { name: string };
type DogType = AnimalType & { breed: string };

// You can mix them — interface extends type, type intersects interface
interface Cat extends AnimalType {
    indoor: boolean;
}
type Bird = Animal & { canFly: boolean };
```

### Performance Consideration

The TypeScript team has noted that interfaces are slightly more performant for the compiler
when checking large codebases, because interface relationships are cached. Intersections (`&`)
are re-evaluated each time. For most projects this difference is negligible, but it's worth
knowing.

## Common Pitfalls

- **Thinking they're completely interchangeable.** For object shapes they're similar, but type
  aliases handle unions, tuples, and primitives that interfaces cannot.
- **Using declaration merging accidentally.** If you define two interfaces with the same name
  in the same scope, they merge silently. This can cause confusing bugs if unintentional.
- **Overusing intersections instead of `extends`.** While `type Dog = Animal & { breed: string }`
  works, `interface Dog extends Animal` gives better error messages when properties conflict.

## Key Takeaways

- Use **interfaces** for object shapes, especially when you might extend them or need merging.
- Use **type aliases** for unions, tuples, primitives, function types, and complex type expressions.
- Both can describe objects; the choice is often a matter of team convention.
- Interfaces support declaration merging; type aliases do not.
- Interfaces use `extends`; type aliases use `&` (intersection) to combine.
- The TypeScript team's general recommendation: prefer `interface` for objects, use `type` for everything else.

<div class="hint">
A common team convention is: "Use `interface` for public API shapes (they give better error
messages and support merging), and `type` for internal utility types, unions, and computed types."
Either way, pick a convention and be consistent across your codebase.
</div>
