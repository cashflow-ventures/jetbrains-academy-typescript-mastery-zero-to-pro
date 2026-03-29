// TODO: Define a ReadonlyPoint interface with readonly x (number) and readonly y (number)
export interface ReadonlyPoint {
    // Define properties here
}

// TODO: Define a UserProfile interface with name (string), email (string),
// and optional address (object with street, city, and optional zip)
export interface UserProfile {
    // Define properties here
}

// TODO: Implement distanceFromOrigin
// Takes a ReadonlyPoint and returns the distance from (0, 0)
// Formula: Math.sqrt(x * x + y * y)
export function distanceFromOrigin(point: ReadonlyPoint): number {
    // Write your solution here
    return 0;
}

// TODO: Implement getCity
// Takes a UserProfile and returns the city from the address, or "Unknown" if no address
export function getCity(profile: UserProfile): string {
    // Write your solution here
    return "";
}

// TODO: Implement freezeArray
// Takes a readonly number array and returns the sum of all elements
export function freezeArray(numbers: readonly number[]): number {
    // Write your solution here
    return 0;
}
