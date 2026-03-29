# Numeric Enums Exercise

Time to put numeric enums to work. You'll create a `Direction` enum and use it in a
movement function that tracks position on a 2D grid.

## Instructions

1. In `task.ts`, create and export a numeric enum called `Direction` with members
   `Up`, `Down`, `Left`, and `Right` (starting from `0`, auto-incrementing).

2. Export a function `move` that takes a current position `{ x: number; y: number }`
   and a `Direction`, and returns a **new** position object shifted by one unit:
   - `Up` → y + 1
   - `Down` → y − 1
   - `Left` → x − 1
   - `Right` → x + 1

3. Export a function `directionName` that takes a `Direction` value and returns
   its string name using reverse mapping (e.g., `directionName(Direction.Up)` → `"Up"`).

## Example

```typescript
move({ x: 0, y: 0 }, Direction.Up);    // { x: 0, y: 1 }
move({ x: 3, y: 2 }, Direction.Left);  // { x: 2, y: 2 }
directionName(Direction.Right);          // "Right"
```

<div class="hint">
Remember that numeric enums support reverse mapping — you can index the enum object
with a numeric value to get the member name: `Direction[value]`.
</div>
