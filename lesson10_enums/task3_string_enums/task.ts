// String Enums — explicit string values, no reverse mapping

enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}

// Runtime values are readable strings
console.log(LogLevel.Debug); // "DEBUG"
console.log(LogLevel.Error); // "ERROR"

// String enums in a practical logging function
function log(level: LogLevel, message: string): string {
    return `[${level}] ${message}`;
}

console.log(log(LogLevel.Info, "Server started"));   // "[INFO] Server started"
console.log(log(LogLevel.Error, "Disk full"));       // "[ERROR] Disk full"

// String enum for API status — values match what the server sends
enum OrderStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Shipped = "shipped",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

function canCancel(status: OrderStatus): boolean {
    return status === OrderStatus.Pending
        || status === OrderStatus.Confirmed;
}

console.log(canCancel(OrderStatus.Pending));   // true
console.log(canCancel(OrderStatus.Shipped));   // false

// No reverse mapping — this would be undefined:
// console.log((OrderStatus as any)["pending"]); // undefined
