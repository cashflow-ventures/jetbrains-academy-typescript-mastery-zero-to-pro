// Result discriminated union — provided for you
export type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

// TODO: Implement ok — wraps a value in a success Result
export function ok<T>(value: T): Result<T, never> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement err — wraps an error in a failure Result
export function err<E>(error: E): Result<never, E> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement mapResult — transforms the success value with fn
// If result is ok, return ok(fn(result.value))
// If result is error, return it unchanged
export function mapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => U
): Result<U, E> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement flatMapResult — chains a fallible operation
// If result is ok, return fn(result.value) which itself returns a Result
// If result is error, return it unchanged
export function flatMapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
): Result<U, E> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement unwrapOr — extract value or use default
// If result is ok, return result.value
// If result is error, return defaultValue
export function unwrapOr<T, E>(
    result: Result<T, E>,
    defaultValue: T
): T {
    // Write your solution here
    return defaultValue;
}
