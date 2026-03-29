# Generic Constraints

So far, inside a generic function, `T` could be *anything* — a number, a string, an object,
`null`. That means you can't call any type-specific methods on it. Generic constraints solve
this by telling TypeScript: "T isn't just anything — it must have certain properties."

## Core Concept

You constrain a type parameter using the `extends` keyword:

```typescript
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

getLength("hello");     // 5 — strings have .length
getLength([1, 2, 3]);   // 3 — arrays have .length
// getLength(42);        // Error: number doesn't have .length
```

The constraint `T extends { length: number }` means: "T must be a type that has a
`length` property of type `number`." Strings, arrays, and any object with a `length`
property all qualify. Numbers and booleans don't.

## How It Works

### Constraining to an Interface

You can constrain to any type — including interfaces you've defined:

```typescript
interface HasId {
    id: string;
}

function printId<T extends HasId>(item: T): void {
    console.log(item.id);
}

printId({ id: "abc", name: "Alice" }); // OK — has id
// printId({ name: "Bob" });            // Error: missing id
```

The key insight: `T extends HasId` doesn't mean `T` *is* `HasId`. It means `T` has
*at least* the properties of `HasId`. The object can have additional properties too.

### Constraining with Union Types

You can constrain to a union of types:

```typescript
function formatValue<T extends string | number>(value: T): string {
    return `Value: ${value}`;
}

formatValue("hello"); // OK
formatValue(42);       // OK
// formatValue(true);  // Error: boolean doesn't extend string | number
```

### Multiple Constraints

When you need multiple constraints, use an intersection:

```typescript
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

function greetPerson<T extends HasName & HasAge>(person: T): string {
    return `${person.name} is ${person.age} years old`;
}

greetPerson({ name: "Alice", age: 30 }); // OK
```

### Constraining One Parameter by Another

A type parameter can be constrained by another type parameter. This is common with
`keyof`:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30 };
getProperty(user, "name"); // string
getProperty(user, "age");  // number
// getProperty(user, "email"); // Error: "email" is not a key of user
```

This pattern ensures you can only access properties that actually exist on the object.

## Common Pitfalls

- **Constraining too tightly.** If you write `<T extends string>`, only strings (and
  string literal types) will work. Make sure your constraint matches the actual range
  of types you want to accept.
- **Confusing `extends` in generics with class inheritance.** In generics, `extends`
  means "is assignable to" — it's a constraint, not inheritance. `T extends { length: number }`
  doesn't mean `T` inherits from anything.
- **Forgetting that the constraint is a minimum.** `T extends HasId` means `T` has
  *at least* an `id` property. The actual type might have many more properties, and
  TypeScript preserves them all.

## Key Takeaways

- Use `extends` to constrain what types a generic parameter can accept.
- Constraints let you access properties and methods on the type parameter.
- You can constrain to interfaces, object types, unions, or intersections.
- One type parameter can be constrained by another using `keyof`.
- `extends` in generics means "is assignable to," not class inheritance.
- The constraint is a minimum requirement — the actual type can have more properties.

<div class="hint">
A useful mental model: think of `T extends X` as a filter. Without it, `T` accepts
every type in the TypeScript universe. With `extends X`, you're filtering down to
only the types that are assignable to `X`. The more specific your constraint, the
more you can do with `T` inside the function — but the fewer types callers can pass in.
</div>
