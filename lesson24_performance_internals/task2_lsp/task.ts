// tsserver and the Language Service — How Your IDE Understands TypeScript

// tsserver is a long-running process that wraps the compiler pipeline
// (Scanner → Parser → Binder → Checker) in a language service layer.
// Every IDE feature maps to a specific language service API call.

// --- Hover: getQuickInfoAtPosition() ---
// When you hover over "user", tsserver asks the checker for its type.
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
// Hover over "user" → tsserver resolves the type and returns "User"

// --- Autocomplete: getCompletionsAtPosition() ---
// Typing "user." triggers tsserver to list all properties of User.
// The binder finds the symbol, the checker resolves its type,
// and the language service returns { id, name, email } as completions.
const userName = user.name; // ← autocomplete offered "id", "name", "email" here

// --- Go to Definition: getDefinitionAtPosition() ---
// Ctrl+Click on "User" below → tsserver follows the symbol back
// to the interface declaration above (line 9) via the binder's symbol table.
function greetUser(u: User): string {
    return `Hello, ${u.name}!`;
}

// --- Error Squiggles: getSemanticDiagnostics() ---
// tsserver runs the checker on this file and reports type mismatches.
// Uncomment the line below to see a red squiggly — the checker catches it:
// const bad: User = { id: "wrong", name: 42, email: true };

// --- Incremental Updates ---
// When you edit this file, tsserver re-parses ONLY this file.
// ASTs for all other project files stay cached in memory.
// The checker invalidates types lazily — only re-checking what's needed.
const greeting = greetUser(user);
console.log(greeting); // "Hello, Alice!"
