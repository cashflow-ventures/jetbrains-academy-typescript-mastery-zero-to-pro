# Interfaces

In the previous task you used inline object types to describe the shape of objects. That works
fine for one-off usage, but when you need to reuse the same shape in multiple places, inline types
get repetitive and hard to maintain. TypeScript's `interface` keyword lets you give a name to an
object shape and reuse it throughout your code.

## Core Concept

An **interface** is a named description of an object's structure. It declares what properties and
methods an object must have, along with their types:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

function greetUser(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const alice: User = { name: "Alice", age: 30, email: "alice@example.com" };
console.log(greetUser(alice));
```

Once defined, `User` can be used anywhere you'd use an inline object type — as a parameter type,
return type, variable type, or generic constraint.

## How It Works

### Extending Interfaces

Interfaces can **extend** other interfaces to build on existing shapes. The child interface
inherits all properties from the parent and can add new ones:

```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    company: string;
    role: string;
}

const emp: Employee = {
    name: "Bob",
    age: 25,
    company: "Acme",
    role: "Developer",
};
```

`Employee` has all four properties — `name` and `age` from `Person`, plus `company` and `role`.
You can extend multiple interfaces at once:

```typescript
interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

interface Article extends Person, Timestamped {
    title: string;
    body: string;
}
```

### Optional and Readonly in Interfaces

Just like inline object types, interfaces support `?` for optional properties and `readonly`:

```typescript
interface Config {
    readonly apiUrl: string;
    timeout?: number;
    retries?: number;
}

const config: Config = { apiUrl: "https://api.example.com" };
// config.apiUrl = "..."; // Error: Cannot assign to 'apiUrl'
```

### Declaration Merging

One unique feature of interfaces is **declaration merging**. If you declare the same interface
name twice, TypeScript merges them into a single interface:

```typescript
interface Window {
    title: string;
}

interface Window {
    appVersion: string;
}

// Now Window has both title and appVersion
const win: Window = { title: "My App", appVersion: "1.0.0" };
```

This is especially useful when augmenting third-party types or global types. You'll explore
declaration merging in depth in a later lesson — for now, just know that interfaces support it
and type aliases do not.

## Common Pitfalls

- **Confusing interfaces with classes.** An interface is purely a compile-time construct — it
  produces no JavaScript output. It describes a shape but doesn't create objects or provide
  implementations.
- **Forgetting that interfaces are structural.** TypeScript uses structural typing, so any object
  with the right shape satisfies an interface, even if it wasn't explicitly declared as that type.
- **Overusing declaration merging.** While powerful, merging can make it hard to find where
  properties are defined. Use it intentionally, not accidentally.

## Key Takeaways

- Interfaces name reusable object shapes: `interface Name { ... }`.
- Use `extends` to build on existing interfaces.
- Interfaces support `readonly` and optional (`?`) properties.
- Declaration merging lets you add properties to an existing interface across multiple declarations.
- Interfaces are compile-time only — they produce no runtime JavaScript.

<div class="hint">
Interfaces are one of TypeScript's most-used features. The TypeScript team recommends using
interfaces for object shapes by default, and switching to type aliases when you need features
interfaces don't support (like union types). You'll compare the two in detail in an upcoming task.
</div>
