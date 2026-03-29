export interface Circle {
    kind: "circle";
    radius: number;
}

export interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

export interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

export type Shape = Circle | Rectangle | Triangle;

// TODO: Implement getArea
// Use the "in" operator to narrow the shape type and calculate the area
export function getArea(shape: Shape): number {
    // Write your solution here
    return 0;
}

// TODO: Implement describeShape
// Return a description string based on the shape type
export function describeShape(shape: Shape): string {
    // Write your solution here
    return "";
}

// TODO: Implement hasCorners
// Return true for Rectangle and Triangle, false for Circle
export function hasCorners(shape: Shape): boolean {
    // Write your solution here
    return false;
}
