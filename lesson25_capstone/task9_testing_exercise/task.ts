// TODO: Build a testable Calculator system using interfaces, dependency injection,
// and a typed mock factory — the core testing patterns from the previous theory task.

// --- Calculator interface ---
// TODO: Export a Calculator interface with:
//   add(a: number, b: number): number
//   subtract(a: number, b: number): number
//   multiply(a: number, b: number): number
//   divide(a: number, b: number): number

// --- BasicCalculator class ---
// TODO: Export a BasicCalculator class implementing Calculator.
//   add      → a + b
//   subtract → a - b
//   multiply → a * b
//   divide   → throw Error("Division by zero") when b is 0, else a / b
export class BasicCalculator {
    add(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    subtract(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    multiply(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    divide(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
}

// --- LogEntry interface ---
// TODO: Export a LogEntry interface with:
//   operation: string
//   args: [number, number]
//   result: number

// --- CalculatorLogger class ---
// TODO: Export a CalculatorLogger class that wraps a Calculator via constructor injection.
//   - Constructor takes a Calculator
//   - Exposes a readonly log: LogEntry[] (initially empty)
//   - Implements add, subtract, multiply, divide
//   - Each method delegates to the injected calculator, pushes a LogEntry, returns result
//   - divide: if the inner calculator throws, let the error propagate (no log entry)
export class CalculatorLogger {
    readonly log: any[] = [];
    private calculator: any;

    constructor(calculator: any) {
        this.calculator = calculator;
    }

    add(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    subtract(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    multiply(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
    divide(a: number, b: number): number {
        // Write your solution here
        return 0;
    }
}

// --- createMockCalculator factory ---
// TODO: Export a createMockCalculator function that returns a Calculator.
//   - Accepts an optional Partial<Record<keyof Calculator, number>> for default return values
//   - Each method returns the configured value or 0
export function createMockCalculator(defaults?: any): any {
    // Write your solution here
    return {
        add: () => 0,
        subtract: () => 0,
        multiply: () => 0,
        divide: () => 0,
    };
}
