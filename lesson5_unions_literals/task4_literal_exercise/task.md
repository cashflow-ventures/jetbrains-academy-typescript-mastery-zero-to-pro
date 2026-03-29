# Literal Types Exercise

Now you'll put literal types to work. You'll create type-safe functions that only accept specific
values, catching invalid inputs at compile time.

## Instructions

1. The `Direction` type alias is already defined for you as `"north" | "south" | "east" | "west"`.
   Implement `moveOnGrid` — it takes a `direction` of type `Direction` and a `steps` of type
   `number`. Return an object `{ x: number; y: number }` representing the displacement:
   - `"north"` → `{ x: 0, y: steps }`
   - `"south"` → `{ x: 0, y: -steps }`
   - `"east"` → `{ x: steps, y: 0 }`
   - `"west"` → `{ x: -steps, y: 0 }`

2. The `TrafficLight` type alias is already defined as `"red" | "yellow" | "green"`.
   Implement `nextLight` — it takes the current `light` of type `TrafficLight` and returns the
   next light in the cycle: `"red"` → `"green"` → `"yellow"` → `"red"`.

3. Implement `formatSize` — it takes a `size` parameter of type `"small" | "medium" | "large"`
   and returns the corresponding label: `"S"`, `"M"`, or `"L"`.

4. Export all three functions and both type aliases.

## Example

```typescript
moveOnGrid("north", 3);  // returns { x: 0, y: 3 }
moveOnGrid("west", 2);   // returns { x: -2, y: 0 }

nextLight("red");     // returns "green"
nextLight("green");   // returns "yellow"
nextLight("yellow");  // returns "red"

formatSize("small");  // returns "S"
formatSize("large");  // returns "L"
```

<div class="hint">
Use `if`/`else if` chains or a `switch` statement to handle each literal value. Since the type
is a union of specific strings, TypeScript will ensure you handle all cases correctly.
</div>
