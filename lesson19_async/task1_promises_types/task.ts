// Promise Types — Demonstration

// 1. Promise<T> tracks the resolved type
const numPromise: Promise<number> = new Promise((resolve) => {
    resolve(42);
});

// 2. .then() chains infer types automatically
const strPromise: Promise<string> = numPromise
    .then((n) => n * 2)        // Promise<number>
    .then((n) => n.toString()) // Promise<string>
    .then((s) => `Result: ${s}`);

// 3. Returning a Promise from .then() is unwrapped
function fetchUserId(): Promise<number> {
    return Promise.resolve(7);
}

function fetchUserName(id: number): Promise<string> {
    return Promise.resolve(`User_${id}`);
}

// TypeScript infers Promise<string>, not Promise<Promise<string>>
const userName: Promise<string> = fetchUserId().then(fetchUserName);

// 4. PromiseLike<T> — the minimal thenable interface
async function unwrapThenable<T>(thenable: PromiseLike<T>): Promise<T> {
    return thenable;
}

// 5. Awaited<T> recursively unwraps promise types
type Resolved = Awaited<Promise<Promise<string>>>; // string
type Mixed = Awaited<number | Promise<boolean>>;   // number | boolean

// 6. Always narrow errors in .catch()
strPromise.catch((error: unknown) => {
    if (error instanceof Error) {
        console.log(error.message);
    }
});

console.log("Promise types demo loaded");
