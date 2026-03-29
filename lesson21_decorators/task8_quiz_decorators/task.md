# Quiz: Decorators

Choose the correct statement about TypeScript decorators.

## When multiple decorators are stacked on a single method, what is the execution order?

Consider this code:

```typescript
@A
@B
@C
method() { }
```

Think about which decorator applies first and how the wrapping works.

<div class="hint">
Think of stacked decorators like function composition: `A(B(C(method)))`.
The innermost function (closest to the method) applies first. Decorator factory
expressions (if any) evaluate top-to-bottom, but the decorator functions themselves
apply bottom-to-top.
</div>
