// TODO: Define a generic SortStrategy<T> interface with a single method:
// sort(items: T[]): T[]

// TODO: Implement numericAscending — a SortStrategy<number> that sorts numbers ascending

// TODO: Implement numericDescending — a SortStrategy<number> that sorts numbers descending

// TODO: Implement byStringLength — a SortStrategy<string> that sorts strings
// by length ascending; strings of equal length should maintain relative order

// TODO: Implement createByProperty<T>(key, direction) that returns a SortStrategy<T>
// key is keyof T, direction is "asc" | "desc"
// It sorts objects by the given property. Values at T[key] are compared using < and >.

// TODO: Implement Sorter<T> class:
// constructor(strategy: SortStrategy<T>)
// setStrategy(strategy: SortStrategy<T>): void
// sortItems(items: T[]): T[] — returns a NEW sorted array (does not mutate input)

export interface SortStrategy<T> {
    sort(items: T[]): T[];
}

export const numericAscending: SortStrategy<number> = {
    sort(items: number[]): number[] {
        // Write your solution here
        return items;
    },
};

export const numericDescending: SortStrategy<number> = {
    sort(items: number[]): number[] {
        // Write your solution here
        return items;
    },
};

export const byStringLength: SortStrategy<string> = {
    sort(items: string[]): string[] {
        // Write your solution here
        return items;
    },
};

export function createByProperty<T>(
    key: keyof T,
    direction: "asc" | "desc"
): SortStrategy<T> {
    // Write your solution here
    return { sort: (items: T[]) => items };
}

export class Sorter<T> {
    // Write your solution here
    constructor(private strategy: SortStrategy<T>) {}

    setStrategy(strategy: SortStrategy<T>): void {
        // Write your solution here
    }

    sortItems(items: T[]): T[] {
        // Write your solution here
        return items;
    }
}
