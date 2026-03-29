// keyof and Indexed Access Types — Demonstration

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

// keyof produces a union of property name literals
type ProductKey = keyof Product; // "id" | "name" | "price" | "inStock"

// Indexed access looks up the type of a property
type ProductName = Product["name"];       // string
type ProductPrice = Product["price"];     // number
type AnyValue = Product[keyof Product];   // number | string | boolean

// Type-safe property getter
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Type-safe property setter
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
    obj[key] = value;
}

// Pick multiple properties type-safely
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    for (const key of keys) {
        result[key] = obj[key];
    }
    return result;
}

// --- Usage ---
const laptop: Product = { id: 1, name: "Laptop", price: 999, inStock: true };

const name = getProperty(laptop, "name");   // string: "Laptop"
const price = getProperty(laptop, "price"); // number: 999
console.log(`${name}: $${price}`);

setProperty(laptop, "price", 899);
console.log("New price:", laptop.price);

const summary = pick(laptop, ["name", "price"]);
console.log("Summary:", summary); // { name: "Laptop", price: 899 }
