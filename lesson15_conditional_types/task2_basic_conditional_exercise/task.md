# Basic Conditional Types Exercise

Put your understanding of `T extends U ? X : Y` into practice by building
several conditional utility types and runtime helper functions that verify
they work correctly.

## Instructions

1. In `task.ts`, implement the type alias `IsString<T>` that resolves to `true`
   if `T` extends `string`, and `false` otherwise.

2. Implement the type alias `IsArray<T>` that resolves to `true` if `T` extends
   `any[]`, and `false` otherwise.

3. Implement the type alias `TypeName<T>` that maps types to descriptive string
   literals:
   - `string` → `"string"`
   - `number` → `"number"`
   - `boolean` → `"boolean"`
   - `any[]` (arrays) → `"array"`
   - Everything else → `"object"`

4. Implement the function `checkIsString(value: unknown): boolean` that returns
   `true` if the runtime value is a string.

5. Implement the function `checkIsArray(value: unknown): boolean` that returns
   `true` if the runtime value is an array.

6. Implement the function `getTypeName(value: unknown): string` that returns
   `"string"`, `"number"`, `"boolean"`, `"array"`, or `"object"` based on the
   runtime type of the value.

## Example

```typescript
// Type-level
type A = IsString<string>;    // true
type B = IsString<number>;    // false
type C = IsArray<number[]>;   // true
type D = TypeName<boolean>;   // "boolean"

// Runtime
checkIsString("hello");       // true
checkIsArray([1, 2, 3]);      // true
getTypeName(42);              // "number"
```

<div class="hint">
For `IsArray`, use `T extends any[]` as the condition. For `TypeName`, chain
multiple conditional branches with nested ternaries — check `string` first,
then `number`, then `boolean`, then `any[]`, and default to `"object"`.
</div>
