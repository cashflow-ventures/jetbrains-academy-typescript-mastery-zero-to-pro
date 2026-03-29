// The Result Pattern — Demonstration

// Discriminated union: success or failure
type Result<T, E> =
    | { ok: true; value: T }
    | { ok: false; error: E };

// Helper constructors
function ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}

// A function that returns Result instead of throwing
function parseAge(input: string): Result<number, string> {
    const n = Number(input);
    if (isNaN(n)) return err(`'${input}' is not a number`);
    if (n < 0) return err("Age cannot be negative");
    if (n > 150) return err("Age seems unrealistic");
    return ok(n);
}

// map: transform the success value
function mapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => U
): Result<U, E> {
    if (result.ok) return ok(fn(result.value));
    return result;
}

// flatMap: chain fallible operations
function flatMapResult<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>
): Result<U, E> {
    if (result.ok) return fn(result.value);
    return result;
}

// Usage: composing multiple fallible steps
const ageResult = parseAge("25");
const adultResult = flatMapResult(ageResult, (age) =>
    age >= 18 ? ok(age) : err("Must be 18 or older")
);
const doubled = mapResult(adultResult, (age) => age * 2);

console.log(doubled); // { ok: true, value: 50 }

// Error case flows through the chain
const badResult = parseAge("abc");
const chained = mapResult(badResult, (age) => age * 2);
console.log(chained); // { ok: false, error: "'abc' is not a number" }
