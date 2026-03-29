# Method Decorators

Method decorators let you intercept, wrap, or replace individual methods on a class. They are the workhorse of decorator-based patterns — used for logging, caching, access control, validation, and more.

## Core Concept

A legacy method decorator is a function that receives three arguments:

1. **`target`** — the prototype of the class (for instance methods) or the constructor (for static methods)
2. **`propertyKey`** — the name of the method as a string
3. **`descriptor`** — the `PropertyDescriptor` for the method, containing `value`, `writable`, `enumerable`, and `configurable`

The decorator can modify the descriptor in place or return a new descriptor to replace the method.

```typescript
function readonly(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    descriptor.writable = false;
}

class Config {
    @readonly
    getVersion(): string {
        return "1.0.0";
    }
}
```

## How It Works

### Wrapping a Method

The most common pattern is wrapping the original method to add behavior before or after it executes. You replace `descriptor.value` with a new function that calls the original.

```typescript
function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        console.log(`→ ${propertyKey}(${args.join(", ")})`);
        const result = original.apply(this, args);
        console.log(`← ${propertyKey} = ${result}`);
        return result;
    };
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
// → add(2, 3)
// ← add = 5
```

### Decorator Factories

A decorator factory is a function that returns a decorator. This lets you pass configuration to your decorators.

```typescript
function throttle(ms: number) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void {
        const original = descriptor.value;
        let lastCall = 0;
        descriptor.value = function (...args: any[]): any {
            const now = Date.now();
            if (now - lastCall >= ms) {
                lastCall = now;
                return original.apply(this, args);
            }
        };
    };
}

class Button {
    @throttle(1000)
    onClick(): void {
        console.log("Clicked!");
    }
}
```

### Accessor Decorators

Legacy decorators also work on getters and setters. The descriptor will have `get` and/or `set` instead of `value`.

```typescript
function validate(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const originalSet = descriptor.set!;
    descriptor.set = function (value: any): void {
        if (typeof value !== "number" || value < 0) {
            throw new Error(`${propertyKey} must be a non-negative number`);
        }
        originalSet.call(this, value);
    };
}

class Product {
    private _price: number = 0;

    @validate
    set price(value: number) {
        this._price = value;
    }

    get price(): number {
        return this._price;
    }
}
```

## Common Pitfalls

- **Preserving `this`**: Always use `function` (not arrow) for the replacement so that `this` refers to the class instance. Arrow functions capture the decorator's `this`, which is wrong.
- **Return type**: If you return a new descriptor, it replaces the original entirely. If you modify in place and return nothing, the mutation is applied.
- **Static vs instance**: For static methods, `target` is the constructor itself. For instance methods, `target` is the prototype. The decorator signature is the same for both.
- **Async methods**: When wrapping async methods, make sure the wrapper also returns a Promise so that `await` works correctly on the decorated method.

## Key Takeaways

- Method decorators receive `(target, propertyKey, descriptor)` and can modify or replace the method
- Wrapping `descriptor.value` is the standard pattern for adding cross-cutting behavior
- Decorator factories let you parameterize decorators with configuration
- Accessor decorators work on getters/setters via `descriptor.get` and `descriptor.set`
- Always use regular `function` expressions (not arrows) in replacements to preserve `this`

<div class="hint">
In the TC39 Stage 3 proposal, method decorators receive `(value, context)` where `value` is the method function itself and `context.kind === "method"`. The context provides `context.name`, `context.static`, `context.private`, and `context.addInitializer()`. There is no `PropertyDescriptor` — you simply return a new function to replace the method.
</div>
