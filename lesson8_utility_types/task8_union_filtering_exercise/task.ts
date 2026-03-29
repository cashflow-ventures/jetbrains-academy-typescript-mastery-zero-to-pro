export type MediaType = "text" | "markdown" | "image" | "video" | "audio";

export type MediaItem =
    | { kind: "text"; content: string }
    | { kind: "markdown"; content: string }
    | { kind: "image"; url: string; width: number }
    | { kind: "video"; url: string; duration: number }
    | { kind: "audio"; url: string; duration: number };

// TODO: Define TextMedia using Extract (keep only "text" and "markdown")
export type TextMedia = string;

// TODO: Define NonTextMedia using Exclude (remove "text" and "markdown")
export type NonTextMedia = string;

// TODO: Implement filterByType — return only items whose kind matches the given type
export function filterByType(items: MediaItem[], mediaType: MediaType): MediaItem[] {
    // Write your solution here
    return [];
}

// TODO: Implement ensureDefined — return the value or throw if null/undefined
export function ensureDefined<T>(value: T | null | undefined): T {
    // Write your solution here
    throw new Error("Not implemented");
}
