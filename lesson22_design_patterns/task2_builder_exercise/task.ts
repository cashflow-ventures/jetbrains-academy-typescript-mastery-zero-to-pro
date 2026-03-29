// TODO: Define the Query interface with readonly properties:
// table (string), columns (string[]), conditions (string[]),
// orderBy (string | undefined), limit (number | undefined)

// TODO: Implement the QueryBuilder class with fluent methods:
// from(table), select(...columns), where(condition),
// orderByField(field, direction), limitTo(count), build()
// Each setter should return `this` for chaining.
// build() throws Error("Table is required") if no table is set.
// build() defaults columns to ["*"] if none selected.

export interface Query {
    readonly table: string;
    readonly columns: string[];
    readonly conditions: string[];
    readonly orderBy: string | undefined;
    readonly limit: number | undefined;
}

export class QueryBuilder {
    // Write your solution here
}
