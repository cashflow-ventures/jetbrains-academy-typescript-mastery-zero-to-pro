# instanceof Guards

While `typeof` works great for primitives, it can't distinguish between different object types —
`typeof {}` and `typeof []` both return `"object"`. When you're working with class instances,
the `instanceof` operator is the right tool for narrowing.

## Core Concept

The `instanceof` operator checks whether an object's prototype chain includes a particular
constructor's prototype. TypeScript uses this check to narrow the type:

```typescript
class Dog {
    bark(): string { return "Woof!"; }
}

class Cat {
    meow(): string { return "Meow!"; }
}

function makeSound(animal: Dog | Cat): string {
    if (animal instanceof Dog) {
        return animal.bark();   // animal: Dog
    }
    return animal.meow();       // animal: Cat
}
```

After the `instanceof Dog` check, TypeScript knows the variable is a `Dog` inside that branch,
giving you access to `Dog`-specific methods and properties.

## How It Works

### The Prototype Chain

JavaScript's `instanceof` walks up the prototype chain. If the constructor's `.prototype`
appears anywhere in the chain, the check returns `true`:

```typescript
class Animal {
    name: string;
    constructor(name: string) { this.name = name; }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true — Dog extends Animal
```

TypeScript narrows accordingly — after `instanceof Animal`, you get access to `Animal`
properties, and after `instanceof Dog`, you get `Dog` properties too.

### Working with Built-in Classes

`instanceof` is especially useful with built-in JavaScript classes:

```typescript
function getLength(input: string | string[] | Map<string, number>): number {
    if (input instanceof Array) {
        return input.length;        // input: string[]
    }
    if (input instanceof Map) {
        return input.size;          // input: Map<string, number>
    }
    return input.length;            // input: string
}
```

### Error Handling Pattern

One of the most common uses of `instanceof` is distinguishing error types in `catch` blocks:

```typescript
class ValidationError extends Error {
    field: string;
    constructor(field: string, message: string) {
        super(message);
        this.field = field;
    }
}

class NetworkError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

function handleError(error: Error): string {
    if (error instanceof ValidationError) {
        return `Validation failed on field: ${error.field}`;
    }
    if (error instanceof NetworkError) {
        return `Network error ${error.statusCode}: ${error.message}`;
    }
    return `Unknown error: ${error.message}`;
}
```

## Common Pitfalls

- **`instanceof` doesn't work across realms**: If an object was created in a different iframe
  or VM context, `instanceof` may return `false` even for the "same" class, because each realm
  has its own copy of the constructor.
- **Only works with classes (constructors)**: You can't use `instanceof` with interfaces or
  type aliases — those are erased at runtime. Use `in` checks or custom type guards instead.
- **Order matters with inheritance**: Check the most specific subclass first. If you check
  `instanceof Animal` before `instanceof Dog`, the `Dog` branch will never execute because
  all `Dog` instances are also `Animal` instances.

## Key Takeaways

- `instanceof` narrows types by checking the prototype chain at runtime.
- It works with both custom classes and built-in constructors (`Array`, `Map`, `Date`, `Error`).
- Check subclasses before parent classes to avoid unreachable branches.
- It cannot be used with interfaces or type aliases — those don't exist at runtime.
- Combine with `typeof` for comprehensive narrowing of union types.

<div class="hint">
In `catch` blocks, the caught value is typed as `unknown` in strict mode. You'll need
to use `instanceof Error` (or a subclass) to narrow it before accessing `.message` or
other `Error` properties.
</div>
