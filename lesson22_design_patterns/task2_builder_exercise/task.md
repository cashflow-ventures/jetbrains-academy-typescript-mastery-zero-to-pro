# Builder Pattern Exercise

Put the Builder pattern into practice by creating a type-safe `QueryBuilder` that constructs SQL-like query objects using fluent method chaining.

## Instructions

1. In `task.ts`, define a `Query` interface with the following readonly properties:
   - `table`: `string`
   - `columns`: `string[]`
   - `conditions`: `string[]`
   - `orderBy`: `string | undefined`
   - `limit`: `number | undefined`

2. Implement a `QueryBuilder` class with these methods (all returning `this` for chaining):
   - `from(table: string)` — sets the table name
   - `select(...columns: string[])` — sets the columns to select
   - `where(condition: string)` — appends a condition to the conditions array
   - `orderByField(field: string, direction: "ASC" | "DESC")` — sets orderBy to `"field ASC"` or `"field DESC"`
   - `limitTo(count: number)` — sets the limit
   - `build()` — returns a `Query` object. Throws an `Error` with message `"Table is required"` if no table is set. Defaults columns to `["*"]` if none were selected.

3. Export both `Query` and `QueryBuilder`.

## Example

```typescript
const query = new QueryBuilder()
    .from("users")
    .select("name", "email")
    .where("age > 18")
    .where("active = true")
    .orderByField("name", "ASC")
    .limitTo(10)
    .build();

// query.table === "users"
// query.columns === ["name", "email"]
// query.conditions === ["age > 18", "active = true"]
// query.orderBy === "name ASC"
// query.limit === 10
```

<div class="hint">
Remember to return `this` from every setter method to enable chaining.
Initialize your internal state in the constructor so each builder starts fresh.
The `build()` method should create a new object — don't expose internal references.
</div>
