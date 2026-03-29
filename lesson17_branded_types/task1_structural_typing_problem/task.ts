// The Structural Typing Problem — Demonstration

// These type aliases look like they provide safety, but they don't.
type UserId = string;
type OrderId = string;

function getUser(id: UserId): string {
    return `Fetching user: ${id}`;
}

function getOrder(id: OrderId): string {
    return `Fetching order: ${id}`;
}

// Create values with "different" types
const userId: UserId = "user-abc-123";
const orderId: OrderId = "order-xyz-789";

// Correct usage — works as expected
console.log(getUser(userId));    // "Fetching user: user-abc-123"
console.log(getOrder(orderId));  // "Fetching order: order-xyz-789"

// BUG: Swapped IDs — no compiler error!
// TypeScript sees both as plain `string`, so this compiles fine.
console.log(getUser(orderId));   // "Fetching user: order-xyz-789" — wrong!
console.log(getOrder(userId));   // "Fetching order: user-abc-123" — wrong!

// The same problem with numbers
type USD = number;
type EUR = number;

function addDollars(a: USD, b: USD): USD {
    return a + b;
}

const priceUSD: USD = 100;
const priceEUR: EUR = 85;

// BUG: Mixing currencies — no compiler error!
const total = addDollars(priceUSD, priceEUR);
console.log(`Total: $${total}`); // $185 — but 85 was euros!
