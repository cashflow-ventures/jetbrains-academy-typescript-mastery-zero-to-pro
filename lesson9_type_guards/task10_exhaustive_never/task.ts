// Helper: throws if a value reaches here — means a case was missed
export function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

// --- Traffic Light ---
export type TrafficLight = "red" | "yellow" | "green";

// TODO: Implement getAction using a switch + assertNever in default
export function getAction(light: TrafficLight): string {
    // Write your solution here
    return "";
}

// --- Shapes ---
export interface Circle {
    kind: "circle";
    radius: number;
}

export interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

export interface Triangle {
    kind: "triangle";
    sideA: number;
    sideB: number;
    sideC: number;
}

export type Shape = Circle | Rectangle | Triangle;

// TODO: Implement getPerimeter using narrowing + assertNever
export function getPerimeter(shape: Shape): number {
    // Write your solution here
    return 0;
}

// --- HTTP Methods ---
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// TODO: Implement isReadOnly using a switch + assertNever in default
export function isReadOnly(method: HttpMethod): boolean {
    // Write your solution here
    return false;
}
