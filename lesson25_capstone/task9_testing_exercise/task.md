# Testing Exercise

Testing is the final pillar of production-quality TypeScript. In this capstone exercise
you'll build a `Calculator` class behind an interface, wrap it with a `CalculatorLogger`
that uses dependency injection, and create a typed mock factory — all patterns covered
in the previous theory task. The hidden tests verify that your implementations are
correct at both the runtime and type level.

## Instructions

1. In `task.ts`, export a `Calculator` **interface** with four methods:
   - `add(a: number, b: number): number`
   - `subtract(a: number, b: number): number`
   - `multiply(a: number, b: number): number`
   - `divide(a: number, b: number): number`

2. Export a `BasicCalculator` **class** that implements `Calculator`:
   - `add` returns `a + b`
   - `subtract` returns `a - b`
   - `multiply` returns `a * b`
   - `divide` throws an `Error` with message `"Division by zero"` when `b` is `0`,
     otherwise returns `a / b`

3. Export a `LogEntry` interface with:
   - `operation: string` — the method name (e.g. `"add"`)
   - `args: [number, number]` — the two arguments
   - `result: number` — the return value

4. Export a `CalculatorLogger` class that wraps a `Calculator` via constructor injection:
   - The constructor accepts a single parameter of type `Calculator`
   - Expose a readonly `log` property of type `LogEntry[]` (initially empty)
   - Implement the same four methods (`add`, `subtract`, `multiply`, `divide`)
   - Each method delegates to the injected calculator, pushes a `LogEntry` onto `log`,
     and returns the result
   - For `divide`, if the inner calculator throws, the error must propagate (do **not**
     catch it) and no entry should be added to the log

5. Export a `createMockCalculator` factory function that returns a `Calculator` object
   whose methods return **configurable default values**:
   - It accepts an optional `Partial<Record<keyof Calculator, number>>` parameter
     (e.g. `{ add: 10, divide: 5 }`)
   - Each method returns the configured value if provided, or `0` otherwise
   - This lets tests inject a predictable fake without a real calculator

## Example

```typescript
const calc = new BasicCalculator();
calc.add(2, 3);       // 5
calc.multiply(4, 5);  // 20

const logger = new CalculatorLogger(calc);
logger.subtract(10, 3); // 7
logger.log;             // [{ operation: "subtract", args: [10, 3], result: 7 }]

const mock = createMockCalculator({ add: 99 });
mock.add(1, 2);       // 99  (ignores real arithmetic)
mock.subtract(1, 2);  // 0   (default)
```

<div class="hint">
`CalculatorLogger` should implement the `Calculator` interface itself — that way it's
a drop-in replacement anywhere a `Calculator` is expected. Each method calls
`this.calculator.method(a, b)`, records the entry, and returns the result. For the mock
factory, use nullish coalescing (`??`) to fall back to `0` when no override is provided.
</div>
