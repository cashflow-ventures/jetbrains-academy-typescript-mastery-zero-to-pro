// Pattern Matching with Template Literals — Demonstration

// Basic extraction: capture part of a string
type ExtractName<S> = S extends `Hello, ${infer Name}!`
    ? Name
    : never;

type Greeting = ExtractName<"Hello, Alice!">;  // "Alice"

// Multiple captures: parse a route
type ParseRoute<S> = S extends `${infer Method} /${infer Path}`
    ? { method: Method; path: Path }
    : never;

type Route = ParseRoute<"GET /users">;
// { method: "GET"; path: "users" }

// Recursive splitting
type Split<S extends string, D extends string> =
    S extends `${infer Head}${D}${infer Tail}`
        ? [Head, ...Split<Tail, D>]
        : [S];

type Words = Split<"hello-world-foo", "-">;
// ["hello", "world", "foo"]

// Extracting route parameters
type ExtractParams<S extends string> =
    S extends `${string}:${infer Param}/${infer Rest}`
        ? Param | ExtractParams<Rest>
        : S extends `${string}:${infer Param}`
            ? Param
            : never;

type RouteParams = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"

// Runtime demonstration of pattern matching
function parseRoute(route: string): { method: string; path: string } | null {
    const match = route.match(/^(\w+)\s+\/(.+)$/);
    if (!match) return null;
    return { method: match[1], path: match[2] };
}

console.log(parseRoute("GET /users"));       // { method: "GET", path: "users" }
console.log(parseRoute("POST /orders/new")); // { method: "POST", path: "orders/new" }
