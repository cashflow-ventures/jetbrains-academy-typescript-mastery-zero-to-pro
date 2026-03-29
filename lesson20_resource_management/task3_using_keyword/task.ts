// The using keyword — automatic resource cleanup

// A Disposable resource that tracks its lifecycle
class ManagedResource implements Disposable {
    public disposed = false;

    constructor(public readonly name: string) {
        console.log(`[${name}] acquired`);
    }

    use(): string {
        if (this.disposed) throw new Error(`${this.name} is disposed`);
        return `${this.name}: working`;
    }

    [Symbol.dispose](): void {
        if (!this.disposed) {
            this.disposed = true;
            console.log(`[${this.name}] disposed`);
        }
    }
}

// Demonstrates using — cleanup is automatic
function singleResource(): void {
    using res = new ManagedResource("Alpha");
    console.log(res.use());
    // [Symbol.dispose]() called automatically here
}

// Multiple using — disposed in reverse order (LIFO)
function multipleResources(): void {
    using first = new ManagedResource("First");
    using second = new ManagedResource("Second");
    using third = new ManagedResource("Third");
    console.log(first.use(), second.use(), third.use());
    // Disposal order: Third → Second → First
}

// Cleanup runs even when an error is thrown
function errorSafety(): void {
    try {
        using res = new ManagedResource("Safe");
        throw new Error("Something went wrong");
        // res is still disposed despite the throw
    } catch (e) {
        console.log(`Caught: ${(e as Error).message}`);
    }
}

singleResource();
console.log("---");
multipleResources();
console.log("---");
errorSafety();
