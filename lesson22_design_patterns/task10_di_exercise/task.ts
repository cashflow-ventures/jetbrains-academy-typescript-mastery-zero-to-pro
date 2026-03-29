// TODO: Implement ConsoleLogger, InMemoryMessageStore, and NotificationService
// using constructor injection with the provided interfaces.

export interface Logger {
    log(message: string): void;
}

export interface MessageStore {
    save(userId: string, message: string): void;
    getMessages(userId: string): string[];
}

// TODO: Implement ConsoleLogger
// - log(message) pushes the message onto a public `messages: string[]` array
export class ConsoleLogger implements Logger {
    public messages: string[] = [];

    log(message: string): void {
        // Write your solution here
    }
}

// TODO: Implement InMemoryMessageStore
// - Uses a Map<string, string[]> internally
// - save(userId, message) appends the message to the user's array
// - getMessages(userId) returns the user's messages or empty array
export class InMemoryMessageStore implements MessageStore {
    // Write your solution here

    save(userId: string, message: string): void {
        // Write your solution here
    }

    getMessages(userId: string): string[] {
        // Write your solution here
        return [];
    }
}

// TODO: Implement NotificationService
// - constructor(logger: Logger, store: MessageStore)
// - sendNotification(userId, message) logs "Sending to <userId>: <message>" then saves
// - getNotifications(userId) returns stored messages for the user
export class NotificationService {
    constructor(
        private logger: Logger,
        private store: MessageStore
    ) {}

    sendNotification(userId: string, message: string): void {
        // Write your solution here
    }

    getNotifications(userId: string): string[] {
        // Write your solution here
        return [];
    }
}
