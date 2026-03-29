export interface Post {
    id: number;
    title: string;
    body: string;
}

// TODO: Implement simulateFetch
// If shouldFail is true, reject with new Error("Network error")
// Otherwise resolve with data
export function simulateFetch<T>(data: T, shouldFail?: boolean): Promise<T> {
    // Write your solution here
    return Promise.resolve(data);
}

// TODO: Implement parseJson
// Parse the raw JSON string, then validate with the validator type guard
// Throw new Error("Parse error") if JSON.parse fails
// Throw new Error("Validation error") if validator returns false
export function parseJson<T>(raw: string, validator: (data: unknown) => data is T): T {
    // Write your solution here
    return undefined as unknown as T;
}

// TODO: Implement isPost type guard
// Check that data is an object with id (number), title (string), body (string)
export function isPost(data: unknown): data is Post {
    // Write your solution here
    return false;
}

// TODO: Implement fetchPost
// Use simulateFetch to return { id, title: "Post " + id, body: "Content of post " + id }
export async function fetchPost(id: number): Promise<Post> {
    // Write your solution here
    return { id: 0, title: "", body: "" };
}

// TODO: Implement fetchPosts
// Fetch multiple posts concurrently using Promise.all and fetchPost
export async function fetchPosts(ids: number[]): Promise<Post[]> {
    // Write your solution here
    return [];
}
