// Result type and helpers — provided for you
export type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}

export function flatMapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
): Result<U, E> {
    if (result.ok) return fn(result.value);
    return result;
}

// TODO: Implement parseInteger
// Check for empty trimmed input first. Then parse with Number().
// Return err for NaN or non-integer values.
export function parseInteger(input: string): Result<number, string> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement validateRange
// Returns a function that checks if a value is within [min, max]
export function validateRange(
    min: number,
    max: number
): (value: number) => Result<number, string> {
    // Write your solution here
    return () => ({} as any);
}

// TODO: Implement parseAndValidate
// Compose parseInteger and validateRange using flatMapResult
export function parseAndValidate(
    input: string,
    min: number,
    max: number
): Result<number, string> {
    // Write your solution here
    return {} as any;
}

// TODO: Implement collectResults
// If all ok, return ok with array of values. If any error, return first error.
export function collectResults<T, E>(
    results: Result<T, E>[]
): Result<T[], E> {
    // Write your solution here
    return {} as any;
}
