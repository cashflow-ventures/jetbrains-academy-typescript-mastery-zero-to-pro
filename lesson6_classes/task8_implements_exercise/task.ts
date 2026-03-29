// TODO: Create a Serializable interface with serialize(): string
export interface Serializable {
    serialize(): string;
}

// TODO: Create a Loggable interface with toLogString(): string
export interface Loggable {
    toLogString(): string;
}

// TODO: Create a TodoItem class implementing both Serializable and Loggable
// - Properties: id (number), title (string), completed (boolean, default false)
// - serialize(): returns JSON string of { id, title, completed }
// - toLogString(): returns "[{status}] #{id}: {title}" (✓ if completed, space if not)
// - toggle(): flips completed status
export class TodoItem implements Serializable, Loggable {
    constructor(
        public id: number,
        public title: string,
        public completed: boolean = false
    ) {}

    serialize(): string {
        // TODO: Return JSON string of { id, title, completed }
        return "";
    }

    toLogString(): string {
        // TODO: Return "[✓] #1: Title" or "[ ] #1: Title"
        return "";
    }

    toggle(): void {
        // TODO: Flip the completed status
    }
}

// TODO: Create a function that takes an array of items that are both
// Serializable & Loggable, and returns their log strings
export function processItems(items: (Serializable & Loggable)[]): string[] {
    // TODO: Map each item to its toLogString() result
    return [];
}
