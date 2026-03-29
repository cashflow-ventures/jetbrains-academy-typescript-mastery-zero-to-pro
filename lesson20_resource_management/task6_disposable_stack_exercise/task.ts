// TODO: Implement ManagedResource
// - constructor(name: string) — stores name, starts open
// - operate(action: string): string — returns "{name}: {action}" or throws if closed
// - dispose(): void — marks as closed (idempotent)
// - isClosed(): boolean — returns whether disposed

export interface TransactionResult {
    results: string[];
    allClosed: boolean;
}

export class ManagedResource {
    constructor(public readonly name: string) {
        // Write your solution here
    }

    operate(action: string): string {
        // Write your solution here
        return "";
    }

    dispose(): void {
        // Write your solution here
    }

    isClosed(): boolean {
        // Write your solution here
        return false;
    }
}

// TODO: Implement TransactionManager
// - acquire(name: string): ManagedResource — creates and stores a resource
// - execute(action: string): string[] — calls operate(action) on all resources
// - rollback(): void — disposes all resources in reverse order, clears list
// - getResources(): ManagedResource[] — returns a copy of the resource array

export class TransactionManager {
    constructor() {
        // Write your solution here
    }

    acquire(name: string): ManagedResource {
        // Write your solution here
        return new ManagedResource(name);
    }

    execute(action: string): string[] {
        // Write your solution here
        return [];
    }

    rollback(): void {
        // Write your solution here
    }

    getResources(): ManagedResource[] {
        // Write your solution here
        return [];
    }
}

// TODO: Implement runTransaction
// Creates a TransactionManager, acquires resources for each name,
// executes the action, rolls back, and returns TransactionResult
export function runTransaction(names: string[], action: string): TransactionResult {
    // Write your solution here
    return { results: [], allClosed: true };
}
