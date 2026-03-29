// Literal type aliases
export type Direction = "north" | "south" | "east" | "west";
export type TrafficLight = "red" | "yellow" | "green";

// TODO: Implement moveOnGrid
// Takes a direction and number of steps
// Returns { x, y } displacement based on direction
export function moveOnGrid(direction: Direction, steps: number): { x: number; y: number } {
    // Write your solution here
    return { x: 0, y: 0 };
}

// TODO: Implement nextLight
// Takes the current traffic light color and returns the next one
// Cycle: red → green → yellow → red
export function nextLight(light: TrafficLight): TrafficLight {
    // Write your solution here
    return "red";
}

// TODO: Implement formatSize
// Takes "small", "medium", or "large" and returns "S", "M", or "L"
export function formatSize(size: "small" | "medium" | "large"): string {
    // Write your solution here
    return "";
}
