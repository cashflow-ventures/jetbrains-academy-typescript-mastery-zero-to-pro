export class ValidationError extends Error {
    field: string;
    constructor(field: string, message: string) {
        super(message);
        this.field = field;
    }
}

export class NotFoundError extends Error {
    resource: string;
    id: string;
    constructor(resource: string, id: string) {
        super(`${resource} not found`);
        this.resource = resource;
        this.id = id;
    }
}

export class NetworkError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

// TODO: Implement getErrorMessage
// Use instanceof to return a specific message format for each error type
export function getErrorMessage(error: Error): string {
    // Write your solution here
    return "";
}

// TODO: Implement getErrorCode
// Return 400 for ValidationError, 404 for NotFoundError,
// the statusCode for NetworkError, or 500 for anything else
export function getErrorCode(error: Error): number {
    // Write your solution here
    return 0;
}

// TODO: Implement isRetryable
// Only NetworkError with statusCode 429 or 503 is retryable
export function isRetryable(error: Error): boolean {
    // Write your solution here
    return false;
}
