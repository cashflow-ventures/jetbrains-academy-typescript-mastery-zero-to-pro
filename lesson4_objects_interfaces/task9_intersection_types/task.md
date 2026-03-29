# Intersection Types

You've seen how `extends` lets one interface build on another. TypeScript offers another way to
combine types: the **intersection operator** (`&`). While `extends` creates a parent-child
relationship between interfaces, `&` merges any two (or more) types into one that has all
properties from every type involved.

## Core Concept

An intersection type combines multiple types into one. A value of an intersection type must
satisfy **all** of the constituent types simultaneously:

```typescript
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge;

const alice: Person = { name: "Alice", age: 30 }; // Must have both name AND age
```

Think of `&` as "and" — a `Person` is something that has a name **and** has an age.

## How It Works

### Combining Object Types

The most common use of intersections is merging object types. This is especially useful with
type aliases, which don't support `extends`:

```typescript
type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

type SoftDeletable = {
    deletedAt: Date | null;
};

type Article = {
    title: string;
    body: string;
};

// Combine all three into one type
type FullArticle = Article & Timestamped & SoftDeletable;

const article: FullArticle = {
    title: "TypeScript Intersections",
    body: "Intersections combine types...",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
};
```

### Intersections with Interfaces

You can intersect interfaces too, or mix interfaces and type aliases:

```typescript
interface Printable {
    print(): void;
}

interface Loggable {
    log(message: string): void;
}

type PrintableAndLoggable = Printable & Loggable;
```

### Practical Use Case: Mixins

Intersections are great for composing capabilities. Instead of deep inheritance chains, you
can combine small, focused types:

```typescript
type WithId = { id: number };
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type WithSoftDelete = { deletedAt: Date | null; isDeleted: boolean };

// Compose a full entity type
type UserEntity = WithId & WithTimestamps & { name: string; email: string };
type DeletableUser = UserEntity & WithSoftDelete;
```

### Conflicting Properties

When two types in an intersection have the same property name with incompatible types,
the result is `never` for that property — making the type impossible to satisfy:

```typescript
type A = { value: string };
type B = { value: number };
type C = A & B;
// C.value is string & number, which is never — no value can be both string and number
```

This is usually a mistake. If you see `never` appearing in intersection results, check for
property name conflicts.

## Common Pitfalls

- **Confusing `&` with `|`.** Intersection (`&`) means "must have all properties from both types."
  Union (`|`) means "can be either type." They're opposites in a sense.
- **Property conflicts creating `never`.** If two intersected types disagree on a property's type,
  that property becomes `never`. This is a silent error — TypeScript won't warn you until you try
  to create a value.
- **Overusing intersections instead of `extends`.** For simple parent-child relationships,
  `interface Child extends Parent` gives better error messages than `type Child = Parent & { ... }`.

## Key Takeaways

- Intersection types (`&`) combine multiple types into one that has all properties from each.
- Use intersections to compose small, focused types into larger ones.
- Intersections work with both type aliases and interfaces.
- Conflicting property types in an intersection result in `never`.
- Prefer `extends` for simple inheritance; use `&` for flexible composition.

<div class="hint">
Intersections are the type-level equivalent of `Object.assign()` or the spread operator. Just as
`{ ...a, ...b }` merges two objects at runtime, `A & B` merges two types at compile time. The
difference is that intersections are checked by the compiler — you can't accidentally forget a
required property.
</div>
