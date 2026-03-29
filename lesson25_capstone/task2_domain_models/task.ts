// TODO: Build a complete domain model for an e-commerce system.
// This capstone exercise combines branded types, interfaces, unions,
// generics, and utility functions — everything from the course.

// --- Branded Types ---
// TODO: Create a UserId branded type (string & { readonly __brand: ... })
// TODO: Create a ProductId branded type (string & { readonly __brand: ... })
// TODO: Export factory functions createUserId and createProductId

// --- User ---
// TODO: Export a User interface with id (UserId), name, email, role ("admin" | "customer")

// --- Product ---
// TODO: Export a Product interface with id (ProductId), name, price, category ("electronics" | "clothing" | "food")

// --- OrderItem ---
// TODO: Export an OrderItem interface with productId (ProductId), quantity, unitPrice

// --- OrderStatus (discriminated union) ---
// TODO: Export an OrderStatus type — a union of:
//   { status: "pending" }
//   { status: "shipped"; trackingNumber: string }
//   { status: "delivered"; deliveredAt: string }
//   { status: "cancelled"; reason: string }

// --- Order ---
// TODO: Export an Order interface with id (string), userId (UserId), items (OrderItem[]), orderStatus (OrderStatus)

// --- calculateOrderTotal ---
// TODO: Export a function that sums quantity * unitPrice for all items in an order
export function calculateOrderTotal(order: any): number {
    // Write your solution here
    return 0;
}

// --- Result<T, E> ---
// TODO: Export a Result<T, E> generic type:
//   Success: { ok: true; value: T }
//   Failure: { ok: false; error: E }

// TODO: Export ok<T>(value: T): Result<T, never>
export function ok(value: any): any {
    // Write your solution here
    return undefined;
}

// TODO: Export err<E>(error: E): Result<never, E>
export function err(error: any): any {
    // Write your solution here
    return undefined;
}
