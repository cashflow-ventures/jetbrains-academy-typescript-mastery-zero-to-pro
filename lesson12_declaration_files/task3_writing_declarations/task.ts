// TODO: Export an interface StringUtils with methods:
//   capitalize(str: string): string
//   reverse(str: string): string
//   countWords(str: string): number

// TODO: Export a function createStringUtils that returns a StringUtils object
export function createStringUtils(): { capitalize(str: string): string; reverse(str: string): string; countWords(str: string): number } {
    // Write your solution here
    return {
        capitalize: (_str: string): string => "",
        reverse: (_str: string): string => "",
        countWords: (_str: string): number => 0,
    };
}

// TODO: Export an interface MathLib with methods:
//   clamp(value: number, min: number, max: number): number
//   lerp(start: number, end: number, t: number): number
//   isPrime(n: number): boolean

// TODO: Export a function createMathLib that returns a MathLib object
export function createMathLib(): { clamp(value: number, min: number, max: number): number; lerp(start: number, end: number, t: number): number; isPrime(n: number): boolean } {
    // Write your solution here
    return {
        clamp: (_value: number, _min: number, _max: number): number => 0,
        lerp: (_start: number, _end: number, _t: number): number => 0,
        isPrime: (_n: number): boolean => false,
    };
}

// TODO: Export an interface TypeChecker with methods:
//   isString(value: unknown): boolean
//   isNumber(value: unknown): boolean
//   getTypeName(value: unknown): string

// TODO: Export a function createTypeChecker that returns a TypeChecker object
// For getTypeName, return "null" for null values (not "object")
export function createTypeChecker(): { isString(value: unknown): boolean; isNumber(value: unknown): boolean; getTypeName(value: unknown): string } {
    // Write your solution here
    return {
        isString: (_value: unknown): boolean => false,
        isNumber: (_value: unknown): boolean => false,
        getTypeName: (_value: unknown): string => "",
    };
}
