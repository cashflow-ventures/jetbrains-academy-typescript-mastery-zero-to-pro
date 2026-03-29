// Why TypeScript?
// This file demonstrates the practical benefits of TypeScript over plain JavaScript.

// 1. Catching bugs at compile time
// Without types, this function could receive anything — and silently break.
// With types, the compiler ensures only valid inputs are passed.
function calculateTotal(price: number, quantity: number): number {
    return price * quantity;
}

const total: number = calculateTotal(9.99, 3);
console.log(`Total: $${total.toFixed(2)}`); // "Total: $29.97"

// Uncommenting the next line would cause a compile-time error:
// calculateTotal("ten", 3); // Error: Argument of type 'string' is not assignable

// 2. IDE support — your editor understands these types
interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

const laptop: Product = {
    name: "MacBook Pro",
    price: 2499,
    inStock: true,
};

// Your IDE autocompletes `laptop.` with name, price, and inStock
console.log(`${laptop.name}: $${laptop.price}`);

// 3. Refactoring confidence — rename a property and the compiler
//    flags every usage that needs updating
function formatProduct(product: Product): string {
    return `${product.name} — $${product.price} (${product.inStock ? "Available" : "Sold out"})`;
}

console.log(formatProduct(laptop));
