# Quiz: Generics Basics

Select all statements that are **true** about TypeScript generics.

Think about how generics compare to `any`, how type inference works with generic
functions, what constraints allow and restrict, and the rules for default type
parameters.

Consider this code when answering:

```typescript
function identity<T>(value: T): T {
    return value;
}

function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

interface Container<T = string> {
    value: T;
}
```

<div class="hint">
Think about what happens when you call `identity(42)` — does TypeScript know the
return type is `number`? What would happen if `identity` used `any` instead of `T`?
Also consider: can `getLength` accept a `number` argument? And what does the `= string`
default on `Container` actually do?
</div>
