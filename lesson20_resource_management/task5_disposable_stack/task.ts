// DisposableStack — managing multiple resources

// Simple disposable resource for demonstration
class Resource implements Disposable {
    public disposed = false;

    constructor(public readonly id: string) {
        console.log(`  [${id}] created`);
    }

    [Symbol.dispose](): void {
        if (!this.disposed) {
            this.disposed = true;
            console.log(`  [${this.id}] disposed`);
        }
    }
}

// Using DisposableStack to manage dynamic resources
function processBatch(ids: string[]): void {
    using stack = new DisposableStack();

    // Register each resource with use()
    const resources = ids.map((id) => stack.use(new Resource(id)));

    // Register a bare cleanup callback with defer()
    stack.defer(() => console.log("  [cleanup] all done"));

    console.log(`Processing ${resources.length} resources...`);
    // All resources disposed in reverse order at scope exit
}

// adopt() — custom cleanup for non-Disposable values
function withTempData(): void {
    using stack = new DisposableStack();

    const data = { buffer: new Array(100).fill(0) };
    stack.adopt(data, (d) => {
        d.buffer.length = 0;
        console.log("  Buffer cleared");
    });

    console.log(`Buffer size: ${data.buffer.length}`);
    // adopt callback runs at scope exit
}

console.log("=== Batch processing ===");
processBatch(["A", "B", "C"]);

console.log("\n=== Adopt example ===");
withTempData();
