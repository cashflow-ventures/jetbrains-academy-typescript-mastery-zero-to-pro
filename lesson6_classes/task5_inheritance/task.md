# Inheritance

Inheritance lets you create new classes that build on existing ones. A subclass **extends** a
base class, inheriting all its properties and methods while adding or overriding its own.
TypeScript adds type safety to this pattern — the compiler checks that you call `super()`
correctly, that overridden methods match the parent's signature, and that the `override`
keyword is used when you intend to replace a parent method.

## Core Concept

Use the `extends` keyword to create a subclass. The subclass inherits everything from the
parent and can add new members or override existing ones:

```typescript
class Animal {
    constructor(public name: string) {}

    speak(): string {
        return `${this.name} makes a sound.`;
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name); // must call super() before using 'this'
    }

    override speak(): string {
        return `${this.name} barks!`;
    }

    fetch(item: string): string {
        return `${this.name} fetches the ${item}.`;
    }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak());        // "Rex barks!"
console.log(dog.fetch("ball"));  // "Rex fetches the ball."
```

## How It Works

### The `extends` Keyword

When a class extends another, it inherits all `public` and `protected` members. The subclass
can use inherited methods directly, add new ones, or override existing ones:

```typescript
class Shape {
    constructor(public color: string) {}

    getColor(): string {
        return this.color;
    }
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const c = new Circle("red", 5);
console.log(c.getColor()); // "red" — inherited from Shape
console.log(c.getArea());  // 78.539... — defined in Circle
```

### The `super` Keyword

In a subclass constructor, you **must** call `super()` before accessing `this`. The `super()`
call invokes the parent's constructor:

```typescript
class Base {
    constructor(public value: number) {}
}

class Derived extends Base {
    extra: string;

    constructor(value: number, extra: string) {
        super(value);      // call parent constructor first
        this.extra = extra; // now 'this' is available
    }
}
```

You can also use `super` to call parent methods from within an overridden method:

```typescript
class Logger {
    log(message: string): string {
        return `[LOG] ${message}`;
    }
}

class TimestampLogger extends Logger {
    override log(message: string): string {
        const base = super.log(message); // call parent's log
        return `${new Date().toISOString()} ${base}`;
    }
}
```

### The `override` Keyword

TypeScript 4.3+ introduced the `override` keyword. When you add `override` to a method, the
compiler verifies that a method with the same name exists in the parent class. This catches
typos and accidental mismatches:

```typescript
class Parent {
    greet(): string {
        return "Hello from Parent";
    }
}

class Child extends Parent {
    override greet(): string {
        return "Hello from Child";
    }

    // override gret(): string { }  // Error: no 'gret' in Parent — typo caught!
}
```

You can enable `noImplicitOverride` in `tsconfig.json` to **require** the `override` keyword
on every overriding method. This is a great safety net for large codebases.

## Common Pitfalls

- **Forgetting to call `super()`.** If your subclass has a constructor, you must call
  `super()` before using `this`. TypeScript will error if you forget.
- **Overriding with an incompatible signature.** The overriding method must be compatible
  with the parent's signature — same parameter types (or wider) and same return type (or
  narrower).
- **Not using `override`.** Without the `override` keyword, you might accidentally shadow
  a parent method or misspell the method name. Use `override` to make your intent explicit.

## Key Takeaways

- `extends` creates a subclass that inherits all public and protected members.
- `super()` must be called in the subclass constructor before accessing `this`.
- `super.method()` calls the parent's version of an overridden method.
- The `override` keyword ensures you're actually overriding a parent method.
- TypeScript checks that overriding methods have compatible signatures.

<div class="hint">
TypeScript supports single inheritance only — a class can extend exactly one other class.
If you need to compose behavior from multiple sources, use interfaces with `implements`
(covered in the next tasks) or mixins.
</div>
