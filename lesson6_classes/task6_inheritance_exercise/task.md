# Inheritance Exercise

Build a three-level class hierarchy: `Vehicle` → `Car` → `ElectricCar`. Each level adds
properties and overrides methods, giving you practice with `extends`, `super`, and `override`.

## Instructions

1. Create a `Vehicle` class with:
   - Properties: `make` (string), `year` (number) — use parameter properties
   - Method: `getInfo()` returns `"{year} {make}"` (e.g., `"2024 Toyota"`)
2. Create a `Car` class that extends `Vehicle` with:
   - Additional property: `doors` (number)
   - Override `getInfo()` to return `"{year} {make} ({doors}-door)"`
3. Create an `ElectricCar` class that extends `Car` with:
   - Additional property: `range` (number, in miles) — use parameter property
   - Property: `batteryLevel` (number) — starts at `100`
   - Override `getInfo()` to return `"{year} {make} ({doors}-door) [Electric, {range}mi range]"`
   - Method: `drive(miles: number): number` — reduces `batteryLevel` proportionally
     (`miles / range * 100`). Battery cannot go below 0. Return the actual miles driven
     (may be less than requested if battery runs out).
   - Method: `charge(): void` — sets `batteryLevel` back to `100`
4. Export all three classes.

## Example

```typescript
const car = new Car("Honda", 2023, 4);
car.getInfo(); // "2023 Honda (4-door)"

const ev = new ElectricCar("Tesla", 2024, 4, 300);
ev.getInfo();       // "2024 Tesla (4-door) [Electric, 300mi range]"
ev.batteryLevel;    // 100
ev.drive(150);      // returns 150, batteryLevel is now 50
ev.drive(200);      // returns 150 (only enough battery for 150mi), batteryLevel is 0
ev.charge();        // batteryLevel is back to 100
```

<div class="hint">
For the `drive` method, calculate how many miles the current battery can support:
`batteryLevel / 100 * range`. If the requested miles exceed that, drive only what's possible
and set batteryLevel to 0.
</div>
