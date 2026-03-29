// Async Generators — Demonstration

// 1. Basic async generator with AsyncGenerator<Y>
async function* countUp(limit: number): AsyncGenerator<number> {
    for (let i = 1; i <= limit; i++) {
        await new Promise((r) => setTimeout(r, 10));
        yield i;
    }
}

// 2. Consuming with for await...of
async function printNumbers(): Promise<void> {
    for await (const n of countUp(5)) {
        console.log("Number:", n);
    }
}

// 3. Async generator with all three type params
async function* accumulator(): AsyncGenerator<number, string, number> {
    let total = 0;
    while (total < 100) {
        const input: number = yield total;
        total += input;
    }
    return `Final total: ${total}`;
}

// 4. Using AsyncIterable<T> as a flexible parameter type
async function collectAll<T>(source: AsyncIterable<T>): Promise<T[]> {
    const items: T[] = [];
    for await (const item of source) {
        items.push(item);
    }
    return items;
}

// 5. Delegation with yield*
async function* range(start: number, end: number): AsyncGenerator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

async function* combined(): AsyncGenerator<number> {
    yield* range(1, 3);
    yield* range(10, 12);
}

// Demo
async function main(): Promise<void> {
    await printNumbers();

    const items = await collectAll(combined());
    console.log("Combined:", items); // [1, 2, 3, 10, 11, 12]
}

main().catch(console.error);
