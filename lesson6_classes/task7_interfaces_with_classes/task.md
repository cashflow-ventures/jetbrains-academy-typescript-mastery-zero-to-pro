# Interfaces with Classes

In Lesson 4 you learned about interfaces as object shapes. Now you'll see how classes can
**implement** interfaces — a contract that guarantees a class provides certain properties and
methods. Unlike inheritance (which gives you one parent), a class can implement **multiple**
interfaces, making this a powerful tool for composing behavior.

## Core Concept

The `implements` keyword tells TypeScript that a class promises to satisfy an interface's
contract. The compiler checks that every property and method in the interface is present in
the class:

```typescript
interface Printable {
    print(): string;
}

class Report implements Printable {
    constructor(private title: string) {}

    print(): string {
        return `Report: ${this.title}`;
    }
}
```

If the class is missing a required member, you get a compile error immediately.

## How It Works

### Basic `implements`

When a class implements an interface, it must provide all the members the interface declares:

```typescript
interface HasArea {
    getArea(): number;
}

interface HasPerimeter {
    getPerimeter(): number;
}

class Rectangle implements HasArea, HasPerimeter {
    constructor(
        public width: number,
        public height: number
    ) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}
```

### Multiple Interface Implementation

A class can implement as many interfaces as needed, separated by commas. This is how you
compose capabilities:

```typescript
interface Serializable {
    serialize(): string;
}

interface Loggable {
    log(): void;
}

class UserRecord implements Serializable, Loggable {
    constructor(public name: string, public age: number) {}

    serialize(): string {
        return JSON.stringify({ name: this.name, age: this.age });
    }

    log(): void {
        console.log(`User: ${this.name}, Age: ${this.age}`);
    }
}
```

### Structural Typing Still Applies

TypeScript uses **structural typing** — if an object has the right shape, it satisfies the
interface, even without `implements`. The `implements` keyword is a convenience that gives
you compile-time checking inside the class, but it's not required for type compatibility:

```typescript
interface Greetable {
    greet(): string;
}

// No "implements Greetable", but still compatible
class Stranger {
    greet(): string {
        return "Hello!";
    }
}

function welcome(g: Greetable): string {
    return g.greet();
}

welcome(new Stranger()); // OK — structural match
```

The `implements` clause is still valuable because it catches errors **inside the class** as
you write it, rather than at the call site.

### Interfaces Don't Provide Implementation

Unlike abstract classes (covered next), interfaces contain no implementation — they only
describe the shape. The class must provide all the logic:

```typescript
interface Validator {
    validate(input: string): boolean;
}

class EmailValidator implements Validator {
    validate(input: string): boolean {
        return input.includes("@");
    }
}
```

## Common Pitfalls

- **Thinking `implements` changes the class's type.** It doesn't add anything to the class
  at runtime — it only tells the compiler to check the class against the interface.
- **Forgetting that interfaces are erased.** You can't use `instanceof` with an interface
  at runtime because interfaces don't exist in JavaScript.
- **Confusing `implements` with `extends`.** `extends` creates an inheritance relationship
  (one parent class). `implements` is a contract check (multiple interfaces allowed).

## Key Takeaways

- `implements` makes a class promise to satisfy an interface's contract.
- A class can implement multiple interfaces, separated by commas.
- The compiler checks that all interface members are present in the class.
- Structural typing means objects can satisfy interfaces without `implements`.
- Interfaces provide no implementation — only shape declarations.
- Use `implements` for compile-time safety; use `extends` for code reuse.

<div class="hint">
A common pattern is to define small, focused interfaces (sometimes called "role interfaces")
and have classes implement several of them. This follows the Interface Segregation Principle
from SOLID: clients shouldn't depend on interfaces they don't use. For example, `Serializable`,
`Loggable`, and `Cacheable` are better as separate interfaces than one giant `Entity` interface.
</div>
