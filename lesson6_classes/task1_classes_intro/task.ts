// Classes in TypeScript — property declarations, constructor typing, and methods

// 1. A class with typed properties and a constructor
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
}

// 2. Creating instances — TypeScript checks constructor arguments
const alice = new User("Alice", 30);
console.log(alice.greet()); // "Hi, I'm Alice and I'm 30 years old."

// 3. Properties with default values
class Counter {
    count: number = 0;

    increment(): void {
        this.count++;
    }

    getCount(): number {
        return this.count;
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2

// 4. Methods with typed parameters and return values
class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

const rect = new Rectangle(5, 10);
console.log(`Area: ${rect.area()}`); // "Area: 50"
