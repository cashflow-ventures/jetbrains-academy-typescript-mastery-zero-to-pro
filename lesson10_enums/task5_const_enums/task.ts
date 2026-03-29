// Const Enums — inlined at compile time, no runtime object

const enum Color {
    Red,
    Green,
    Blue
}

// These references are replaced with literal values in the output:
const primary: Color = Color.Red;     // compiled → const primary = 0;
const accent: Color = Color.Blue;     // compiled → const accent = 2;

console.log("primary =", primary); // 0
console.log("accent =", accent);   // 2

// Const enums with string values
const enum Endpoint {
    Users = "/api/users",
    Posts = "/api/posts",
    Comments = "/api/comments"
}

// Each reference becomes the literal string in compiled JS
function buildUrl(base: string, endpoint: Endpoint): string {
    return `${base}${endpoint}`;
}

console.log(buildUrl("https://example.com", Endpoint.Users));
// "https://example.com/api/users"

// Constant expressions are allowed
const enum BitFlag {
    None = 0,
    Read = 1 << 0,       // 1
    Write = 1 << 1,      // 2
    Execute = 1 << 2,    // 4
    All = Read | Write | Execute  // 7
}

const perms = BitFlag.Read | BitFlag.Write; // compiled → 1 | 2 → 3
console.log("perms =", perms); // 3

// Note: You CANNOT do Color[0] — there is no runtime object!
// The following would cause a runtime error:
// console.log(Color[0]); // ❌ Color is not defined at runtime
