// TODO: Implement the FileHandle class
// - constructor(path: string) — stores path, starts open
// - read(): string — returns "content of {path}" or throws if closed
// - write(data: string): void — stores data in lastWritten or throws if closed
// - dispose(): void — marks handle as closed (idempotent)
// - isOpen(): boolean — returns whether handle is open

export interface CopyResult {
    content: string;
    srcClosed: boolean;
    destClosed: boolean;
}

export class FileHandle {
    public lastWritten: string = "";

    constructor(public readonly path: string) {
        // Write your solution here
    }

    read(): string {
        // Write your solution here
        return "";
    }

    write(data: string): void {
        // Write your solution here
    }

    dispose(): void {
        // Write your solution here
    }

    isOpen(): boolean {
        // Write your solution here
        return false;
    }
}

// TODO: Implement readFile
// Creates a FileHandle, reads from it, disposes it, returns the content
// Must dispose even if read() throws
export function readFile(path: string): string {
    // Write your solution here
    return "";
}

// TODO: Implement copyContent
// Creates source and dest FileHandles, reads from source, writes to dest
// Disposes both (dest first, then source), returns CopyResult
// Both handles must be disposed even if an error occurs
export function copyContent(srcPath: string, destPath: string): CopyResult {
    // Write your solution here
    return { content: "", srcClosed: true, destClosed: true };
}
