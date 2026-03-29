// TODO: Define Brand utility type
export type Brand<T, B extends string> = any;

// TODO: Define branded types
export type CustomerId = any;
export type ProductId = any;
export type Quantity = any;

// Order interface using branded types
export interface Order {
    customerId: CustomerId;
    productId: ProductId;
    quantity: Quantity;
    total: number;
}

// TODO: Implement createCustomerId
// Throws "CustomerId cannot be empty" if empty
export function createCustomerId(id: string): CustomerId {
    // Write your solution here
    return "" as any;
}

// TODO: Implement createProductId
// Throws "ProductId cannot be empty" if empty
export function createProductId(id: string): ProductId {
    // Write your solution here
    return "" as any;
}

// TODO: Implement createQuantity
// Throws "Quantity must be a positive integer" if not positive integer
export function createQuantity(n: number): Quantity {
    // Write your solution here
    return 0 as any;
}

// TODO: Implement createOrder
// total = quantity (as number) * 9.99
export function createOrder(
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
): Order {
    // Write your solution here
    return {} as any;
}

// TODO: Implement orderSummary
// "Order: <qty>x <productId> for customer <customerId> = $<total>"
// total formatted to 2 decimal places
export function orderSummary(order: Order): string {
    // Write your solution here
    return "";
}
