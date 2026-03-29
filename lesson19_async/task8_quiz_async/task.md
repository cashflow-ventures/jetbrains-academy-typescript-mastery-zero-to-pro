# Quiz: Async TypeScript

Test your understanding of TypeScript's async type system — `Promise<T>`,
`Awaited<T>`, concurrent methods, and async generators.

## Which statement about async types in TypeScript is correct?

Consider how `Awaited<T>` unwraps nested promises, what `Promise.all` returns
when given a tuple of different promise types, what `Promise.allSettled` returns,
and what an `async` function's return type always is.

<div class="hint">
Think about what happens when you `await` a `Promise<Promise<string>>` — do
you get a `Promise<string>` or a `string`? The `Awaited` utility type mirrors
this behavior exactly. Also consider whether `Promise.all` preserves tuple
types or collapses them into a union array.
</div>
