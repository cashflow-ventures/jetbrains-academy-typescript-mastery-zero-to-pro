# in Operator Narrowing

The `in` operator checks whether a property exists on an object at runtime. TypeScript uses
this check to narrow discriminated unions — if a property is unique to one member of a union,
checking for it tells TypeScript exactly which type you're dealing with.

## Instructions

1. The types `Circle`, `Rectangle`, and `Triangle` are provided. Each has a `kind` property
   and shape-specific properties.

2. Implement `getArea` — it takes a `Shape` (union of all three) and returns the area:
   - Circle: `Math.PI * radius * radius`
   - Rectangle: `width * height`
   - Triangle: `0.5 * base * height`
   Use the `"radius" in shape` pattern (or similar) to narrow the type.

3. Implement `describeShape` — it takes a `Shape` and returns a description string:
   - Circle → `"Circle with radius <radius>"`
   - Rectangle → `"Rectangle <width>x<height>"`
   - Triangle → `"Triangle with base <base> and height <height>"`

4. Implement `hasCorners` — it takes a `Shape` and returns `true` if the shape has corners
   (Rectangle or Triangle), `false` for Circle. Use the `in` operator to check.

## Example

```typescript
getArea({ kind: "circle", radius: 5 });           // ~78.54
getArea({ kind: "rectangle", width: 4, height: 3 }); // 12
describeShape({ kind: "triangle", base: 6, height: 4 }); // "Triangle with base 6 and height 4"
hasCorners({ kind: "circle", radius: 5 });         // false
```

<div class="hint">
The `in` operator checks for property existence: `"radius" in shape` returns `true` only
for circles. TypeScript narrows the type accordingly. You can also use `"width" in shape`
to identify rectangles.
</div>
