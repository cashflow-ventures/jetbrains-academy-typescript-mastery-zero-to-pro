// TODO: Build a type-safe validation layer using generics, mapped types,
// and the satisfies operator. This capstone exercise ties together many
// advanced TypeScript concepts into a practical, reusable system.

// --- ValidationError ---
// TODO: Export a ValidationError interface with field (string) and message (string)

// --- Result<T, E> ---
// TODO: Export a generic Result<T, E> type:
//   Success: { ok: true; value: T }
//   Failure: { ok: false; errors: E }

// --- Validator<T> (mapped type) ---
// TODO: Export a Validator<T> mapped type that maps each property K of T
// to a function (value: T[K]) => string | null

// --- validate function ---
// TODO: Export a validate<T> function that runs all validators against data
// and returns Result<T, ValidationError[]>
export function validate(data: any, validator: any): any {
    // Write your solution here
    return { ok: true, value: data };
}

// --- Validator factories ---
// TODO: Export isNonEmpty(fieldName: string) => (value: string) => string | null
export function isNonEmpty(fieldName: string): any {
    // Write your solution here
    return undefined;
}

// TODO: Export isEmail(fieldName: string) => (value: string) => string | null
export function isEmail(fieldName: string): any {
    // Write your solution here
    return undefined;
}

// TODO: Export isPositive(fieldName: string) => (value: number) => string | null
export function isPositive(fieldName: string): any {
    // Write your solution here
    return undefined;
}

// --- UserInput interface ---
// TODO: Export a UserInput interface with name (string), email (string), age (number)

// --- userValidator with satisfies ---
// TODO: Export a userValidator object using satisfies Validator<UserInput>
// Use isNonEmpty for name, isEmail for email, isPositive for age
export const userValidator = {} as any;
