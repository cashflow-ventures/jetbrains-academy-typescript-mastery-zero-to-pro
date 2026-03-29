# Quiz: Utility Types

Test your understanding of TypeScript's built-in utility types.

## You have a `User` interface with `id`, `name`, `email`, and `role` properties. You need to write an `updateUser` function that accepts an object with *any subset* of these properties (the caller might only want to update the name, or the email, or both). Which utility type should you use for the update parameter?

Think about which utility type transforms all properties to be optional, and why that is
the right fit for an update/patch operation.

<div class="hint">
Consider what each utility type does: `Partial` makes properties optional, `Pick` selects
specific properties, `Readonly` prevents mutation, `Record` creates a dictionary type, and
`Required` makes all properties mandatory. Which one lets the caller provide *any combination*
of fields?
</div>
