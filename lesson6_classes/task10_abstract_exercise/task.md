# Abstract Classes Exercise

Build an abstract `Shape` class with concrete subclasses `Circle`, `RectangleShape`, and
`Triangle`. The abstract class defines the contract and shared behavior; the subclasses
provide the specific implementations.

## Instructions

1. Create an abstract class `Shape` with:
   - Constructor property: `color` (string)
   - Abstract method: `getArea(): number`
   - Abstract method: `getPerimeter(): number`
   - Concrete method: `describe(): string` — returns `"{color} shape: area={area}, perimeter={perimeter}"` where area and perimeter are rounded to 2 decimal places using `toFixed(2)`
2. Create a `Circle` class extending `Shape`:
   - Additional property: `radius` (number)
   - Implement `getArea()` — `π × r²`
   - Implement `getPerimeter()` — `2 × π × r`
3. Create a `RectangleShape` class extending `Shape`:
   - Additional properties: `width` (number), `height` (number)
   - Implement `getArea()` — `width × height`
   - Implement `getPerimeter()` — `2 × (width + height)`
4. Create a `Triangle` class extending `Shape`:
   - Additional properties: `a` (number), `b` (number), `c` (number) — the three side lengths
   - Implement `getArea()` — use Heron's formula: `√(s(s-a)(s-b)(s-c))` where `s = (a+b+c)/2`
   - Implement `getPerimeter()` — `a + b + c`
5. Create a function `totalArea(shapes: Shape[]): number` that returns the sum of all areas.
6. Export the abstract class, all subclasses, and the function.

## Example

```typescript
const c = new Circle("red", 5);
c.getArea();      // 78.539...
c.getPerimeter(); // 31.415...
c.describe();     // "red shape: area=78.54, perimeter=31.42"

const r = new RectangleShape("blue", 4, 6);
r.getArea();      // 24

totalArea([c, r]); // 102.539...
```

<div class="hint">
Heron's formula: given sides a, b, c, the semi-perimeter is `s = (a + b + c) / 2`, and the
area is `Math.sqrt(s * (s - a) * (s - b) * (s - c))`.
</div>
