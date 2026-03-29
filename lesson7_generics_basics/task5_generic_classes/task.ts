// Generic Classes — type-safe data structures with type parameters

// 1. A simple generic container class
class Box<T> {
    private content: T;

    constructor(content: T) {
        this.content = content;
    }

    getContent(): T {
        return this.content;
    }

    setContent(newContent: T): void {
        this.content = newContent;
    }
}

const numBox = new Box(100);        // Box<number>
const strBox = new Box("generics"); // Box<string>
console.log(numBox.getContent());   // 100
console.log(strBox.getContent());   // "generics"

// 2. A generic Stack — last in, first out
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const stack = new Stack<number>();
stack.push(10);
stack.push(20);
console.log(stack.peek()); // 20
console.log(stack.pop());  // 20
console.log(stack.size);   // 1
