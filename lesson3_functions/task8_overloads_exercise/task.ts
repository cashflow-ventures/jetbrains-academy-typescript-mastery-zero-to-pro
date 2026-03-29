// TODO: Implement the formatValue function with overloads
// Overload 1: formatValue(value: string) => string — returns the string in uppercase
// Overload 2: formatValue(value: number) => string — returns the number with 2 decimal places
// Overload 3: formatValue(value: Date) => string — returns the date in "YYYY-MM-DD" format
//
// Hints:
// - Use typeof to check for string and number
// - Use instanceof to check for Date
// - Use .toFixed(2) for numbers
// - For dates, use .getFullYear(), .getMonth() + 1, .getDate()
//   and pad month/day with leading zeros using .toString().padStart(2, "0")

export function formatValue(value: string): string;
export function formatValue(value: number): string;
export function formatValue(value: Date): string;
export function formatValue(value: string | number | Date): string {
    // Write your solution here
    return "";
}

// TODO: Implement the pickFirst function with overloads
// Overload 1: pickFirst(items: string[]) => string — returns the first string
// Overload 2: pickFirst(items: number[]) => number — returns the first number
//
// You can assume the arrays are non-empty.

export function pickFirst(items: string[]): string;
export function pickFirst(items: number[]): number;
export function pickFirst(items: string[] | number[]): string | number {
    // Write your solution here
    return "";
}
