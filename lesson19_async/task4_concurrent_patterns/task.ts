// Concurrent Patterns — Demonstration

// Helper: simulate an async operation with a delay
function delayed<T>(value: T, ms: number): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// 1. Promise.all — tuple types are preserved
async function loadDashboard(): Promise<[number, string, boolean]> {
    const [count, title, active] = await Promise.all([
        delayed(42, 10),
        delayed("Dashboard", 20),
        delayed(true, 15),
    ]);
    // count: number, title: string, active: boolean
    return [count, title, active];
}

// 2. Promise.allSettled — discriminated union results
async function tryMultiple(): Promise<void> {
    const results = await Promise.allSettled([
        delayed("success", 10),
        Promise.reject(new Error("fail")),
    ]);

    for (const result of results) {
        if (result.status === "fulfilled") {
            console.log("Value:", result.value);
        } else {
            console.log("Reason:", result.reason);
        }
    }
}

// 3. Promise.race with timeout pattern
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), ms)
    );
    return Promise.race([promise, timeout]);
}

// Demo
async function main(): Promise<void> {
    const dashboard = await loadDashboard();
    console.log("Dashboard:", dashboard);

    await tryMultiple();

    const fast = await withTimeout(delayed("done", 10), 1000);
    console.log("Fast result:", fast);
}

main().catch(console.error);
