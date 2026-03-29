# Abstract Classes

Abstract classes sit between interfaces and regular classes. Like interfaces, they define a
contract that subclasses must fulfill. Like regular classes, they can contain actual
implementation code. An abstract class **cannot be instantiated directly** — it exists only
to be extended by concrete subclasses.

## Core Concept

Mark a class as `abstract` to prevent direct instantiation. Inside an abstract class, you can
declare `abstract` methods (no body — subclasses must implement them) alongside regular methods
(with a body — subclasses inherit them):

```typescript
abstract class Shape {
    constructor(public color: string) {}

    // Abstract method — no body, subclasses MUST implement
    abstract getArea(): number;

    // Concrete method — has a body, subclasses inherit it
    describe(): string {
        return `A ${this.color} shape with area ${this.getArea().toFixed(2)}`;
    }
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    // Must implement the abstract method
    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const c = new Circle("red", 5);
console.log(c.describe()); // "A red shape with area 78.54"
// const s = new Shape("blue"); // Error: Cannot create an instance of an abstract class
```

## How It Works

### Abstract Methods

An abstract method has no body — just a signature. Every non-abstract subclass must provide
an implementation:

```typescript
abstract class Animal {
    abstract speak(): string;

    greet(): string {
        return `I say: ${this.speak()}`;
    }
}

class Dog extends Animal {
    speak(): string {
        return "Woof!";
    }
}

class Cat extends Animal {
    speak(): string {
        return "Meow!";
    }
}

console.log(new Dog().greet()); // "I say: Woof!"
console.log(new Cat().greet()); // "I say: Meow!"
```

### Abstract vs Interface

Both abstract classes and interfaces define contracts, but they serve different purposes:

| Feature | Interface | Abstract Class |
|---------|-----------|---------------|
| Implementation code | No | Yes |
| Constructor | No | Yes |
| Multiple inheritance | Yes (`implements A, B`) | No (single `extends`) |
| Runtime existence | No (erased) | Yes (JavaScript class) |
| Access modifiers | No | Yes (`private`, `protected`) |
| `instanceof` check | No | Yes |

Use an **interface** when you only need to define a shape — no shared logic, no constructor,
and you want classes to implement multiple contracts.

Use an **abstract class** when you want to share implementation code between subclasses,
enforce a constructor pattern, or use access modifiers on shared members.

### Combining Both

A common pattern is to use an interface for the public contract and an abstract class for
shared implementation:

```typescript
interface Renderable {
    render(): string;
}

abstract class Widget implements Renderable {
    constructor(protected id: string) {}

    abstract render(): string;

    getId(): string {
        return this.id;
    }
}

class Button extends Widget {
    constructor(id: string, private label: string) {
        super(id);
    }

    render(): string {
        return `<button id="${this.id}">${this.label}</button>`;
    }
}
```

## Common Pitfalls

- **Trying to instantiate an abstract class.** The whole point is that you can't — use a
  concrete subclass instead.
- **Forgetting to implement all abstract methods.** If a subclass doesn't implement every
  abstract method, it must also be declared `abstract`.
- **Using abstract classes when interfaces suffice.** If you don't need shared implementation,
  an interface is simpler and allows multiple implementation.

## Key Takeaways

- Abstract classes cannot be instantiated directly — they must be extended.
- Abstract methods have no body; concrete subclasses must implement them.
- Abstract classes can contain both abstract and concrete (implemented) methods.
- Use abstract classes when you need shared implementation; use interfaces for pure contracts.
- Abstract classes exist at runtime (unlike interfaces), so `instanceof` works.

<div class="hint">
A useful rule of thumb: if you find yourself copying the same method implementation across
multiple classes that share an interface, consider introducing an abstract base class to hold
that shared logic. This follows the DRY principle while still enforcing the contract.
</div>
