// Object Type Literals — inline object types in TypeScript

// 1. Basic object type literal as a function parameter
function printUser(user: { name: string; age: number }): void {
    console.log(`${user.name} is ${user.age} years old.`);
}

printUser({ name: "Alice", age: 30 });

// 2. Optional properties — use ? to mark a property as optional
function greetUser(user: { name: string; title?: string }): string {
    if (user.title) {
        return `Hello, ${user.title} ${user.name}!`;
    }
    return `Hello, ${user.name}!`;
}

console.log(greetUser({ name: "Alice" }));               // "Hello, Alice!"
console.log(greetUser({ name: "Alice", title: "Dr." })); // "Hello, Dr. Alice!"

// 3. Readonly properties — prevent reassignment after creation
const product: { readonly id: number; name: string; price: number } = {
    id: 1,
    name: "Widget",
    price: 9.99,
};

product.name = "Super Widget"; // OK — name is not readonly
// product.id = 2;             // Error: Cannot assign to 'id' because it is read-only

console.log(`Product: ${product.id} - ${product.name} ($${product.price})`);

// 4. Object type as a return type
function createPoint(x: number, y: number): { x: number; y: number } {
    return { x, y };
}

const origin = createPoint(0, 0);
console.log(`Point: (${origin.x}, ${origin.y})`);
