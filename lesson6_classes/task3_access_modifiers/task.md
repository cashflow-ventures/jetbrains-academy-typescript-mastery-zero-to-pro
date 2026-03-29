# Access Modifiers

TypeScript gives you fine-grained control over who can access class members through **access
modifiers**: `public`, `private`, `protected`, and `readonly`. These modifiers are checked at
compile time, letting you enforce encapsulation and prevent accidental misuse of internal state.

## Core Concept

Every class property and method has a visibility level. By default, everything is `public` —
accessible from anywhere. TypeScript adds three more modifiers:

| Modifier | Accessible from | Use case |
|----------|----------------|----------|
| `public` | Anywhere | Default — part of the class's public API |
| `private` | Same class only | Internal implementation details |
| `protected` | Same class + subclasses | Shared internals for inheritance hierarchies |
| `readonly` | Anywhere (read), constructor (write) | Immutable after construction |

```typescript
class Employee {
    public name: string;          // accessible everywhere
    private salary: number;       // only inside Employee
    protected department: string; // inside Employee and subclasses
    readonly id: number;          // set once, never changed

    constructor(name: string, salary: number, department: string, id: number) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.id = id;
    }
}
```

## How It Works

### `private` — Class-Only Access

A `private` member can only be accessed inside the class that declares it. Not even subclasses
can see it:

```typescript
class Secret {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    reveal(): string {
        return this.value; // OK — same class
    }
}

const s = new Secret("hidden");
// s.value;  // Error: Property 'value' is private
s.reveal();  // OK — public method
```

### `protected` — Class + Subclass Access

A `protected` member is visible inside the declaring class and any class that extends it:

```typescript
class Animal {
    protected sound: string;

    constructor(sound: string) {
        this.sound = sound;
    }
}

class Dog extends Animal {
    bark(): string {
        return this.sound.toUpperCase(); // OK — subclass can access protected
    }
}

const dog = new Dog("woof");
// dog.sound;  // Error: Property 'sound' is protected
dog.bark();    // OK — "WOOF"
```

### `readonly` — Immutable After Construction

A `readonly` property can only be assigned in the constructor or at declaration. After that,
it cannot be changed:

```typescript
class Config {
    readonly apiUrl: string;
    readonly maxRetries: number = 3; // default value

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }
}

const config = new Config("https://api.example.com");
// config.apiUrl = "other"; // Error: Cannot assign to 'apiUrl' because it is read-only
```

### Parameter Properties — The Shorthand

TypeScript has a powerful shorthand: **parameter properties**. By adding an access modifier
(or `readonly`) to a constructor parameter, TypeScript automatically declares and assigns the
property for you:

```typescript
// Without parameter properties (verbose)
class UserVerbose {
    public name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// With parameter properties (concise)
class UserConcise {
    constructor(
        public name: string,
        private age: number
    ) {}
    // name and age are automatically declared and assigned
}
```

Both classes above produce identical behavior. Parameter properties save you from writing
the declaration and assignment boilerplate.

## Common Pitfalls

- **Access modifiers are compile-time only.** At runtime, JavaScript has no concept of
  `private` or `protected` — the properties are still accessible. TypeScript's `private`
  is different from JavaScript's `#private` fields (which are truly private at runtime).
- **Forgetting `readonly` doesn't prevent mutation.** If you want a property to be truly
  immutable, mark it `readonly`. Without it, any code with access can reassign it.
- **Mixing up `private` and `protected`.** Use `private` for implementation details that
  subclasses shouldn't touch. Use `protected` when subclasses need access.

## Key Takeaways

- `public` is the default — everything is accessible unless you say otherwise.
- `private` restricts access to the declaring class only.
- `protected` allows access from the declaring class and its subclasses.
- `readonly` prevents reassignment after construction.
- Parameter properties let you declare and assign properties directly in the constructor signature.
- All access modifiers are erased at compile time — they're a development-time safety net.

<div class="hint">
If you need true runtime privacy (not just compile-time), JavaScript's native `#private` fields
work in TypeScript too: `#salary: number;`. These are enforced by the JavaScript engine itself,
not just the TypeScript compiler. However, parameter properties don't work with `#private` fields.
</div>
