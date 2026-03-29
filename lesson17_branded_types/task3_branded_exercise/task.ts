// TODO: Define a Brand utility type
// Brand<T, B> should produce T & { readonly __brand: B }
export type Brand<T, B extends string> = any;

// TODO: Define branded types using Brand
export type UserId = any;
export type OrderId = any;
export type Email = any;

// TODO: Implement createUserId
// Throws "UserId cannot be empty" if input is empty string
export function createUserId(id: string): UserId {
    // Write your solution here
    return "" as any;
}

// TODO: Implement createOrderId
// Throws "OrderId cannot be empty" if input is empty string
export function createOrderId(id: string): OrderId {
    // Write your solution here
    return "" as any;
}

// TODO: Implement createEmail
// Validates with /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Throws "Invalid email: <input>" if invalid
export function createEmail(input: string): Email {
    // Write your solution here
    return "" as any;
}

// TODO: Implement formatUserEmail
// Returns "User <userId> <<email>>"
export function formatUserEmail(userId: UserId, email: Email): string {
    // Write your solution here
    return "";
}
