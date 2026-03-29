# Final Quiz: TypeScript Mastery

Congratulations on reaching the final quiz! This question draws from concepts across all 25 lessons
to test your comprehensive understanding of TypeScript's type system.

## Select ALL statements that are TRUE about TypeScript's type system.

Think carefully about each statement — they span the entire course:

- **Type erasure** — What happens to types when TypeScript compiles to JavaScript?
- **Branded types** — How do they break structural typing?
- **`satisfies`** — Does it affect runtime behavior or only compile-time checking?
- **Conditional types** — How do they behave with union type arguments?
- **`using` keyword** — What interface does it require?
- **`unknown`** — Can you use a value of type `unknown` directly?

```typescript
// Consider these examples as you answer:

// Type erasure
const x: number = 42;  // What exists at runtime?

// Branded types
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };
// Can you pass a UserId where an OrderId is expected?

// Conditional distribution
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;  // string[] | number[]  or  (string | number)[]?

// The using keyword
class Handle implements Disposable {
    [Symbol.dispose]() { /* cleanup */ }
}
```

<div class="hint">
Remember the golden rule from Lesson 1: TypeScript is a *compile-time* type system.
Every type annotation, branded property, `satisfies` check, and conditional type
computation happens before your code ever runs. At runtime, it's all just JavaScript.
The `using` keyword is one of the few TypeScript features that *does* have runtime
behavior — but only because it relies on the `Disposable` interface and `Symbol.dispose`.
</div>
