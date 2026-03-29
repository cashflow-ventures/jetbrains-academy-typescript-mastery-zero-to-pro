# Quiz: Explicit Resource Management

Choose the correct statement about TypeScript's Explicit Resource Management
feature (`using`, `Disposable`, and `DisposableStack`).

Think about how `using` compares to `try/finally`, what the `Disposable`
interface requires, and how `DisposableStack` orders disposal.

<div class="hint">
Consider what happens when an error is thrown inside a block that contains a
`using` declaration. Does the resource still get cleaned up? Compare this
with what `try/finally` guarantees.
</div>
