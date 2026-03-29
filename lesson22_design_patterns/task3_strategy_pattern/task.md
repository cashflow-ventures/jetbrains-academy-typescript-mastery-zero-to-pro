# Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one behind a common interface, and makes them interchangeable at runtime. In TypeScript, interfaces and generics make strategies fully type-safe — the compiler ensures every strategy conforms to the expected contract.

## Core Concept

Instead of hardcoding an algorithm inside a class, you extract it into a separate object that implements a shared interface. The context class holds a reference to a strategy and delegates work to it. Swapping the strategy changes the behavior without modifying the context.

```typescript
// Define the strategy interface
interface CompressionStrategy {
    compress(data: string): string;
    decompress(data: string): string;
}

// Concrete strategies
const gzipStrategy: CompressionStrategy = {
    compress(data: string): string {
        return `gzip(${data})`;
    },
    decompress(data: string): string {
        return data.replace(/^gzip\(|\)$/g, "");
    },
};

const zipStrategy: CompressionStrategy = {
    compress(data: string): string {
        return `zip(${data})`;
    },
    decompress(data: string): string {
        return data.replace(/^zip\(|\)$/g, "");
    },
};
```

## How It Works

The context class accepts a strategy via its constructor or a setter method. All interaction with the algorithm goes through the strategy interface — the context never knows which concrete strategy it's using.

```typescript
class FileCompressor {
    constructor(private strategy: CompressionStrategy) {}

    setStrategy(strategy: CompressionStrategy): void {
        this.strategy = strategy;
    }

    compressFile(content: string): string {
        return this.strategy.compress(content);
    }

    decompressFile(content: string): string {
        return this.strategy.decompress(content);
    }
}

const compressor = new FileCompressor(gzipStrategy);
console.log(compressor.compressFile("hello")); // "gzip(hello)"

compressor.setStrategy(zipStrategy);
console.log(compressor.compressFile("hello")); // "zip(hello)"
```

### Generic Strategies

Generics make strategies even more powerful — you can parameterize the input and output types:

```typescript
interface SortStrategy<T> {
    sort(items: T[]): T[];
}

class SortedCollection<T> {
    constructor(private strategy: SortStrategy<T>) {}

    setStrategy(strategy: SortStrategy<T>): void {
        this.strategy = strategy;
    }

    sortItems(items: T[]): T[] {
        return this.strategy.sort([...items]);
    }
}
```

## Common Pitfalls

- **Too many strategies**: If you only have two algorithms and they'll never change, a simple `if/else` is clearer than a full Strategy pattern.
- **Leaking context state**: Strategies should be stateless or manage their own state. Don't pass the entire context object to a strategy — pass only the data it needs.
- **Forgetting the interface**: Without a shared interface, swapping strategies becomes error-prone. Always define the contract first.

## Key Takeaways

- The Strategy pattern encapsulates interchangeable algorithms behind a common interface
- TypeScript interfaces enforce that every strategy conforms to the same contract
- Generics allow strategies to work with any data type while maintaining type safety
- Strategies can be swapped at runtime without modifying the context class
- Use this pattern when you have multiple algorithms for the same task and need to switch between them

<div class="hint">
The Strategy pattern is everywhere in real-world TypeScript. Express middleware, Redux reducers,
validation libraries, and sorting comparators all follow the strategy concept — a pluggable
function or object that conforms to a known interface. If you've ever passed a comparator
to `Array.sort()`, you've used the Strategy pattern.
</div>
