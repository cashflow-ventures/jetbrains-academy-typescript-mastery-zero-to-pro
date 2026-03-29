// Numeric Enums — auto-incrementing values and reverse mapping

enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// Using enum members as values
const heading: Direction = Direction.Up;
console.log("Direction.Up =", heading); // 0

// Reverse mapping: value → name
console.log("Direction[0] =", Direction[0]); // "Up"
console.log("Direction[2] =", Direction[2]); // "Left"

// Custom starting value — members after it auto-increment
enum HttpCode {
    Ok = 200,
    Created,       // 201
    BadRequest = 400,
    NotFound,      // 401
    ServerError = 500
}

console.log("HttpCode.Created =", HttpCode.Created);     // 201
console.log("HttpCode.NotFound =", HttpCode.NotFound);   // 401

// Bitwise flags using constant expressions
enum Permission {
    None = 0,
    Read = 1 << 0,           // 1
    Write = 1 << 1,          // 2
    Execute = 1 << 2,        // 4
    ReadWrite = Read | Write  // 3
}

function hasPermission(userPerms: Permission, check: Permission): boolean {
    return (userPerms & check) === check;
}

const myPerms = Permission.ReadWrite;
console.log("Has Read?", hasPermission(myPerms, Permission.Read));       // true
console.log("Has Execute?", hasPermission(myPerms, Permission.Execute)); // false
