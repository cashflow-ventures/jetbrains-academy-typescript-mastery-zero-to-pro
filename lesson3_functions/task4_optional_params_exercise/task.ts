// TODO: Implement the greetPerson function
// It should take name (string) and optional title (string).
// If title is provided, return "Hello, {title} {name}!"
// Otherwise, return "Hello, {name}!"
export function greetPerson(name: string, title?: string): string {
    // Write your solution here
    return "";
}

// TODO: Implement the formatMessage function
// It should take message (string) and punctuation (string, default ".").
// Return the message followed by the punctuation.
export function formatMessage(message: string, punctuation: string = "."): string {
    // Write your solution here
    return "";
}

// TODO: Implement the createUser function
// It should take name (string), optional age (number), and role (string, default "user").
// Return an object with { name, age, role }.
// When age is not provided, it should be undefined in the returned object.
export function createUser(
    name: string,
    age?: number,
    role: string = "user"
): { name: string; age: number | undefined; role: string } {
    // Write your solution here
    return { name: "", age: undefined, role: "" };
}
