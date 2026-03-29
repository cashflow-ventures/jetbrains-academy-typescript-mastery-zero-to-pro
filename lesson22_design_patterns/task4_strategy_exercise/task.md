# Strategy Pattern Exercise

Implement a set of typed sorting strategies and a generic `Sorter` context class that can swap between them at runtime.

## Instructions

1. The `SortStrategy<T>` interface is provided. It has a single method: `sort(items: T[]): T[]`.

2. Implement these concrete strategies:
   - `numericAscending` — a `SortStrategy<number>` that sorts numbers in ascending order
   - `numericDescending` — a `SortStrategy<number>` that sorts numbers in descending order
   - `byStringLength` — a `SortStrategy<string>` that sorts strings by length (shortest first); strings of equal length should maintain their relative order

3. Implement `createByProperty<T>(key: keyof T, direction: "asc" | "desc"): SortStrategy<T>` — a factory function that returns a strategy sorting objects by the given property. Compare values using `<` and `>`.

4. Implement the `Sorter<T>` class:
   - `constructor(strategy: SortStrategy<T>)` — sets the initial strategy
   - `setStrategy(strategy: SortStrategy<T>): void` — swaps the strategy
   - `sortItems(items: T[]): T[]` — returns a **new** sorted array (must not mutate the input)

5. Export everything.

## Example

```typescript
const sorter = new Sorter(numericAscending);
sorter.sortItems([3, 1, 2]); // [1, 2, 3]

sorter.setStrategy(numericDescending);
sorter.sortItems([3, 1, 2]); // [3, 2, 1]
```

<div class="hint">
All strategies must return a new array — use the spread operator or `.slice()` before sorting
to avoid mutating the input. For `createByProperty`, cast the property values to compare
them with `<` and `>`.
</div>
