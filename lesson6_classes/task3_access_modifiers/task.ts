// Access Modifiers — public, private, protected, readonly, parameter properties

// 1. A class using all four access modifiers
class Employee {
    public name: string;
    private salary: number;
    protected department: string;
    readonly id: number;

    constructor(name: string, salary: number, department: string, id: number) {
        this.name = name;
        this.salary = salary;
        this.department = department;
        this.id = id;
    }

    // Public method — accessible everywhere
    public getInfo(): string {
        return `${this.name} (ID: ${this.id}) — ${this.department}`;
    }

    // Private method — only accessible inside Employee
    private formatSalary(): string {
        return `$${this.salary.toLocaleString()}`;
    }

    // Public method that uses the private method internally
    public getSalaryReport(): string {
        return `${this.name} earns ${this.formatSalary()}`;
    }
}

const emp = new Employee("Alice", 85000, "Engineering", 1);
console.log(emp.getInfo());         // "Alice (ID: 1) — Engineering"
console.log(emp.getSalaryReport()); // "Alice earns $85,000"

// 2. Parameter properties — the concise shorthand
class Product {
    constructor(
        public readonly name: string,
        private price: number,
        public inStock: boolean = true
    ) {}

    getPrice(): number {
        return this.price;
    }
}

const laptop = new Product("Laptop", 999);
console.log(laptop.name);       // "Laptop"
console.log(laptop.getPrice()); // 999
console.log(laptop.inStock);    // true
