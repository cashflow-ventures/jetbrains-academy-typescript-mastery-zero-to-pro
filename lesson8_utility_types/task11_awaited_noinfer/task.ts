// Awaited and NoInfer — unwrapping promises and controlling inference

// --- Awaited: unwrap Promise types ---
type StringPromise = Promise<string>;
type ResolvedString = Awaited<StringPromise>;
// string

type NestedPromise = Promise<Promise<number>>;
type ResolvedNumber = Awaited<NestedPromise>;
// number (recursively unwrapped)

type NotAPromise = Awaited<boolean>;
// boolean (non-promise passes through)

// Practical: extract resolved type of an async function
async function fetchProducts(): Promise<{ id: number; name: string }[]> {
    return [
        { id: 1, name: "Widget" },
        { id: 2, name: "Gadget" },
    ];
}

type ProductList = Awaited<ReturnType<typeof fetchProducts>>;
// { id: number; name: string }[]

// --- NoInfer: control where T is inferred ---
function withDefault<T>(value: T, fallback: NoInfer<T>): T {
    return value ?? fallback;
}

const result1 = withDefault("hello", "fallback"); // T inferred as string from first arg
console.log(result1); // "hello"

// This would error: number is not assignable to string
// const result2 = withDefault("hello", 42);

// Practical: type-safe event handler registration
type EventMap = {
    click: { x: number; y: number };
    keydown: { key: string };
};

function onEvent<K extends keyof EventMap>(
    event: K,
    handler: (data: NoInfer<EventMap[K]>) => void
): void {
    console.log(`Registered handler for ${event}`);
}

onEvent("click", (data) => {
    console.log(data.x, data.y); // data is { x: number; y: number }
});
