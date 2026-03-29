// Error Handling Patterns — Demonstration

// 1. The catch variable is `unknown` in strict TypeScript
function safeParse(json: string): unknown {
    try {
        return JSON.parse(json);
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            console.log(`Parse error: ${error.message}`);
        }
        return undefined;
    }
}

// 2. Custom error class hierarchy
class AppError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly statusCode: number
    ) {
        super(message);
        this.name = "AppError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class NotFoundError extends AppError {
    constructor(resource: string, id: string) {
        super(`${resource} '${id}' not found`, "NOT_FOUND", 404);
        this.name = "NotFoundError";
    }
}

// 3. Using instanceof to narrow caught errors
function handleError(error: unknown): string {
    if (error instanceof NotFoundError) {
        return `[${error.statusCode}] ${error.message}`;
    } else if (error instanceof AppError) {
        return `[${error.code}] ${error.message}`;
    } else if (error instanceof Error) {
        return `Unexpected: ${error.message}`;
    }
    return `Unknown error: ${String(error)}`;
}

// Demo
console.log(safeParse('{"valid": true}'));  // { valid: true }
console.log(safeParse("not json"));         // undefined

const err = new NotFoundError("User", "42");
console.log(handleError(err));              // [404] User '42' not found
console.log(err instanceof AppError);       // true
console.log(err instanceof NotFoundError);  // true
