// The Resource Cleanup Problem — try/finally pitfalls

// Simulated resource that must be closed
interface FileHandle {
    path: string;
    read(): string;
    close(): void;
}

function openFile(path: string): FileHandle {
    console.log(`Opening ${path}`);
    return {
        path,
        read(): string {
            return `contents of ${path}`;
        },
        close(): void {
            console.log(`Closing ${path}`);
        },
    };
}

// One resource — manageable
function readSingle(path: string): string {
    const handle = openFile(path);
    try {
        return handle.read();
    } finally {
        handle.close();
    }
}

// Two resources — nesting begins
function copyFile(src: string, dest: string): void {
    const reader = openFile(src);
    try {
        const writer = openFile(dest);
        try {
            console.log(`Copying: ${reader.read()} -> ${writer.path}`);
        } finally {
            writer.close(); // must close writer first
        }
    } finally {
        reader.close(); // then close reader
    }
}

console.log(readSingle("config.json"));
copyFile("source.txt", "backup.txt");
