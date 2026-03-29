// TODO: Define EventName type
// Combine "click" | "scroll" | "focus" with the suffix "Handler"
// Result: "clickHandler" | "scrollHandler" | "focusHandler"
export type EventName = any;

// TODO: Define CSSProperty type
// Combine "margin" | "padding" with "Top" | "Right" | "Bottom" | "Left"
// Result: "marginTop" | "marginRight" | ... | "paddingLeft" (8 total)
export type CSSProperty = any;

// TODO: Implement makeEventName
// Takes an event name and appends "Handler"
// e.g., "click" → "clickHandler"
export function makeEventName(event: string): string {
    // Write your solution here
    return "";
}

// TODO: Implement makeCSSProperty
// Concatenates base and direction
// e.g., "margin" + "Top" → "marginTop"
export function makeCSSProperty(base: string, direction: string): string {
    // Write your solution here
    return "";
}

// TODO: Implement makeId
// Returns a string in the format "prefix-id"
// e.g., "user" + 42 → "user-42"
export function makeId(prefix: string, id: number): string {
    // Write your solution here
    return "";
}
