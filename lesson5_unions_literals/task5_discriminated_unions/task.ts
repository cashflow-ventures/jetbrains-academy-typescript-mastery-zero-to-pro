// Discriminated Unions — tagged unions with a shared literal property

// 1. Define shape types with a "kind" discriminant
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

// 2. Use switch to narrow the union by the tag
function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return 0.5 * shape.base * shape.height;
    }
}

const circle: Circle = { kind: "circle", radius: 5 };
const rect: Rectangle = { kind: "rectangle", width: 4, height: 6 };
const tri: Triangle = { kind: "triangle", base: 3, height: 8 };

console.log(`Circle area: ${getArea(circle).toFixed(2)}`);   // 78.54
console.log(`Rectangle area: ${getArea(rect)}`);              // 24
console.log(`Triangle area: ${getArea(tri)}`);                // 12

// 3. Exhaustiveness checking with never
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

function describeShape(shape: Shape): string {
    switch (shape.kind) {
        case "circle":
            return `Circle with radius ${shape.radius}`;
        case "rectangle":
            return `${shape.width}x${shape.height} rectangle`;
        case "triangle":
            return `Triangle with base ${shape.base} and height ${shape.height}`;
        default:
            return assertNever(shape);
    }
}

console.log(describeShape(circle));  // "Circle with radius 5"
console.log(describeShape(rect));    // "4x6 rectangle"
