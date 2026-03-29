// TODO: Build a Disposable-based resource pool that manages acquire/release/dispose
// of generic resources using the Symbol.dispose pattern.

// --- Symbol.dispose polyfill ---
// TODO: Polyfill Symbol.dispose if it doesn't exist so the symbol is available at runtime.
// Use: (Symbol as any).dispose ??= Symbol("Symbol.dispose");

// --- Disposable interface ---
// TODO: Export a Disposable interface with a [Symbol.dispose](): void method

// --- ManagedResource class ---
// TODO: Export a ManagedResource class implementing Disposable with:
//   readonly id: string  (set via constructor)
//   isOpen: boolean      (initially true)
//   [Symbol.dispose]()   (sets isOpen to false)
export class ManagedResource {
    readonly id: string;
    isOpen: boolean = true;

    constructor(id: string) {
        this.id = id;
    }

    // TODO: Implement [Symbol.dispose]() to set isOpen to false
}

// --- ResourcePool<T extends Disposable> ---
// TODO: Export a generic ResourcePool class that:
//   - Accepts an array of T resources in the constructor
//   - acquire(): T — takes a resource from available, moves to active, throws if empty
//   - release(resource: T): void — moves resource from active to available, throws if not active
//   - get activeCount(): number — number of active resources
//   - get availableCount(): number — number of available resources
//   - disposeAll(): void — calls [Symbol.dispose]() on all resources, clears both collections
export class ResourcePool<T> {
    constructor(resources: T[]) {
        // Write your solution here
    }

    acquire(): any {
        // Write your solution here
        return undefined;
    }

    release(resource: T): void {
        // Write your solution here
    }

    get activeCount(): number {
        // Write your solution here
        return 0;
    }

    get availableCount(): number {
        // Write your solution here
        return 0;
    }

    disposeAll(): void {
        // Write your solution here
    }
}
