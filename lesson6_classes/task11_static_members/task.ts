// TODO: Create a Temperature class with static factory methods

export class Temperature {
    private celsius: number;

    private constructor(celsius: number) {
        this.celsius = celsius;
    }

    // TODO: Static factory — create from Celsius value
    static fromCelsius(value: number): Temperature {
        // Write your solution here
        return new Temperature(0);
    }

    // TODO: Static factory — create from Fahrenheit value
    // Formula: (fahrenheit - 32) * 5 / 9
    static fromFahrenheit(value: number): Temperature {
        // Write your solution here
        return new Temperature(0);
    }

    // TODO: Return the Celsius value
    toCelsius(): number {
        return 0;
    }

    // TODO: Convert to Fahrenheit: celsius * 9 / 5 + 32
    toFahrenheit(): number {
        return 0;
    }

    // TODO: Return "{celsius}°C" with 1 decimal place
    toString(): string {
        return "";
    }
}

// TODO: Create an IdGenerator class with static counter

export class IdGenerator {
    private static nextId: number = 1;

    // TODO: Return current nextId and increment it
    static generate(): number {
        return 0;
    }

    // TODO: Reset nextId back to 1
    static reset(): void {
    }
}
