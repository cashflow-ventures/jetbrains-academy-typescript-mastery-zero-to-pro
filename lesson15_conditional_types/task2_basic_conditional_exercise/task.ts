// TODO: Implement IsString<T>
// Resolves to true if T extends string, false otherwise
export type IsString<T> = any;

// TODO: Implement IsArray<T>
// Resolves to true if T extends any[], false otherwise
export type IsArray<T> = any;

// TODO: Implement TypeName<T>
// Maps: string → "string", number → "number", boolean → "boolean",
//       any[] → "array", everything else → "object"
export type TypeName<T> = any;

// TODO: Implement checkIsString
// Returns true if the runtime value is a string
export function checkIsString(value: unknown): boolean {
    // Write your solution here
    return false;
}

// TODO: Implement checkIsArray
// Returns true if the runtime value is an array
export function checkIsArray(value: unknown): boolean {
    // Write your solution here
    return false;
}

// TODO: Implement getTypeName
// Returns "string", "number", "boolean", "array", or "object"
export function getTypeName(value: unknown): string {
    // Write your solution here
    return "object";
}
