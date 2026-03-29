// instanceof Guards — Narrowing Class Instances

class HttpError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

class TimeoutError extends Error {
    retryAfter: number;
    constructor(retryAfter: number) {
        super("Request timed out");
        this.retryAfter = retryAfter;
    }
}

// instanceof narrows to the specific class
function describeError(error: Error): string {
    if (error instanceof TimeoutError) {
        // error: TimeoutError — access retryAfter
        return `Timeout! Retry after ${error.retryAfter}ms`;
    }
    if (error instanceof HttpError) {
        // error: HttpError — access statusCode
        return `HTTP ${error.statusCode}: ${error.message}`;
    }
    // error: Error — base class only
    return `Error: ${error.message}`;
}

// Works with built-in classes too
function summarize(data: Date | RegExp | Error): string {
    if (data instanceof Date) {
        return `Date: ${data.toISOString()}`;
    }
    if (data instanceof RegExp) {
        return `Pattern: ${data.source}`;
    }
    return `Error: ${data.message}`;
}

console.log(describeError(new TimeoutError(3000)));
console.log(describeError(new HttpError(404, "Not Found")));
console.log(describeError(new Error("Something broke")));
console.log(summarize(new Date("2024-01-01")));
console.log(summarize(/^hello/i));
