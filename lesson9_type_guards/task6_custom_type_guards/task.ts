// Custom Type Guards — user-defined narrowing functions

interface Cat {
    kind: "cat";
    purr: () => string;
}

interface Dog {
    kind: "dog";
    bark: () => string;
}

type Pet = Cat | Dog;

// A custom type guard: returns "pet is Cat"
function isCat(pet: Pet): pet is Cat {
    return pet.kind === "cat";
}

function interact(pet: Pet): string {
    if (isCat(pet)) {
        return pet.purr();   // pet: Cat
    }
    return pet.bark();       // pet: Dog
}

// Guarding unknown values from external data
interface Product {
    name: string;
    price: number;
}

function isProduct(value: unknown): value is Product {
    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "price" in value &&
        typeof (value as Product).name === "string" &&
        typeof (value as Product).price === "number"
    );
}

// Usage with unknown data
const rawData: unknown = JSON.parse('{"name": "Widget", "price": 9.99}');

if (isProduct(rawData)) {
    console.log(`${rawData.name}: $${rawData.price.toFixed(2)}`);
} else {
    console.log("Invalid product data");
}

const cat: Pet = { kind: "cat", purr: () => "Purrrr" };
const dog: Pet = { kind: "dog", bark: () => "Woof!" };
console.log(interact(cat));  // Purrrr
console.log(interact(dog));  // Woof!
