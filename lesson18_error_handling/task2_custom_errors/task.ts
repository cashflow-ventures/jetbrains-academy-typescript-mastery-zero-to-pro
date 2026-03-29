// TODO: Implement AppError extending Error
// Constructor: (message: string, code: string, statusCode: number)
// Public readonly properties: code, statusCode
// Set this.name = "AppError"
// Fix prototype: Object.setPrototypeOf(this, new.target.prototype)
export class AppError extends Error {
    public readonly code: string = "";
    public readonly statusCode: number = 0;

    constructor(message: string, code: string, statusCode: number) {
        super(message);
        // Write your solution here
    }
}

// TODO: Implement ValidationError extending AppError
// Constructor: (message: string, field: string)
// Public readonly property: field
// Calls super with code "VALIDATION_ERROR" and statusCode 400
// Set this.name = "ValidationError"
export class ValidationError extends AppError {
    public readonly field: string = "";

    constructor(message: string, field: string) {
        super(message, "VALIDATION_ERROR", 400);
        // Write your solution here
    }
}

// TODO: Implement NotFoundError extending AppError
// Constructor: (resource: string, id: string)
// Public readonly properties: resource, id
// Message: `${resource} with id '${id}' not found`
// Calls super with code "NOT_FOUND" and statusCode 404
// Set this.name = "NotFoundError"
export class NotFoundError extends AppError {
    public readonly resource: string = "";
    public readonly id: string = "";

    constructor(resource: string, id: string) {
        super("", "NOT_FOUND", 404);
        // Write your solution here
    }
}

// TODO: Implement handleAppError
// Narrows unknown error and returns a descriptive string
export function handleAppError(error: unknown): string {
    // Write your solution here
    return "";
}
