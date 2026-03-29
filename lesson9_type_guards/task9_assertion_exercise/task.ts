// TODO: Implement assertDefined
// Throw Error("<name> must be defined") if value is null or undefined
export function assertDefined<T>(
    value: T | null | undefined,
    name: string
): asserts value is T {
    // Write your solution here
}

// TODO: Implement assertIsString
// Throw Error("Expected string, got <typeof value>") if not a string
export function assertIsString(value: unknown): asserts value is string {
    // Write your solution here
}

// TODO: Implement assertPositive
// Throw Error("Expected positive number, got <value>") if not > 0
export function assertPositive(value: number): asserts value is number {
    // Write your solution here
}

// TODO: Implement safeTrim
// Use assertDefined to validate, then return trimmed string
export function safeTrim(value: string | null | undefined): string {
    // Write your solution here
    return "";
}
