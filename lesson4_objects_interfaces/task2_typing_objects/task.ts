// TODO: Declare a counter variable for product IDs, starting at 0
let nextId: number = 0;

// TODO: Implement formatAddress
// Takes an object with street (string), city (string), and optional zip (string)
// Returns "street, city" or "street, city zip" if zip is provided
export function formatAddress(address: { street: string; city: string; zip?: string }): string {
    // Write your solution here
    return "";
}

// TODO: Implement createProduct
// Takes name (string) and price (number)
// Returns an object with id (number), name (string), and price (number)
// The id should auto-increment starting at 1
export function createProduct(name: string, price: number): { id: number; name: string; price: number } {
    // Write your solution here
    return { id: 0, name: "", price: 0 };
}

// TODO: Implement getFullName
// Takes an object with first (string), last (string), and optional middle (string)
// Returns "first last" or "first middle last" if middle is provided
export function getFullName(person: { first: string; last: string; middle?: string }): string {
    // Write your solution here
    return "";
}
