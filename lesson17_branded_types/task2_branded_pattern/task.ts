// The Branded Type Pattern — Demonstration

// Reusable Brand utility type
declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

// Define branded types for different domain concepts
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
type Email = Brand<string, "Email">;

// Smart constructor with validation for Email
function createEmail(input: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        throw new Error(`Invalid email: ${input}`);
    }
    return input as Email;
}

// Simple constructors for IDs
function createUserId(id: string): UserId {
    return id as UserId;
}

function createOrderId(id: string): OrderId {
    return id as OrderId;
}

// Functions that require specific branded types
function getUser(id: UserId): string {
    return `User: ${id}`;
}

function sendEmail(to: Email, subject: string): string {
    return `Sending "${subject}" to ${to}`;
}

// Usage — type-safe at compile time, plain strings at runtime
const userId = createUserId("user-abc");
const orderId = createOrderId("order-xyz");
const email = createEmail("alice@example.com");

console.log(getUser(userId));              // OK
console.log(sendEmail(email, "Welcome!")); // OK

// These would cause compile errors (uncomment to see):
// getUser(orderId);        // Error: OrderId is not assignable to UserId
// sendEmail("raw", "Hi");  // Error: string is not assignable to Email

// Branded values are still plain strings at runtime
console.log(typeof userId);  // "string"
console.log(userId.length);  // 8
