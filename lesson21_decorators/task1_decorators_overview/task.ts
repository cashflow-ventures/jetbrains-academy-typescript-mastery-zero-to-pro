// Decorators Overview — Legacy vs TC39 Stage 3
// This file uses legacy decorators (experimentalDecorators: true)

// A simple class decorator that seals the constructor and prototype
function sealed(constructor: Function): void {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// A method decorator that logs calls
function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        console.log(`[LOG] ${propertyKey}(${args.join(", ")})`);
        const result = original.apply(this, args);
        console.log(`[LOG] ${propertyKey} returned ${result}`);
        return result;
    };
}

// Applying decorators
@sealed
class MathService {
    @log
    multiply(a: number, b: number): number {
        return a * b;
    }

    @log
    divide(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
}

const service = new MathService();
service.multiply(3, 4);   // Logs: [LOG] multiply(3, 4) → [LOG] multiply returned 12
service.divide(10, 2);    // Logs: [LOG] divide(10, 2) → [LOG] divide returned 5
