// Stores log entries from @log decorated methods
export const callLog: string[] = [];

// TODO: Implement the validate decorator factory
// Takes a validator function: (...args: any[]) => boolean
// If validator returns false, throw Error("Validation failed for {methodName}")
// If validator returns true, call and return the original method
export function validate(validator: (...args: any[]) => boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void {
        // Write your solution here
    };
}

// TODO: Implement the log decorator
// Push "called {methodName}" into callLog before calling the original method
// Return the original result unchanged
export function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    // Write your solution here
}

// TODO: Implement the OrderService class
// - createOrder(item: string, quantity: number): string
//   Decorated with @log on top, @validate (quantity > 0) below
//   Returns "Order: {quantity}x {item}"
// - cancelOrder(orderId: string): string
//   Decorated with @log
//   Returns "Cancelled: {orderId}"
export class OrderService {
    @log
    @validate((...args: any[]) => args[1] > 0)
    createOrder(item: string, quantity: number): string {
        // Write your solution here
        return "";
    }

    @log
    cancelOrder(orderId: string): string {
        // Write your solution here
        return "";
    }
}
