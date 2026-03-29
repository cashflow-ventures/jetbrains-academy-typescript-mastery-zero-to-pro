# Discriminated Unions Exercise

Time to build a classic discriminated union example: a shape system. You'll model circles,
rectangles, and triangles as a tagged union and write functions that handle each variant.

## Instructions

1. The shape types are already defined for you with a `kind` discriminant. Implement `getArea` —
   it takes a `Shape` and returns its area as a `number`:
   - Circle: `Math.PI * radius²`
   - Rectangle: `width * height`
   - Triangle: `0.5 * base * height`

2. Implement `getPerimeter` — it takes a `Shape` and returns its perimeter as a `number`:
   - Circle: `2 * Math.PI * radius`
   - Rectangle: `2 * (width + height)`
   - Triangle: `base + height + Math.sqrt(base² + height²)` (assuming a right triangle)

3. Implement `describeShape` — it takes a `Shape` and returns a human-readable string:
   - Circle: `"Circle with radius {radius}"`
   - Rectangle: `"Rectangle {width}x{height}"`
   - Triangle: `"Triangle with base {base} and height {height}"`

4. Export all three functions and all four type aliases.

## Example

```typescript
const circle: Circle = { kind: "circle", radius: 5 };
getArea(circle);       // returns 78.53981633974483
getPerimeter(circle);  // returns 31.41592653589793
describeShape(circle); // returns "Circle with radius 5"

const rect: Rectangle = { kind: "rectangle", width: 4, height: 6 };
getArea(rect);         // returns 24
describeShape(rect);   // returns "Rectangle 4x6"
```

<div class="hint">
Use a `switch` statement on `shape.kind` to handle each variant. Inside each `case`, TypeScript
automatically narrows the type so you can access variant-specific properties like `radius`,
`width`, or `base`.
</div>
