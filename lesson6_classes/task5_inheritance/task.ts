// Inheritance — extends, super, method overriding, override keyword

// 1. Base class
class Animal {
    constructor(public name: string) {}

    speak(): string {
        return `${this.name} makes a sound.`;
    }
}

// 2. Subclass with override
class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name); // must call super() first
    }

    override speak(): string {
        return `${this.name} barks!`;
    }

    fetch(item: string): string {
        return `${this.name} fetches the ${item}.`;
    }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak());        // "Rex barks!"
console.log(dog.fetch("ball"));  // "Rex fetches the ball."

// 3. Calling super.method() from an override
class PrefixLogger {
    log(message: string): string {
        return `[LOG] ${message}`;
    }
}

class DetailedLogger extends PrefixLogger {
    override log(message: string): string {
        const base = super.log(message);
        return `DETAILED: ${base}`;
    }
}

const logger = new DetailedLogger();
console.log(logger.log("hello")); // "DETAILED: [LOG] hello"

// 4. Multi-level inheritance
class Vehicle {
    constructor(public make: string, public year: number) {}

    getInfo(): string {
        return `${this.year} ${this.make}`;
    }
}

class Car extends Vehicle {
    constructor(make: string, year: number, public doors: number) {
        super(make, year);
    }
}

class ElectricCar extends Car {
    constructor(make: string, year: number, doors: number, public range: number) {
        super(make, year, doors);
    }

    override getInfo(): string {
        return `${super.getInfo()} (Electric, ${this.range}mi range)`;
    }
}

const tesla = new ElectricCar("Tesla", 2024, 4, 350);
console.log(tesla.getInfo()); // "2024 Tesla (Electric, 350mi range)"
