// Abstract Classes — abstract methods, concrete methods, abstract vs interface

// 1. Abstract class with abstract and concrete methods
abstract class Shape {
    constructor(public color: string) {}

    // Abstract — subclasses must implement
    abstract getArea(): number;
    abstract getName(): string;

    // Concrete — subclasses inherit this
    describe(): string {
        return `A ${this.color} ${this.getName()} with area ${this.getArea().toFixed(2)}`;
    }
}

// 2. Concrete subclass — must implement all abstract methods
class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getName(): string {
        return "circle";
    }
}

class Rectangle extends Shape {
    constructor(color: string, public width: number, public height: number) {
        super(color);
    }

    getArea(): number {
        return this.width * this.height;
    }

    getName(): string {
        return "rectangle";
    }
}

// 3. Using abstract class as a type
const shapes: Shape[] = [
    new Circle("red", 5),
    new Rectangle("blue", 4, 6),
];

for (const shape of shapes) {
    console.log(shape.describe());
}
// "A red circle with area 78.54"
// "A blue rectangle with area 24.00"

// 4. Cannot instantiate abstract class directly
// const s = new Shape("green"); // Error!
