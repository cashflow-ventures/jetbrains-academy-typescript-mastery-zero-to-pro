// TODO: Define a WithId type with id (number)
export type WithId = {
    // Define property here
};

// TODO: Define a WithTimestamps type with createdAt (string) and updatedAt (string)
export type WithTimestamps = {
    // Define properties here
};

// TODO: Define a BaseProduct type with name (string) and price (number)
export type BaseProduct = {
    // Define properties here
};

// TODO: Define a Product type as the intersection of WithId, WithTimestamps, and BaseProduct
export type Product = WithId; // Fix this

// TODO: Implement createProduct
// Takes id, name, price and returns a Product
// Set createdAt and updatedAt to the provided timestamp string
export function createProduct(
    id: number,
    name: string,
    price: number,
    timestamp: string
): Product {
    // Write your solution here
    return {} as Product;
}

// TODO: Implement applyDiscount
// Takes a Product and a discount percentage (0-100)
// Returns a new Product with the discounted price (rounded to 2 decimal places)
// All other properties stay the same
export function applyDiscount(product: Product, discountPercent: number): Product {
    // Write your solution here
    return {} as Product;
}

// TODO: Implement summarizeProduct
// Takes a Product and returns "name - $price (id: id)"
export function summarizeProduct(product: Product): string {
    // Write your solution here
    return "";
}
