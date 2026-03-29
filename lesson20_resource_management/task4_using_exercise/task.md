# Disposable FileHandle

In this exercise you will implement the Disposable pattern by building a
`FileHandle` class that tracks its open/closed state and a helper function
that manages multiple file handles with proper cleanup.

Since the `using` keyword requires runtime support that may not be available
in all environments, we will simulate the pattern by calling `dispose()`
explicitly — but the class structure mirrors exactly what `using` would
automate.

## Instructions

1. In `task.ts`, implement the `FileHandle` class:
   - The constructor takes a `path: string` and stores it. The handle starts
     in an open state.
   - `read(): string` — returns `"content of {path}"` if open, throws
     `Error("Cannot read: handle is closed")` if closed.
   - `write(data: string): void` — stores the data (set a `lastWritten`
     property) if open, throws `Error("Cannot write: handle is closed")` if
     closed.
   - `dispose(): void` — marks the handle as closed. Must be idempotent
     (calling it twice does nothing harmful).
   - `isOpen(): boolean` — returns whether the handle is still open.

2. Implement `readFile(path: string): string`:
   - Creates a `FileHandle`, reads from it, disposes it, and returns the
     content. Must dispose even if `read()` throws.

3. Implement `copyContent(srcPath: string, destPath: string): CopyResult`:
   - Creates two `FileHandle` instances (source and destination).
   - Reads from source, writes to destination.
   - Disposes both handles (destination first, then source).
   - Returns `{ content: string; srcClosed: boolean; destClosed: boolean }`.
   - Both handles must be disposed even if an error occurs.

## Example

```typescript
const handle = new FileHandle("data.txt");
handle.read();       // "content of data.txt"
handle.isOpen();     // true
handle.dispose();
handle.isOpen();     // false

readFile("config.json"); // "content of config.json"

copyContent("a.txt", "b.txt");
// { content: "content of a.txt", srcClosed: true, destClosed: true }
```

<div class="hint">
Use a `try/finally` block in `readFile` and `copyContent` to guarantee
disposal. This is exactly the pattern that the `using` keyword automates —
you are implementing it manually here to understand the mechanics.
</div>
