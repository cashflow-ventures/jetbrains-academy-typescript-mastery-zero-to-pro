// TODO: Export an interface User with id (number), name (string), email (string)

// TODO: Export an interface Product with id (number), title (string), price (number)

// TODO: Export a function createUser(id, name, email) that returns a User
export function createUser(id: number, name: string, email: string): { id: number; name: string; email: string } {
    // Write your solution here
    return { id: 0, name: "", email: "" };
}

// TODO: Export a function createProduct(id, title, price) that returns a Product
export function createProduct(id: number, title: string, price: number): { id: number; title: string; price: number } {
    // Write your solution here
    return { id: 0, title: "", price: 0 };
}

// TODO: Export a function formatUser(user) that returns "User(id): name <email>"
export function formatUser(user: { id: number; name: string; email: string }): string {
    // Write your solution here
    return "";
}

// TODO: Export a function formatProduct(product) that returns "Product(id): title - $XX.XX"
export function formatProduct(product: { id: number; title: string; price: number }): string {
    // Write your solution here
    return "";
}

// TODO: Export a function createBarrelSummary(users, products)
// Returns { userCount, productCount, summary: "X user(s), Y product(s)" }
export function createBarrelSummary(
    users: { id: number; name: string; email: string }[],
    products: { id: number; title: string; price: number }[]
): { userCount: number; productCount: number; summary: string } {
    // Write your solution here
    return { userCount: 0, productCount: 0, summary: "" };
}
