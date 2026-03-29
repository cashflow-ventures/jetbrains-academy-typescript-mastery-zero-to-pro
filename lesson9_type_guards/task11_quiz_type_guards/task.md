# Quiz: Type Guards

Test your understanding of TypeScript's type narrowing techniques.

## You have a union type `User | Admin` where both are interfaces (not classes). You receive a value of type `unknown` from an API and need to narrow it to `Admin` to access its `permissions` property. Which narrowing technique should you use?

Think about which narrowing techniques work at runtime and which TypeScript types exist
at runtime versus only at compile time.

<div class="hint">
Remember: `typeof` only returns primitive type names ("string", "number", "boolean",
"object", etc.). `instanceof` checks the prototype chain and requires a constructor
function — interfaces don't have constructors because they're erased at compile time.
Consider which technique lets you define your own runtime check while informing TypeScript
about the resulting type.
</div>
