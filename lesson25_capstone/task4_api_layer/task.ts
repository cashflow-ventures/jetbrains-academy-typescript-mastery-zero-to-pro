// TODO: Build a typed API layer with Result pattern error handling.
// This capstone exercise combines generics, discriminated unions,
// literal types, and the Result pattern into a realistic API layer.

// --- Result<T, E> ---
// TODO: Export a Result<T, E> discriminated union type:
//   Success: { ok: true; value: T }
//   Failure: { ok: false; error: E }

// --- ok / err helpers ---
// TODO: Export ok<T>(value: T): Result<T, never>
export function ok(value: any): any {
    // Write your solution here
    return undefined;
}

// TODO: Export err<E>(error: E): Result<never, E>
export function err(error: any): any {
    // Write your solution here
    return undefined;
}

// --- ApiRequest ---
// TODO: Export an ApiRequest interface with:
//   method: "GET" | "POST" | "PUT" | "DELETE"
//   path: string
//   body?: unknown
//   headers: Record<string, string>

// --- ApiResponse<T> ---
// TODO: Export a generic ApiResponse<T> interface with:
//   status: number
//   body: T
//   headers: Record<string, string>

// --- ApiHandler<T> ---
// TODO: Export a type alias ApiHandler<T> = (request: ApiRequest) => ApiResponse<T>

// --- Error response helpers ---
// TODO: Export notFound(message: string) => ApiResponse<{ error: string }>
//   status 404, headers: { "content-type": "application/json" }
export function notFound(message: string): any {
    // Write your solution here
    return undefined;
}

// TODO: Export badRequest(message: string) => ApiResponse<{ error: string }>
//   status 400, headers: { "content-type": "application/json" }
export function badRequest(message: string): any {
    // Write your solution here
    return undefined;
}

// TODO: Export serverError(message: string) => ApiResponse<{ error: string }>
//   status 500, headers: { "content-type": "application/json" }
export function serverError(message: string): any {
    // Write your solution here
    return undefined;
}

// --- User interface ---
// TODO: Export a User interface with id (string), name (string), email (string)

// --- findUser ---
// TODO: Export findUser(id: string): Result<User, string>
//   Returns ok with Alice when id === "1", err("User not found") otherwise
export function findUser(id: string): any {
    // Write your solution here
    return undefined;
}

// --- handleGetUser ---
// TODO: Export handleGetUser satisfying ApiHandler<User | { error: string }>
//   Extract user id from request.path (last segment)
//   Use findUser and return 200 on success, notFound on failure
export function handleGetUser(request: any): any {
    // Write your solution here
    return { status: 200, body: {}, headers: {} };
}

// --- handleCreateUser ---
// TODO: Export handleCreateUser satisfying ApiHandler<User | { error: string }>
//   Validate request.body has name (string) and email (string)
//   Return 400 badRequest if invalid, 201 with new User if valid
export function handleCreateUser(request: any): any {
    // Write your solution here
    return { status: 200, body: {}, headers: {} };
}
