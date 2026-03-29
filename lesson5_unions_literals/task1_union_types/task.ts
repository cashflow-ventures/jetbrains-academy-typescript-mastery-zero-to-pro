// Union Types — combining multiple types with the | operator

// 1. Basic union type — a variable that can hold a string or number
let visitorId: string | number;
visitorId = "abc-123";
visitorId = 42;
console.log(`User ID: ${visitorId}`);

// 2. Union type in a function parameter with narrowing
function formatId(id: string | number): string {
    if (typeof id === "string") {
        return id.toUpperCase();
    }
    return id.toFixed(2);
}

console.log(formatId("abc"));  // "ABC"
console.log(formatId(3.14));   // "3.14"

// 3. Union type as a return type
function parseInput(input: string): string | number {
    const parsed = Number(input);
    return isNaN(parsed) ? input : parsed;
}

console.log(parseInput("42"));     // 42 (number)
console.log(parseInput("hello"));  // "hello" (string)

// 4. Narrowing with typeof — TypeScript tracks the type in each branch
function describeValue(value: string | number | boolean): string {
    if (typeof value === "string") {
        return `String of length ${value.length}`;
    }
    if (typeof value === "number") {
        return `Number: ${value.toFixed(1)}`;
    }
    return `Boolean: ${value}`;
}

console.log(describeValue("hello"));  // "String of length 5"
console.log(describeValue(42));       // "Number: 42.0"
console.log(describeValue(true));     // "Boolean: true"
