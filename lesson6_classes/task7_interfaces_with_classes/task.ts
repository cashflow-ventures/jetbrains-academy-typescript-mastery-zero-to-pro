// Interfaces with Classes — implements, multiple interfaces, structural typing

// 1. A class implementing a single interface
interface Printable {
    print(): string;
}

class Invoice implements Printable {
    constructor(
        public id: number,
        public amount: number
    ) {}

    print(): string {
        return `Invoice #${this.id}: $${this.amount}`;
    }
}

const inv = new Invoice(1001, 250);
console.log(inv.print()); // "Invoice #1001: $250"

// 2. A class implementing multiple interfaces
interface Serializable {
    serialize(): string;
}

interface Loggable {
    log(): void;
}

class UserRecord implements Serializable, Loggable {
    constructor(public name: string, public email: string) {}

    serialize(): string {
        return JSON.stringify({ name: this.name, email: this.email });
    }

    log(): void {
        console.log(`[UserRecord] ${this.name} <${this.email}>`);
    }
}

const user = new UserRecord("Alice", "alice@example.com");
console.log(user.serialize());
user.log();

// 3. Structural typing — no "implements" needed for compatibility
interface HasLength {
    length: number;
}

function printLength(item: HasLength): void {
    console.log(`Length: ${item.length}`);
}

// Arrays and strings structurally match HasLength
printLength([1, 2, 3]);    // Length: 3
printLength("hello");      // Length: 5
printLength({ length: 42 }); // Length: 42
