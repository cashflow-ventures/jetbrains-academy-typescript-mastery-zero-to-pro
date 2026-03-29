# Field Decorators

Field decorators (also called property decorators) let you intercept class field declarations. In the legacy decorator system, they are more limited than method decorators — they cannot directly access or modify the field's value. However, they are still useful for metadata registration, validation setup, and working with reflection.

## Core Concept

A legacy property decorator receives two arguments:

1. **`target`** — the prototype of the class (for instance properties) or the constructor (for static properties)
2. **`propertyKey`** — the name of the property as a string or symbol

Unlike method decorators, there is **no `PropertyDescriptor`** argument. The property does not yet exist on the prototype at decoration time — it is created by the constructor when an instance is initialized.

```typescript
function logProperty(target: any, propertyKey: string): void {
    console.log(`Property decorated: ${target.constructor.name}.${propertyKey}`);
}

class User {
    @logProperty
    name: string = "Alice";

    @logProperty
    age: number = 30;
}
// Logs: "Property decorated: User.name"
// Logs: "Property decorated: User.age"
```

## How It Works

### Metadata Registration

The most practical use of property decorators is recording which fields exist and their intended roles. This metadata can be consumed later by class decorators or runtime logic.

```typescript
const requiredFields: Map<Function, string[]> = new Map();

function required(target: any, propertyKey: string): void {
    const constructor = target.constructor;
    const fields = requiredFields.get(constructor) || [];
    fields.push(propertyKey);
    requiredFields.set(constructor, fields);
}

class Form {
    @required
    username: string = "";

    @required
    email: string = "";

    optional: string = "";
}

console.log(requiredFields.get(Form)); // ["username", "email"]
```

### Defining Getters/Setters via Property Descriptors

Although the decorator does not receive a descriptor, you can use `Object.defineProperty` inside the decorator to replace the field with a getter/setter pair. This is a common pattern for validation or observable properties.

```typescript
function nonNegative(target: any, propertyKey: string): void {
    let value: number;

    Object.defineProperty(target, propertyKey, {
        get(): number {
            return value;
        },
        set(newValue: number): void {
            if (newValue < 0) {
                throw new Error(`${propertyKey} cannot be negative`);
            }
            value = newValue;
        },
        enumerable: true,
        configurable: true,
    });
}

class Account {
    @nonNegative
    balance: number = 0;
}

const acct = new Account();
acct.balance = 100;    // OK
// acct.balance = -50; // Throws: "balance cannot be negative"
```

### Combining with `emitDecoratorMetadata`

When `emitDecoratorMetadata` is enabled in tsconfig, TypeScript emits type metadata that can be read at runtime using the `reflect-metadata` library. Property decorators are often used with this feature in frameworks like TypeORM and class-validator.

```typescript
// With emitDecoratorMetadata: true and reflect-metadata
// The type of each decorated property is available at runtime
// Reflect.getMetadata("design:type", target, propertyKey)
// This powers ORMs that map class fields to database columns
```

## Common Pitfalls

- **No descriptor**: Unlike method decorators, property decorators do not receive a `PropertyDescriptor`. You cannot directly modify the property value in the decorator.
- **Shared state with `Object.defineProperty`**: When using the getter/setter pattern, be careful with closure variables — they are shared across all instances unless you use a `WeakMap` keyed by `this`.
- **Initialization order**: Property decorators run at class definition time, before any instance is created. The field's initial value is set later in the constructor.
- **TC39 differences**: In the TC39 Stage 3 proposal, field decorators receive `(value, context)` where `value` is `undefined` and `context.kind === "field"`. They can return an initializer function that transforms the field's initial value — a much cleaner API.

## Key Takeaways

- Legacy property decorators receive `(target, propertyKey)` with no descriptor
- Their primary use is metadata registration — recording which fields exist and their roles
- You can define getters/setters via `Object.defineProperty` for validation or observation
- Use a `WeakMap` keyed by instance to avoid shared state across instances
- TC39 Stage 3 field decorators are more powerful, allowing initializer replacement

<div class="hint">
The TC39 Stage 3 field decorator can return a function that replaces the field initializer:
`function double(value: undefined, context: ClassFieldDecoratorContext) { return (initialValue: number) => initialValue * 2; }`.
This is not possible with legacy property decorators, which is why the `Object.defineProperty` workaround exists.
</div>
