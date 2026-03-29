// TODO: Build an abstract Shape class with concrete subclasses

// Abstract base class
export abstract class Shape {
    constructor(public color: string) {}

    abstract getArea(): number;
    abstract getPerimeter(): number;

    describe(): string {
        // TODO: Return "{color} shape: area={area}, perimeter={perimeter}"
        // Use toFixed(2) for both values
        return "";
    }
}

// Circle: extends Shape, has radius
export class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    getArea(): number {
        // TODO: Return π × r²
        return 0;
    }

    getPerimeter(): number {
        // TODO: Return 2 × π × r
        return 0;
    }
}

// RectangleShape: extends Shape, has width and height
export class RectangleShape extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    getArea(): number {
        // TODO: Return width × height
        return 0;
    }

    getPerimeter(): number {
        // TODO: Return 2 × (width + height)
        return 0;
    }
}

// Triangle: extends Shape, has sides a, b, c
export class Triangle extends Shape {
    constructor(color: string, public a: number, public b: number, public c: number) {
        super(color);
    }

    getArea(): number {
        // TODO: Use Heron's formula: √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2
        return 0;
    }

    getPerimeter(): number {
        // TODO: Return a + b + c
        return 0;
    }
}

// Function to sum all areas
export function totalArea(shapes: Shape[]): number {
    // TODO: Return the sum of getArea() for all shapes
    return 0;
}
