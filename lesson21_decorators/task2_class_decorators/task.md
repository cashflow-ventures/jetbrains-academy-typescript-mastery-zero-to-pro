# Class Decorators

Class decorators are applied to the constructor of a class and can observe, modify, or replace the class definition. They are the most common type of decorator and form the backbone of frameworks like Angular (`@Component`) and NestJS (`@Controller`).

## Core Concept

A legacy class decorator is a function that receives the class constructor as its only argument. It can either mutate the constructor/prototype in place or return a new constructor to replace the original class entirely.

```typescript
// Signature: (constructor: Function) => void | typeof constructor
function reportable(constructor: Function): void {
    constructor.prototype.reportId = "auto-generated-id";
    constructor.prototype.getReport = function (): string {
        return `Report for ${this.constructor.name}: ${this.reportId}`;
    };
}

@reportable
class BugReport {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}

const bug = new BugReport("Layout broken") as any;
console.log(bug.getReport()); // "Report for BugReport: auto-generated-id"
```

## How It Works

### Observing a Class

The simplest class decorator just inspects the class without modifying it. This is useful for registration, logging, or metadata collection.

```typescript
const registry: Function[] = [];

function register(constructor: Function): void {
    registry.push(constructor);
    console.log(`Registered: ${constructor.name}`);
}

@register
class UserService {}

@register
class OrderService {}

console.log(registry.length); // 2
```

### Modifying the Prototype

You can add methods or properties to the class prototype. This is how many frameworks inject functionality.

```typescript
function timestamped(constructor: Function): void {
    constructor.prototype.createdAt = new Date();
    constructor.prototype.getAge = function (): number {
        return Date.now() - this.createdAt.getTime();
    };
}

@timestamped
class Document {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

### Replacing the Constructor

A class decorator can return a new class that extends the original. This lets you wrap or augment the constructor logic.

```typescript
function withId<T extends new (...args: any[]) => any>(
    constructor: T
): T {
    return class extends constructor {
        id: string = Math.random().toString(36).slice(2, 10);
    };
}

@withId
class Entity {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

const entity = new Entity("Player") as Entity & { id: string };
console.log(entity.id); // e.g., "k3m9x2p1"
```

### Sealing a Class

A practical pattern is freezing the prototype to prevent accidental modification after definition.

```typescript
function sealed(constructor: Function): void {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Immutable {
    value: number = 42;
}

// Immutable.prototype.hack = true; // TypeError at runtime (sealed)
```

## Common Pitfalls

- **Type safety with replacement**: When a class decorator returns a new constructor, TypeScript's type system does not automatically reflect the added properties. You may need type assertions or declaration merging.
- **Decorator order**: When multiple class decorators are stacked, they execute bottom-to-top (closest to the class first). The factories evaluate top-to-bottom, but the decorators themselves apply bottom-to-top.
- **`this` context**: Inside a decorator, `this` does not refer to the class instance. The decorator runs at class definition time, not at instantiation time.
- **Sealed classes**: Sealing a prototype prevents adding new properties but does not make existing properties immutable — use `Object.freeze` for that.

## Key Takeaways

- Class decorators receive the constructor and can observe, modify, or replace it
- Prototype modification is the most common pattern for injecting shared behavior
- Returning a new class from a decorator replaces the original constructor
- Multiple decorators apply bottom-to-top (inner-first)
- Type safety requires extra care when decorators add properties not in the original type

<div class="hint">
In the TC39 Stage 3 proposal, class decorators receive `(value, context)` where `value` is the class itself and `context.kind === "class"`. The context also provides `context.addInitializer()` for running code when the class is defined — a cleaner alternative to prototype mutation.
</div>
