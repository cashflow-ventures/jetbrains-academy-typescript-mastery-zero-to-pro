# Record Exercise

Practice using `Record<K, V>` to build typed lookup tables and configuration maps.

## Instructions

1. The `Fruit` type (a union of string literals) and `NutritionInfo` interface are provided.
2. Define and export a constant `fruitNutrition` of type `Record<Fruit, NutritionInfo>`.
   Fill it with data for each fruit (use any reasonable numbers).
3. Implement `getNutrition` — takes a `Fruit` and returns its `NutritionInfo` from the lookup.
4. Implement `buildIndex` — a generic function that takes an array of objects with an `id: string`
   property and returns a `Record<string, T>` mapping each `id` to its object.

## Example

```typescript
getNutrition("apple");  // returns the NutritionInfo for apple

buildIndex([{ id: "a", name: "Alice" }, { id: "b", name: "Bob" }]);
// { a: { id: "a", name: "Alice" }, b: { id: "b", name: "Bob" } }
```

<div class="hint">
For `buildIndex`, use `reduce` or a `for...of` loop to accumulate the record.
The constraint `T extends { id: string }` ensures every item has an `id`.
</div>
