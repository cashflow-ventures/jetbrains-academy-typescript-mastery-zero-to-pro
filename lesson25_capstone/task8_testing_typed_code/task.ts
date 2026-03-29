// Testing Typed Code — Strategies for runtime and compile-time testing
// Demonstrates typed mocks, interface-based DI, and type-level assertions.

// === Branded type with validation ===
type Email = string & { readonly __brand: "Email" };

function createEmail(input: string): Email {
    if (!input.includes("@")) throw new Error("Invalid email");
    return input as Email;
}

// === Interface for dependency injection (testable design) ===
interface Notifier {
    send(to: Email, message: string): boolean;
}

// === Service that depends on an interface — easy to mock in tests ===
class AlertService {
    constructor(private readonly notifier: Notifier) {}

    alert(to: Email, body: string): string {
        const sent = this.notifier.send(to, body);
        return sent ? "delivered" : "failed";
    }
}

// === Typed mock satisfying the Notifier interface ===
const mockNotifier: Notifier = {
    send: (_to: Email, _msg: string): boolean => true, // fake implementation
};

const service = new AlertService(mockNotifier);
const recipient = createEmail("alice@example.com");
console.log(service.alert(recipient, "Server is down")); // "delivered"

// === Compile-time type assertions ===
type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
        ? true
        : false;
type Expect<T extends true> = T;

// Positive: createEmail returns Email, not plain string
type _t1 = Expect<Equal<ReturnType<typeof createEmail>, Email>>;

// Negative: raw string must not be assignable to Email
// @ts-expect-error — plain string is not Email
const bad: Email = "raw@string.com";
