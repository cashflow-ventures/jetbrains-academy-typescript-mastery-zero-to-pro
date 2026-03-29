# Quiz: Error Handling

Test your understanding of TypeScript error handling — the `catch` clause,
custom error classes, and the Result pattern.

## Which statement about error handling in TypeScript is correct?

Consider how the `catch` clause is typed, what values JavaScript allows you
to throw, whether TypeScript has `throws` declarations, and how the Result
pattern compares to traditional exceptions.

<div class="hint">
Think about what happens when someone writes `throw "oops"` or `throw 42`.
What type should the `catch` variable be if literally anything can be thrown?
And consider what advantage encoding errors in the return type gives you
over relying on `try/catch`.
</div>
