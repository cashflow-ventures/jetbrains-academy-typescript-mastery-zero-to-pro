// Type Aliases vs Interfaces — when to use each

// 1. Interface — best for object shapes
interface User {
    name: string;
    email: string;
}

// 2. Type alias — can represent anything, not just objects
type ID = string | number;
type Pair = [string, number];
type Formatter = (value: string) => string;

// 3. Both can describe objects
type PointType = { x: number; y: number };
interface PointInterface { x: number; y: number }

// 4. Extending: interface uses extends, type uses &
interface Employee extends User {
    role: string;
}

type Contractor = User & { company: string };

// 5. Declaration merging — only interfaces support this
interface AppConfig {
    theme: string;
}
interface AppConfig {
    version: number;
}
// AppConfig now has both theme and version
const config: AppConfig = { theme: "dark", version: 2 };

// 6. Unions — only type aliases can do this
type Status = "active" | "inactive" | "pending";

// 7. Using them together
const emp: Employee = { name: "Alice", email: "a@b.com", role: "Dev" };
const contractor: Contractor = { name: "Bob", email: "b@c.com", company: "Acme" };
const userId: ID = 42;
const status: Status = "active";

console.log(`${emp.name} (${emp.role})`);
console.log(`${contractor.name} @ ${contractor.company}`);
console.log(`User ID: ${userId}, Status: ${status}`);
console.log(`Config: ${config.theme} v${config.version}`);
