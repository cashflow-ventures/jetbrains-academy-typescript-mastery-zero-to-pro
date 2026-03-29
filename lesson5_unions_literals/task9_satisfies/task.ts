// The satisfies Operator — validate types while preserving narrow inference

// 1. The problem: type annotation widens the type
type ColorConfig = Record<string, string | number[]>;

// With a type annotation, TS forgets the specific types
const colorsAnnotated: ColorConfig = {
    primary: "red",
    secondary: [0, 128, 255],
};
// colorsAnnotated.primary is string | number[] — too wide!

// 2. With satisfies — validates AND preserves narrow types
const themeColors = {
    primary: "red",
    secondary: [0, 128, 255],
} satisfies ColorConfig;

// themeColors.primary is "red" — the literal type is preserved!
// themeColors.secondary is number[] — the specific type is preserved!
console.log(themeColors.primary.toUpperCase()); // OK — TS knows it's a string

// 3. satisfies catches errors just like a type annotation
// const badColors = {
//     primary: "red",
//     secondary: true,  // Error: boolean doesn't satisfy string | number[]
// } satisfies ColorConfig;

// 4. Combining satisfies with as const for maximum precision
type Route = { path: string; method: "GET" | "POST" };

const routes = {
    home: { path: "/", method: "GET" },
    login: { path: "/login", method: "POST" },
} as const satisfies Record<string, Route>;

// routes.home.method is "GET" (literal), not "GET" | "POST"
console.log(`Home route: ${routes.home.method} ${routes.home.path}`);
