# Dependency Injection Exercise

Wire up a service layer using constructor injection with typed interfaces. You'll build a `NotificationService` that depends on a `Logger` and a `MessageStore`, demonstrating how DI makes components testable and swappable.

## Instructions

1. The `Logger` and `MessageStore` interfaces are provided.

2. Implement `ConsoleLogger` that implements `Logger`:
   - `log(message: string): void` — pushes the message onto an internal `messages: string[]` array (also accessible as a public property for testing)

3. Implement `InMemoryMessageStore` that implements `MessageStore`:
   - Uses an internal `Map<string, string[]>` to store messages per user
   - `save(userId: string, message: string): void` — appends the message to the user's array
   - `getMessages(userId: string): string[]` — returns the user's messages, or an empty array if none

4. Implement `NotificationService`:
   - `constructor(logger: Logger, store: MessageStore)` — accepts dependencies via constructor injection
   - `sendNotification(userId: string, message: string): void` — logs `"Sending to <userId>: <message>"` then saves the message to the store
   - `getNotifications(userId: string): string[]` — returns all stored messages for the user

5. Export all interfaces and classes.

## Example

```typescript
const logger = new ConsoleLogger();
const store = new InMemoryMessageStore();
const service = new NotificationService(logger, store);

service.sendNotification("alice", "Hello!");
service.getNotifications("alice"); // ["Hello!"]
logger.messages; // ["Sending to alice: Hello!"]
```

<div class="hint">
The key to DI is that `NotificationService` depends on the `Logger` and `MessageStore`
interfaces — not on `ConsoleLogger` or `InMemoryMessageStore` directly. In tests, you
could pass any object that satisfies the interface shape.
</div>
