// Do NOT modify this function
export function createOrder(item: string, quantity: number, unitPrice: number) {
    return {
        id: `order-${Date.now()}`,
        item,
        quantity,
        total: quantity * unitPrice,
    };
}

// TODO: Define OrderResult using ReturnType of createOrder
export type OrderResult = ReturnType<typeof createOrder>;

// TODO: Define OrderArgs using Parameters of createOrder
export type OrderArgs = Parameters<typeof createOrder>;

// TODO: Implement wrapCreateOrder
// Accept the same args as createOrder, call it, and add a processedAt: Date field
export function wrapCreateOrder(...args: Parameters<typeof createOrder>): ReturnType<typeof createOrder> & { processedAt: Date } {
    // Write your solution here
    return {} as any;
}

// TODO: Implement getFirstArg
// Return the first element of the args tuple
export function getFirstArg<T extends (...args: any[]) => any>(args: Parameters<T>): Parameters<T>[0] {
    // Write your solution here
    return undefined as any;
}
