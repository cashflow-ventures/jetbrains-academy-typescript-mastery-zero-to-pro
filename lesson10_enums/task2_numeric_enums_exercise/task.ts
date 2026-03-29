// TODO: Create and export a numeric enum called Direction
// Members: Up, Down, Left, Right (auto-incrementing from 0)

// TODO: Export a function called move
// It takes a position { x: number; y: number } and a Direction
// Returns a new position shifted by one unit in the given direction
// Up → y + 1, Down → y - 1, Left → x - 1, Right → x + 1
export function move(
    position: { x: number; y: number },
    direction: number
): { x: number; y: number } {
    // Write your solution here
    return { x: 0, y: 0 };
}

// TODO: Export a function called directionName
// It takes a Direction value and returns its string name via reverse mapping
export function directionName(direction: number): string {
    // Write your solution here
    return "";
}
