// TODO: Implement the Stack<T> class (last in, first out)
// Methods: push, pop, peek, isEmpty, toArray
// Getter: size
export class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        // TODO: Add item to the top of the stack
    }

    pop(): T | undefined {
        // TODO: Remove and return the top item, or undefined if empty
        return undefined;
    }

    peek(): T | undefined {
        // TODO: Return the top item without removing it, or undefined if empty
        return undefined;
    }

    isEmpty(): boolean {
        // TODO: Return true if the stack has no items
        return true;
    }

    get size(): number {
        // TODO: Return the number of items
        return 0;
    }

    toArray(): T[] {
        // TODO: Return a copy of the internal items (bottom to top)
        return [];
    }
}

// TODO: Implement the Queue<T> class (first in, first out)
// Methods: enqueue, dequeue, front, isEmpty, toArray
// Getter: size
export class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        // TODO: Add item to the back of the queue
    }

    dequeue(): T | undefined {
        // TODO: Remove and return the front item, or undefined if empty
        return undefined;
    }

    front(): T | undefined {
        // TODO: Return the front item without removing it, or undefined if empty
        return undefined;
    }

    isEmpty(): boolean {
        // TODO: Return true if the queue has no items
        return true;
    }

    get size(): number {
        // TODO: Return the number of items
        return 0;
    }

    toArray(): T[] {
        // TODO: Return a copy of the internal items (front to back)
        return [];
    }
}
