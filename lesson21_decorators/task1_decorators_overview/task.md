# Decorators Overview

Decorators are a powerful metaprogramming feature that let you annotate and modify classes, methods, properties, and parameters at design time. TypeScript has supported decorators since its early days via the `experimentalDecorators` flag, and JavaScript itself is now standardizing them through the TC39 Stage 3 proposal. Understanding both approaches is essential for working with modern TypeScript codebases.

## Core Concept

A decorator is a function that receives information about the thing it decorates and can optionally replace or modify it. You apply a decorator using the `@` syntax placed before a class, method, accessor, or property declaration.

There are two distinct decorator systems in TypeScript:

1. **Legacy decorators** (`experimentalDecorators: true` in tsconfig) — the original TypeScript implementation, widely used by Angular, NestJS, TypeORM, and other frameworks.
2. **TC39 Stage 3 decorators** — the upcoming JavaScript standard, available in TypeScript 5.0+ without any flag.

```typescript
// Legacy decorator (experimentalDecorators: true)
function sealed(constructor: Function): void {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class LegacyGreeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
}
```

## How It Works

### Legacy Decorators (experimentalDecorators)

Legacy decorators receive different arguments depending on what they decorate:

- **Class decorator**: receives the constructor function
- **Method decorator**: receives `(target, propertyKey, descriptor)`
- **Property decorator**: receives `(target, propertyKey)`
- **Parameter decorator**: receives `(target, propertyKey, parameterIndex)`

```typescript
// Legacy method decorator
function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        console.log(`Calling ${propertyKey} with`, args);
        return original.apply(this, args);
    };
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}
```

### TC39 Stage 3 Decorators

The new standard uses a different signature. Every decorator receives two arguments: the **value** being decorated and a **context** object describing what is being decorated.

```typescript
// TC39 Stage 3 class decorator
type ClassDecorator = <T extends new (...args: any[]) => any>(
    value: T,
    context: ClassDecoratorContext
) => T | void;

// TC39 Stage 3 method decorator
type MethodDecorator = <T extends (...args: any[]) => any>(
    value: T,
    context: ClassMethodDecoratorContext
) => T | void;
```

The context object includes properties like `kind` (`"class"`, `"method"`, `"field"`, `"accessor"`, `"getter"`, `"setter"`), `name`, `static`, `private`, and an `addInitializer` callback for running code during construction.

## Key Differences

| Feature | Legacy (`experimentalDecorators`) | TC39 Stage 3 |
|---------|----------------------------------|--------------|
| Requires tsconfig flag | Yes | No (TS 5.0+) |
| Parameter decorators | Yes | No |
| `emitDecoratorMetadata` | Yes | No |
| Context object | No | Yes |
| `addInitializer` | No | Yes |
| Ecosystem adoption | Angular, NestJS, TypeORM | Emerging |

## Common Pitfalls

- **Mixing the two systems**: You cannot use legacy and TC39 decorators in the same file. The tsconfig flag determines which system is active.
- **Parameter decorators**: Only legacy decorators support parameter decorators. The TC39 proposal does not include them.
- **`emitDecoratorMetadata`**: Only works with legacy decorators. Libraries like `reflect-metadata` depend on this flag.
- **Return values**: In legacy class decorators, returning a new constructor replaces the class. In TC39, returning `undefined` keeps the original.

## Key Takeaways

- Decorators are functions that modify classes, methods, and properties using `@` syntax
- Legacy decorators (`experimentalDecorators`) are mature and widely used in frameworks
- TC39 Stage 3 decorators are the future standard with a cleaner, context-based API
- The two systems are incompatible — choose one per project based on your framework needs
- Most production codebases today still use legacy decorators due to framework requirements

<div class="hint">
The TC39 decorator proposal went through multiple revisions over nearly a decade. The Stage 3 version is significantly different from earlier proposals. If you see decorator tutorials online, check whether they cover the legacy or TC39 version — the signatures are completely different.
</div>
