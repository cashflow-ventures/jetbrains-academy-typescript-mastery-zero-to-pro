// TODO: Export an interface Product with id (number), name (string), price (number)

// TODO: Export a function createProduct that takes id, name, price and returns a Product
export function createProduct(id: number, name: string, price: number): { id: number; name: string; price: number } {
    // Write your solution here
    return { id: 0, name: "", price: 0 };
}

// TODO: Export a function formatPrice that takes a Product and returns "Name: $X.XX"
export function formatPrice(product: { name: string; price: number }): string {
    // Write your solution here
    return "";
}

// TODO: Export a constant DEFAULT_PRODUCT of type Product
// id: 0, name: "Unknown", price: 0
export const DEFAULT_PRODUCT: { id: number; name: string; price: number } = {
    id: -1,
    name: "",
    price: -1,
};

// TODO: Export a function getExpensiveProducts
// Takes an array of Products and a minPrice number
// Returns products with price >= minPrice
export function getExpensiveProducts(
    products: { id: number; name: string; price: number }[],
    minPrice: number
): { id: number; name: string; price: number }[] {
    // Write your solution here
    return [];
}
