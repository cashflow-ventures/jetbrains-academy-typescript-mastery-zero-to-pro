// Shape types — each has a "kind" discriminant
export type Circle = { kind: "circle"; radius: number };
export type Rectangle = { kind: "rectangle"; width: number; height: number };
export type Triangle = { kind: "triangle"; base: number; height: number };
export type Shape = Circle | Rectangle | Triangle;

// TODO: Implement getArea
// Returns the area of the shape:
// - Circle: Math.PI * radius^2
// - Rectangle: width * height
// - Triangle: 0.5 * base * height
export function getArea(shape: Shape): number {
    // Write your solution here
    return 0;
}

// TODO: Implement getPerimeter
// Returns the perimeter of the shape:
// - Circle: 2 * Math.PI * radius
// - Rectangle: 2 * (width + height)
// - Triangle: base + height + Math.sqrt(base^2 + height^2) (right triangle hypotenuse)
export function getPerimeter(shape: Shape): number {
    // Write your solution here
    return 0;
}

// TODO: Implement describeShape
// Returns a human-readable description:
// - Circle: "Circle with radius {radius}"
// - Rectangle: "Rectangle {width}x{height}"
// - Triangle: "Triangle with base {base} and height {height}"
export function describeShape(shape: Shape): string {
    // Write your solution here
    return "";
}
