# String Manipulation Exercise

Practice using TypeScript's intrinsic string manipulation types and template
literal types to build real-world string transformation utilities.

## Instructions

1. In `task.ts`, implement the function `toCamelCase(snake: string): string`
   that converts a `snake_case` string to `camelCase`.
   - Split on underscores, keep the first word lowercase, capitalize the
     first letter of each subsequent word.
   - e.g., `"hello_world"` → `"helloWorld"`, `"get_user_name"` → `"getUserName"`.

2. Implement the function `toSnakeCase(camel: string): string` that converts
   a `camelCase` string to `snake_case`.
   - Insert an underscore before each uppercase letter and lowercase everything.
   - e.g., `"helloWorld"` → `"hello_world"`, `"getUserName"` → `"get_user_name"`.

3. Implement the function `toKebabCase(camel: string): string` that converts
   a `camelCase` string to `kebab-case`.
   - Insert a hyphen before each uppercase letter and lowercase everything.
   - e.g., `"helloWorld"` → `"hello-world"`, `"fontSize"` → `"font-size"`.

4. Implement the function `capitalize(str: string): string` that uppercases
   the first character and leaves the rest unchanged.
   - e.g., `"hello"` → `"Hello"`, `""` → `""`.

## Example

```typescript
toCamelCase("hello_world");    // "helloWorld"
toSnakeCase("helloWorld");     // "hello_world"
toKebabCase("fontSize");       // "font-size"
capitalize("hello");           // "Hello"
```

<div class="hint">
For `toCamelCase`, split the string on `"_"`, then map each part after the first
through a capitalize function. For `toSnakeCase` and `toKebabCase`, use a regex
like `/[A-Z]/g` to find uppercase letters and insert the separator before them.
</div>
