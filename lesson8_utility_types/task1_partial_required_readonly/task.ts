// Partial, Required, and Readonly in action

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

// Partial<T> — all properties become optional
function updateProduct(current: Product, patch: Partial<Product>): Product {
    return { ...current, ...patch };
}

// Required<T> — all properties become mandatory
function createProduct(data: Required<Product>): Product {
    return { ...data };
}

// Readonly<T> — all properties become read-only
function freezeProduct(product: Product): Readonly<Product> {
    return product;
}

// Usage
const laptop: Product = { id: 1, name: "Laptop", price: 999 };

const updated = updateProduct(laptop, { price: 899 });
console.log(updated); // { id: 1, name: "Laptop", price: 899 }

const full = createProduct({ id: 2, name: "Mouse", price: 29, description: "Wireless mouse" });
console.log(full); // { id: 2, name: "Mouse", price: 29, description: "Wireless mouse" }

const frozen = freezeProduct(laptop);
// frozen.price = 0;  // Error: Cannot assign to 'price' because it is a read-only property
console.log(frozen.name); // "Laptop"
