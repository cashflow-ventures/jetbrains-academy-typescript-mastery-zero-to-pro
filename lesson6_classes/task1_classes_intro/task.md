# Classes in TypeScript

TypeScript classes bring the full power of object-oriented programming to JavaScript — with the
added safety of static types. If you've used classes in JavaScript, TypeScript classes will feel
familiar, but with explicit type annotations on properties, constructor parameters, and method
return values. This means the compiler catches mistakes like passing the wrong type to a
constructor or accessing a property that doesn't exist — all before your code runs.

## Core Concept

A TypeScript class is declared with the `class` keyword, just like in JavaScript. The key
difference is that you **declare properties with types** before using them, and you **annotate
constructor parameters and method signatures** with types.

```typescript
class User {
    // Property declarations with types
    name: string;
    age: number;

    // Constructor with typed parameters
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method with return type annotation
    greet(): string {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
}

const alice = new User("Alice", 30);
console.log(alice.greet()); // "Hi, I'm Alice and I'm 30 years old."
```

In TypeScript's `strict` mode (which this course uses), every property must be initialized —
either in its declaration or in the constructor. The compiler enforces this with the
**strict property initialization** check. If you declare a property but forget to assign it
in the constructor, you'll get a compile error.

## How It Works

### Property Declarations

Unlike JavaScript, TypeScript requires you to declare class properties before using them.
Each property gets a type annotation:

```typescript
class Product {
    name: string;
    price: number;
    inStock: boolean;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
        this.inStock = true; // default value assigned in constructor
    }
}
```

You can also use **default values** directly in the declaration:

```typescript
class Counter {
    count: number = 0; // initialized with a default

    increment(): void {
        this.count++;
    }
}
```

### Constructor Typing

The constructor is typed like any other function — each parameter gets a type annotation.
TypeScript does **not** allow you to annotate the constructor's return type (it always
returns an instance of the class):

```typescript
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanceTo(other: Point): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
}
```

### Methods

Class methods are typed just like standalone functions — annotate parameters and return types:

```typescript
class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    concat(a: string, b: string): string {
        return a + b;
    }
}
```

### Creating Instances

You create instances with `new`, and TypeScript checks that you pass the right types:

```typescript
const p = new Point(10, 20);     // OK
// const bad = new Point("x", 20); // Error: string is not assignable to number
```

## Common Pitfalls

- **Forgetting to declare properties.** In JavaScript you can assign `this.foo` in the
  constructor without declaring `foo` first. In TypeScript strict mode, you must declare
  every property in the class body with a type.
- **Trying to annotate the constructor return type.** The constructor always returns the
  class instance — TypeScript won't let you add a return type annotation to it.
- **Not initializing properties.** With `strictPropertyInitialization` enabled (part of
  `strict` mode), every declared property must be assigned in the constructor or have a
  default value. If you can't initialize it immediately, use the definite assignment
  assertion (`!`): `name!: string;` — but use this sparingly.

## Key Takeaways

- TypeScript classes require explicit property declarations with types.
- Constructor parameters are typed like function parameters.
- Methods have typed parameters and return types, just like standalone functions.
- Strict mode enforces that all properties are initialized.
- Classes are the foundation for access modifiers, inheritance, and interfaces (covered next).

<div class="hint">
TypeScript classes compile down to JavaScript classes (or constructor functions, depending on
your `target` setting). The type annotations are erased — at runtime, a TypeScript class is
just a regular JavaScript class. This means you can use `instanceof` checks at runtime, because
the class structure is preserved in the output.
</div>
