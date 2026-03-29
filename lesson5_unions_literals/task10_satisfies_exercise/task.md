# `satisfies` Exercise

Now you'll use the `satisfies` operator to create type-checked configuration objects that
preserve their narrow inferred types. This is a common real-world pattern for app configuration.

## Instructions

1. Create a `palette` constant object with properties `primary: "blue"`, `secondary: "green"`,
   and `accent: [255, 136, 0]`. Use `satisfies Palette` so TypeScript validates the shape
   while preserving the specific types (string literals and number tuple).

2. Implement `getPaletteCSS` — it takes a key (`"primary" | "secondary" | "accent"`) and
   returns a CSS color string. If the palette value is a string, return it as-is. If it's a
   tuple `[r, g, b]`, return `"rgb(r, g, b)"`.

3. Create an `appConfig` constant object with `appName: "MyApp"`, `version: "1.0.0"`,
   `maxRetries: 3`, `debug: false`. Use `as const satisfies AppConfig` for both validation
   and literal types.

4. Implement `getConfigSummary` — returns a string in the format
   `"{appName} v{version} (debug: {debug})"` using the `appConfig` object.

5. Export `palette`, `getPaletteCSS`, `appConfig`, and `getConfigSummary`.

## Example

```typescript
getPaletteCSS("primary");  // returns "blue"
getPaletteCSS("accent");   // returns "rgb(255, 136, 0)"

getConfigSummary();  // returns "MyApp v1.0.0 (debug: false)"
```

<div class="hint">
For the palette, use `satisfies Palette` (without `as const`) so string values keep their
literal types. For appConfig, use `as const satisfies AppConfig` to get both readonly
properties and type validation. To check if a value is an array, use `Array.isArray()`.
</div>
