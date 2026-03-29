export type Fruit = "apple" | "banana" | "orange";

export interface NutritionInfo {
    calories: number;
    sugar: number;
    fiber: number;
}

// TODO: Define fruitNutrition as Record<Fruit, NutritionInfo>
// Provide nutrition data for each fruit (use any reasonable numbers)
export const fruitNutrition: Record<string, NutritionInfo> = {};

// TODO: Implement getNutrition — look up a fruit's nutrition info
export function getNutrition(fruit: Fruit): NutritionInfo {
    // Write your solution here
    return { calories: 0, sugar: 0, fiber: 0 };
}

// TODO: Implement buildIndex — convert an array of objects with id into a Record
export function buildIndex<T extends { id: string }>(items: T[]): Record<string, T> {
    // Write your solution here
    return {} as Record<string, T>;
}
