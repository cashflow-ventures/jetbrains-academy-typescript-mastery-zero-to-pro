# Static Members

Static properties and methods belong to the **class itself**, not to instances. They're useful
for factory methods, shared counters, utility functions, and constants that are logically
grouped with the class.

## Instructions

1. Create a `Temperature` class with:
   - A private property `celsius` (number)
   - A private constructor that takes `celsius` (number) — making it private forces users to
     use the factory methods
   - A static method `fromCelsius(value: number): Temperature` — creates a Temperature from Celsius
   - A static method `fromFahrenheit(value: number): Temperature` — converts F to C using
     `(value - 32) * 5 / 9`, then creates a Temperature
   - A method `toCelsius(): number` — returns the Celsius value
   - A method `toFahrenheit(): number` — converts to Fahrenheit using `celsius * 9 / 5 + 32`
   - A method `toString(): string` — returns `"{celsius}°C"` with celsius rounded to 1 decimal
     place using `toFixed(1)`
2. Create a `IdGenerator` class with:
   - A private static property `nextId` starting at `1`
   - A static method `generate(): number` — returns the current `nextId` and increments it
   - A static method `reset(): void` — resets `nextId` back to `1`
3. Export both classes.

## Example

```typescript
const boiling = Temperature.fromCelsius(100);
boiling.toCelsius();     // 100
boiling.toFahrenheit();  // 212
boiling.toString();      // "100.0°C"

const body = Temperature.fromFahrenheit(98.6);
body.toCelsius();        // 37 (approximately)

IdGenerator.generate();  // 1
IdGenerator.generate();  // 2
IdGenerator.reset();
IdGenerator.generate();  // 1
```

<div class="hint">
A private constructor prevents `new Temperature(...)` from outside the class. Users must go
through the static factory methods `fromCelsius()` or `fromFahrenheit()` instead. This is
the Factory Method pattern.
</div>
