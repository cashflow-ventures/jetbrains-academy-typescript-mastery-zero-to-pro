// Pick and Omit — deriving types from a single source

interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    salary: number;
    hireDate: Date;
}

// Pick: select only the properties you need
type EmployeeCard = Pick<Employee, "id" | "name" | "department">;

const card: EmployeeCard = {
    id: 1,
    name: "Alice",
    department: "Engineering",
};

// Omit: exclude sensitive or auto-generated fields
type NewEmployeeInput = Omit<Employee, "id" | "hireDate">;

const newHire: NewEmployeeInput = {
    name: "Bob",
    email: "bob@company.com",
    department: "Design",
    salary: 75000,
};

// Composing: Omit + Partial for update payloads
type UpdateEmployeeInput = Partial<Omit<Employee, "id" | "hireDate">>;

const patch: UpdateEmployeeInput = { salary: 80000 };

console.log("Card:", card);
console.log("New hire:", newHire);
console.log("Patch:", patch);
