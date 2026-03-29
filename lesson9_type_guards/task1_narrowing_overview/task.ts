// Type Narrowing — Control Flow Analysis in Action

type Input = string | number | boolean;

// TypeScript narrows the type at each branch
function describeInput(input: Input): string {
    if (typeof input === "string") {
        // input: string
        return `String of length ${input.length}: "${input}"`;
    }
    if (typeof input === "number") {
        // input: number
        return `Number value: ${input.toFixed(2)}`;
    }
    // input: boolean (only possibility left)
    return `Boolean: ${input ? "true" : "false"}`;
}

// Narrowing with equality checks
function handleNullable(value: string | null | undefined): string {
    if (value === null) {
        return "was null";
    }
    if (value === undefined) {
        return "was undefined";
    }
    // value: string
    return value.toUpperCase();
}

// Narrowing with truthiness
function formatName(name: string | undefined): string {
    if (name) {
        return name.trim(); // name: string (undefined removed)
    }
    return "Anonymous";
}

console.log(describeInput("hello"));    // String of length 5: "hello"
console.log(describeInput(42));          // Number value: 42.00
console.log(describeInput(true));        // Boolean: true
console.log(handleNullable(null));       // was null
console.log(handleNullable("TypeScript")); // TYPESCRIPT
console.log(formatName(undefined));      // Anonymous
