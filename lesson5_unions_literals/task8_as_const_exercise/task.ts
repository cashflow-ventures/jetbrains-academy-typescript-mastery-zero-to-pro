// TODO: Create a ROLES array using as const with values "admin", "editor", "viewer"
// Then derive a Role type from it using typeof and indexed access
export const ROLES = [] as readonly string[];
export type Role = string;

// TODO: Create an HTTP_METHODS object using as const:
// { GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE" }
// Then derive an HttpMethod type from its values
export const HTTP_METHODS = {} as Record<string, string>;
export type HttpMethod = string;

// TODO: Implement isValidRole
// Takes an unknown value and returns true if it's one of the ROLES values
// Use the ROLES array to check membership
export function isValidRole(value: unknown): boolean {
    // Write your solution here
    return false;
}

// TODO: Implement getMethodDescription
// Takes an HttpMethod and returns a description:
// "GET" → "Retrieve data"
// "POST" → "Create data"
// "PUT" → "Update data"
// "DELETE" → "Remove data"
export function getMethodDescription(method: HttpMethod): string {
    // Write your solution here
    return "";
}
