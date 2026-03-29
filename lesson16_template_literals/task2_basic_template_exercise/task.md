# Basic Template Literal Exercise

Practice building template literal types that combine string literal unions
into new, precise string types. You will also write runtime functions that
mirror the type-level logic.

## Instructions

1. In `task.ts`, define a type `EventName` that combines the union
   `"click" | "scroll" | "focus"` with the suffix `"Handler"` using a
   template literal type. The result should be
   `"clickHandler" | "scrollHandler" | "focusHandler"`.

2. Define a type `CSSProperty` that combines the union
   `"margin" | "padding"` with the union `"Top" | "Right" | "Bottom" | "Left"`
   to produce all 8 combinations like `"marginTop"`, `"paddingLeft"`, etc.

3. Implement the function `makeEventName(event: string): string` that takes
   an event name (e.g., `"click"`) and returns it with `"Handler"` appended
   (e.g., `"clickHandler"`).

4. Implement the function `makeCSSProperty(base: string, direction: string): string`
   that concatenates the base and direction (e.g., `"margin"` + `"Top"` → `"marginTop"`).

5. Implement the function `makeId(prefix: string, id: number): string` that
   returns a string in the format `"prefix-123"` (e.g., `"user-42"`).

## Example

```typescript
// Type-level
type E = EventName;     // "clickHandler" | "scrollHandler" | "focusHandler"
type C = CSSProperty;   // "marginTop" | "marginRight" | ... | "paddingLeft"

// Runtime
makeEventName("click");           // "clickHandler"
makeCSSProperty("margin", "Top"); // "marginTop"
makeId("user", 42);               // "user-42"
```

<div class="hint">
For `EventName`, use the syntax `` `${Union}Handler` `` where `Union` is your
event union type. For `CSSProperty`, interpolate both unions:
`` `${Base}${Direction}` ``. The runtime functions are straightforward string
concatenation — template literal strings work perfectly.
</div>
