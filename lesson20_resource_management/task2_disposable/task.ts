// Disposable and AsyncDisposable interfaces

// A synchronous Disposable — file handle
class FileHandle implements Disposable {
    private closed = false;

    constructor(public readonly path: string) {
        console.log(`Opened: ${path}`);
    }

    read(): string {
        if (this.closed) throw new Error("Handle is closed");
        return `[contents of ${this.path}]`;
    }

    [Symbol.dispose](): void {
        if (!this.closed) {
            this.closed = true;
            console.log(`Closed: ${this.path}`);
        }
    }
}

// An AsyncDisposable — database connection
class DbConnection implements AsyncDisposable {
    private closed = false;

    constructor(private url: string) {
        console.log(`Connected: ${url}`);
    }

    async query(sql: string): Promise<string[]> {
        if (this.closed) throw new Error("Connection closed");
        return [`row1 from ${sql}`];
    }

    async [Symbol.asyncDispose](): Promise<void> {
        if (!this.closed) {
            this.closed = true;
            console.log(`Disconnected: ${this.url}`);
        }
    }
}

// Plain object implementing Disposable — no class needed
function createLock(name: string): Disposable & { name: string } {
    console.log(`Lock acquired: ${name}`);
    return {
        name,
        [Symbol.dispose](): void {
            console.log(`Lock released: ${name}`);
        },
    };
}

// Demonstrate usage
const handle = new FileHandle("data.json");
console.log(handle.read());
handle[Symbol.dispose]();

const lock = createLock("mutex-1");
lock[Symbol.dispose]();
