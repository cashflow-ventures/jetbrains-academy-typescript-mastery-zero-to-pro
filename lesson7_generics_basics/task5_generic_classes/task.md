# Generic Classes

Classes can also accept type parameters, letting you build reusable data structures
that are fully type-safe. A generic class works just like a generic interface — you
declare a type parameter after the class name, and it becomes available throughout
the entire class body.

## Core Concept

A generic class declares its type parameter after the class name:

```typescript
class Box<T> {
    private content: T;

    constructor(content: T) {
        this.content = content;
    }

    getContent(): T {
        return this.content;
    }

    setContent(newContent: T): void {
        this.content = newContent;
    }
}

const numberBox = new Box(42);       // Box<number>
const stringBox = new Box("hello");  // Box<string>

numberBox.getContent();  // number
stringBox.getContent();  // string
```

TypeScript infers the type parameter from the constructor argument, just like it
infers type arguments for generic functions.

## How It Works

### Generic Collections

The most common use case for generic classes is building type-safe collections:

```typescript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
numbers.pop(); // 2 (type: number | undefined)
```

Without generics, you'd need a `NumberStack`, `StringStack`, etc. — or use `any`
and lose type safety.

### Multiple Type Parameters

Classes can have multiple type parameters:

```typescript
class KeyValueStore<K, V> {
    private store = new Map<K, V>();

    set(key: K, value: V): void {
        this.store.set(key, value);
    }

    get(key: K): V | undefined {
        return this.store.get(key);
    }
}

const config = new KeyValueStore<string, number>();
config.set("port", 3000);
config.get("port"); // number | undefined
```

### Implementing Generic Interfaces

A generic class can implement a generic interface:

```typescript
interface Repository<T> {
    getById(id: string): T | undefined;
    save(item: T): void;
}

class InMemoryRepository<T> implements Repository<T> {
    private items = new Map<string, T>();

    getById(id: string): T | undefined {
        return this.items.get(id);
    }

    save(item: T): void {
        // Implementation would extract an ID from the item
    }
}
```

## Common Pitfalls

- **Static members can't use the class type parameter.** `T` belongs to instances,
  not the class itself. Static methods need their own type parameters if they need
  to be generic.
- **Forgetting that `T` is unknown inside the class.** Just like in generic functions,
  you can't call type-specific methods on `T` without constraints (covered next).
- **Over-engineering with generics.** If your class only ever stores strings, just
  use `string`. Generics add complexity — use them when you genuinely need reusability.

## Key Takeaways

- Generic classes declare type parameters after the class name: `class Box<T>`.
- The type parameter is available in properties, constructor, and methods.
- TypeScript infers the type parameter from constructor arguments.
- Generic classes are ideal for collections, containers, and data structures.
- A generic class can implement a generic interface.
- Static members cannot reference the class's type parameter.

<div class="hint">
TypeScript's built-in `Array<T>`, `Map<K, V>`, `Set<T>`, and `Promise<T>` are all
generic classes. When you write `new Map<string, number>()`, you're using the exact
same pattern you're learning here. Generics are everywhere in TypeScript's standard
library.
</div>
