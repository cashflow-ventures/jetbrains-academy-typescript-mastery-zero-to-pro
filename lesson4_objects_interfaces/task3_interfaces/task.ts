// Interfaces — named, reusable object shapes

// 1. Basic interface
interface User {
    name: string;
    age: number;
    email: string;
}

function greetUser(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const alice: User = { name: "Alice", age: 30, email: "alice@example.com" };
console.log(greetUser(alice));

// 2. Extending interfaces — Employee inherits from Person
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    company: string;
    role: string;
}

const bob: Employee = { name: "Bob", age: 25, company: "Acme", role: "Developer" };
console.log(`${bob.name} works at ${bob.company} as a ${bob.role}`);

// 3. Optional and readonly properties
interface Config {
    readonly apiUrl: string;
    timeout?: number;
    retries?: number;
}

const config: Config = { apiUrl: "https://api.example.com", timeout: 5000 };
console.log(`API: ${config.apiUrl}, timeout: ${config.timeout ?? "default"}`);
// config.apiUrl = "..."; // Error: Cannot assign to 'apiUrl'

// 4. Declaration merging — same interface name, merged automatically
interface AppSettings {
    theme: string;
}

interface AppSettings {
    language: string;
}

// AppSettings now has both theme and language
const settings: AppSettings = { theme: "dark", language: "en" };
console.log(`Theme: ${settings.theme}, Language: ${settings.language}`);
