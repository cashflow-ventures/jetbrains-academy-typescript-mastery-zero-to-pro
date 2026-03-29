// Dependency Injection — Constructor injection with interfaces as contracts

// Interfaces define the contracts
interface AppLogger {
    log(message: string): void;
}

interface UserRepo {
    findById(id: string): { id: string; name: string } | undefined;
    save(user: { id: string; name: string }): void;
}

// Service depends on abstractions, not concrete implementations
class UserAccountService {
    constructor(
        private repo: UserRepo,
        private logger: AppLogger
    ) {}

    getUser(id: string): { id: string; name: string } | undefined {
        this.logger.log(`Looking up user: ${id}`);
        const found = this.repo.findById(id);
        if (!found) {
            this.logger.log(`User ${id} not found`);
        }
        return found;
    }

    createUser(id: string, name: string): void {
        this.logger.log(`Creating user: ${name}`);
        this.repo.save({ id, name });
    }
}

// Concrete implementations
class SimpleConsoleLogger implements AppLogger {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}

class InMemoryUserRepo implements UserRepo {
    private users = new Map<string, { id: string; name: string }>();

    findById(id: string): { id: string; name: string } | undefined {
        return this.users.get(id);
    }

    save(entry: { id: string; name: string }): void {
        this.users.set(entry.id, entry);
    }
}

// Composition root — wire dependencies together
const appLogger = new SimpleConsoleLogger();
const diUserRepo = new InMemoryUserRepo();
const accountService = new UserAccountService(diUserRepo, appLogger);

accountService.createUser("1", "Alice");
const foundUser = accountService.getUser("1");
console.log("Found:", foundUser); // { id: "1", name: "Alice" }

// In tests, you'd inject test doubles:
// const testLogger: AppLogger = { log: () => {} };
// const testRepo: UserRepo = { findById: () => undefined, save: () => {} };
// const testService = new UserAccountService(testRepo, testLogger);
