# Object Type Literals

So far you've worked with primitive types like `string`, `number`, and `boolean`, and you've typed
function parameters and return values. But real-world programs deal with structured data — objects
with multiple properties. TypeScript lets you describe the exact shape of an object using
**object type literals** (also called inline object types).

## Core Concept

An object type literal describes the properties an object must have, along with each property's type.
You write it directly inline using curly braces:

```typescript
function printUser(user: { name: string; age: number }): void {
    console.log(`${user.name} is ${user.age} years old.`);
}

printUser({ name: "Alice", age: 30 }); // OK
// printUser({ name: "Bob" });          // Error: Property 'age' is missing
```

The type `{ name: string; age: number }` is an object type literal. It tells TypeScript that any
value passed as `user` must have exactly a `name` property of type `string` and an `age` property
of type `number`.

You can also use object types for variables and return types:

```typescript
const point: { x: number; y: number } = { x: 10, y: 20 };

function createPoint(x: number, y: number): { x: number; y: number } {
    return { x, y };
}
```

## How It Works

### Optional Properties

Not every property is always required. Mark a property as optional with a `?` after its name:

```typescript
function greetUser(user: { name: string; title?: string }): string {
    if (user.title) {
        return `Hello, ${user.title} ${user.name}!`;
    }
    return `Hello, ${user.name}!`;
}

greetUser({ name: "Alice" });                // OK — title is optional
greetUser({ name: "Alice", title: "Dr." });  // Also OK
```

An optional property can be `undefined` or omitted entirely. TypeScript narrows the type inside
an `if` check, so you can safely use it after checking.

### Readonly Properties

If a property should never change after creation, mark it `readonly`:

```typescript
function printId(item: { readonly id: number; name: string }): void {
    console.log(`${item.id}: ${item.name}`);
    // item.id = 999; // Error: Cannot assign to 'id' because it is a read-only property
}
```

The `readonly` modifier is a compile-time check only — it doesn't affect the JavaScript output.
It's a signal to other developers (and the compiler) that this property is not meant to be mutated.

### Excess Property Checking

TypeScript performs **excess property checking** when you assign an object literal directly to a
typed variable or parameter. This catches typos and unintended properties:

```typescript
function logPoint(point: { x: number; y: number }): void {
    console.log(point.x, point.y);
}

// Error: Object literal may only specify known properties, and 'z' does not exist
// logPoint({ x: 1, y: 2, z: 3 });

// But this works — no excess property check on variables
const p = { x: 1, y: 2, z: 3 };
logPoint(p); // OK — structural typing allows extra properties
```

This is one of the few places where TypeScript is stricter than pure structural typing. It only
applies to fresh object literals, not to variables that happen to have extra properties.

## Common Pitfalls

- **Inline types get verbose fast.** If you find yourself repeating `{ name: string; age: number }`
  in multiple places, it's time to use an `interface` or `type` alias (covered in the next tasks).
- **Forgetting `?` on optional properties.** Without `?`, TypeScript requires the property to be
  present. If a property might be missing, always mark it optional.
- **Thinking `readonly` prevents all mutation.** `readonly` only prevents reassignment of the
  property itself. If the property holds an object or array, the contents can still be mutated:
  ```typescript
  const config: { readonly tags: string[] } = { tags: ["a", "b"] };
  config.tags.push("c"); // Allowed! The array itself is not readonly.
  // config.tags = [];    // Error — can't reassign the property
  ```

## Key Takeaways

- Object type literals describe the shape of an object inline: `{ key: Type; ... }`.
- Use `?` to mark properties as optional.
- Use `readonly` to prevent property reassignment at compile time.
- Excess property checking catches typos on fresh object literals.
- For reusable object shapes, prefer `interface` or `type` aliases (coming next).

<div class="hint">
Object type literals are the foundation of TypeScript's structural type system. Two objects are
compatible if they have the same shape — it doesn't matter what they're called or where they
were defined. This is called "duck typing": if it walks like a duck and quacks like a duck,
TypeScript treats it as a duck.
</div>
