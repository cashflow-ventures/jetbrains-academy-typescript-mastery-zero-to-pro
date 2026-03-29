// Exclude, Extract, and NonNullable — filtering union types

// --- Exclude: remove members from a union ---
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ReadOnlyMethod = Extract<HttpMethod, "GET">;
type MutatingMethod = Exclude<HttpMethod, "GET">;
// MutatingMethod = "POST" | "PUT" | "PATCH" | "DELETE"

// --- Extract: keep only matching members ---
type ApiResponse =
    | { status: "success"; data: unknown }
    | { status: "error"; message: string }
    | { status: "loading" };

type SuccessResponse = Extract<ApiResponse, { status: "success" }>;
// { status: "success"; data: unknown }

type FailureResponse = Extract<ApiResponse, { status: "error" }>;
// { status: "error"; message: string }

// --- NonNullable: strip null and undefined ---
type MaybeUser = { name: string } | null | undefined;
type DefiniteUser = NonNullable<MaybeUser>;
// { name: string }

// Practical usage
function handleMethod(method: MutatingMethod): string {
    return `Mutating request: ${method}`;
}

function getErrorMessage(response: FailureResponse): string {
    return response.message;
}

function ensureUser(user: MaybeUser): DefiniteUser {
    if (user == null) {
        throw new Error("User is required");
    }
    return user;
}

console.log(handleMethod("POST"));       // "Mutating request: POST"
console.log(getErrorMessage({ status: "error", message: "Not found" }));
console.log(ensureUser({ name: "Alice" })); // { name: "Alice" }
