# Class Decorators Exercise

Put your class decorator knowledge into practice. You will implement two decorators that modify class behavior: one that seals a class prototype, and one that tracks all instances created from a class.

## Instructions

1. Implement the `sealed` decorator that freezes both the constructor and its prototype using `Object.freeze`. After applying `@sealed`, no new properties can be added to the constructor or its prototype.

2. Implement the `tracked` decorator that wraps the original constructor. Every time a new instance is created, it should be pushed into the `instances` array exported from the module. The decorator must return a new class extending the original so that construction is intercepted.

3. Implement the `Greeter` class decorated with `@sealed`:
   - Constructor takes a `greeting: string` parameter
   - Has a `greet(name: string): string` method returning `"{greeting}, {name}!"`

4. Implement the `Counter` class decorated with `@tracked`:
   - Constructor takes a `label: string` parameter
   - Has a `label` property accessible publicly
   - Has a private `count` field starting at `0`
   - Has `increment(): void` that increases count by 1
   - Has `getCount(): number` that returns the current count

## Example

```typescript
const g = new Greeter("Hello");
g.greet("Alice"); // "Hello, Alice!"

const c1 = new Counter("clicks");
const c2 = new Counter("views");
c1.increment();
c1.getCount(); // 1
instances.length; // 2 (c1 and c2)
```

<div class="hint">
To intercept construction, return a new class from the decorator that extends the original.
Use `Object.freeze` (not `Object.seal`) for the `sealed` decorator — freeze prevents
both adding new properties and modifying existing ones.
</div>
