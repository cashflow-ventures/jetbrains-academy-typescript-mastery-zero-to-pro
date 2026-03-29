// Stores all instances created by @tracked classes
export const instances: any[] = [];

// TODO: Implement the sealed decorator
// It should freeze both the constructor and its prototype using Object.freeze
export function sealed(constructor: Function): void {
    // Write your solution here
}

// TODO: Implement the tracked decorator
// It should return a new class extending the original that pushes
// each new instance into the `instances` array during construction
export function tracked<T extends new (...args: any[]) => any>(
    constructor: T
): T {
    // Write your solution here
    return constructor;
}

// TODO: Implement the Greeter class with @sealed
// - constructor(greeting: string)
// - greet(name: string): string — returns "{greeting}, {name}!"
@sealed
export class Greeter {
    constructor(public greeting: string) {
        // Write your solution here
    }

    greet(name: string): string {
        // Write your solution here
        return "";
    }
}

// TODO: Implement the Counter class with @tracked
// - constructor(label: string)
// - label: string (public)
// - count starts at 0 (private)
// - increment(): void
// - getCount(): number
@tracked
export class Counter {
    private count: number = 0;

    constructor(public label: string) {
        // Write your solution here
    }

    increment(): void {
        // Write your solution here
    }

    getCount(): number {
        // Write your solution here
        return 0;
    }
}
