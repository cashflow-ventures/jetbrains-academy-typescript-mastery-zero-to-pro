// Result type — represents success or failure
export type Result<T, E> =
    | { success: true; value: T }
    | { success: false; error: E };

// TODO: Implement ok — creates a success Result containing the value
export function ok<T>(value: T): Result<T, never> {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement err — creates a failure Result containing the error
export function err<E>(error: E): Result<never, E> {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement unwrapResult — returns the value if success, throws the error if failure
export function unwrapResult<T, E>(result: Result<T, E>): T {
    // Write your solution here
    return undefined as any;
}

// Optional type — represents a value that may or may not exist
export type Optional<T> =
    | { hasValue: true; value: T }
    | { hasValue: false };

// TODO: Implement some — creates an Optional containing a value
export function some<T>(value: T): Optional<T> {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement none — creates an empty Optional
export function none<T = never>(): Optional<T> {
    // Write your solution here
    return undefined as any;
}

// TODO: Implement mapOptional — transforms the value inside an Optional if present
// If the Optional has a value, apply the transform and return some(result)
// If the Optional is empty, return none()
export function mapOptional<T, U>(opt: Optional<T>, transform: (value: T) => U): Optional<U> {
    // Write your solution here
    return undefined as any;
}
