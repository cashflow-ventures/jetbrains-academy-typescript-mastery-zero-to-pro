# Dependency Injection

Dependency Injection (DI) is a technique where an object receives its dependencies from the outside rather than creating them internally. In TypeScript, interfaces serve as contracts between components, and constructor injection makes dependencies explicit, testable, and swappable.

## Core Concept

Without DI, a class creates its own dependencies — tightly coupling it to specific implementations:

```typescript
// Tightly coupled — UserService creates its own repository
class UserService {
    private repo = new PostgresUserRepository(); // Hard dependency

    getUser(id: string) {
        return this.repo.findById(id);
    }
}
```

With DI, the dependency is injected through the constructor:

```typescript
// Loosely coupled — UserService accepts any Repository<User>
interface UserRepository {
    findById(id: string): User | undefined;
}

class UserService {
    constructor(private repo: UserRepository) {} // Injected

    getUser(id: string): User | undefined {
        return this.repo.findById(id);
    }
}
```

Now `UserService` works with any `UserRepository` implementation — a real database in production, an in-memory store in tests.

## How It Works

### Constructor Injection

The most common DI pattern. Dependencies are passed as constructor parameters, typically typed as interfaces:

```typescript
interface Logger {
    log(message: string): void;
}

interface EmailSender {
    send(to: string, subject: string, body: string): void;
}

class NotificationService {
    constructor(
        private logger: Logger,
        private emailSender: EmailSender
    ) {}

    notify(userId: string, message: string): void {
        this.logger.log(`Notifying ${userId}: ${message}`);
        this.emailSender.send(userId, "Notification", message);
    }
}
```

### Wiring Dependencies (Composition Root)

At the application's entry point, you create concrete implementations and wire them together:

```typescript
// Composition root — wire everything up
const logger: Logger = new ConsoleLogger();
const emailSender: EmailSender = new SmtpEmailSender("smtp.example.com");
const notificationService = new NotificationService(logger, emailSender);

// In tests — swap in test doubles
const testLogger: Logger = { log: () => {} };
const testEmail: EmailSender = { send: () => {} };
const testService = new NotificationService(testLogger, testEmail);
```

### Interfaces as Contracts

TypeScript's structural typing means any object that matches the interface shape can be injected — you don't need explicit `implements` declarations. This makes testing especially easy:

```typescript
// This object satisfies the Logger interface structurally
const silentLogger = { log(_msg: string): void {} };
const service = new NotificationService(silentLogger, testEmail); // Works!
```

## Common Pitfalls

- **Injecting too many dependencies**: If a class needs 5+ dependencies, it's probably doing too much. Split it into smaller, focused classes.
- **Service locator anti-pattern**: Avoid passing a "container" object that services pull dependencies from. This hides dependencies and makes code harder to understand.
- **Circular dependencies**: If A depends on B and B depends on A, restructure your code. Extract the shared logic into a third class that both depend on.

## Key Takeaways

- DI makes dependencies explicit by passing them through constructors
- Interfaces define contracts — implementations can be swapped without changing consumers
- Constructor injection is the simplest and most common DI pattern in TypeScript
- The composition root (entry point) is where you wire concrete implementations together
- DI enables easy testing by allowing test doubles to replace real implementations

<div class="hint">
You don't always need a DI framework. For most TypeScript projects, manual constructor injection
at the composition root is sufficient and easier to understand. Frameworks like `tsyringe`,
`inversify`, or NestJS's built-in DI add value in large applications with many services,
but they introduce complexity. Start simple — reach for a framework only when manual wiring
becomes painful.
</div>
