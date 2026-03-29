# String Enums

While numeric enums are the default, **string enums** assign an explicit string value to
every member. They trade away reverse mapping for much better readability at runtime —
log output, API payloads, and debugger inspections all show meaningful text instead of
opaque integers.

## Core Concept

In a string enum, every member must be initialized with a string literal:

```typescript
enum LogLevel {
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR"
}

const level: LogLevel = LogLevel.Info;
console.log(level); // "INFO"  — not a number!
```

Unlike numeric enums, there is no auto-incrementing. You must provide a value for every
member. This is intentional — it forces you to be explicit about the runtime representation.

## Benefits Over Numeric Enums

### 1. Readable Runtime Values

When you serialize a numeric enum to JSON or print it to a log, you see a number:

```typescript
enum NumericStatus { Active, Inactive }
console.log(NumericStatus.Active); // 0  — what does 0 mean?
```

With a string enum the value is self-documenting:

```typescript
enum StringStatus { Active = "ACTIVE", Inactive = "INACTIVE" }
console.log(StringStatus.Active); // "ACTIVE"  — clear!
```

### 2. No Accidental Number Assignment

Numeric enums accept any `number` at runtime — TypeScript won't complain if you pass `42`
where a `Direction` is expected. String enums are stricter: only the exact string values
defined in the enum are assignable.

```typescript
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let c: Color = Color.Red;   // ✅
// c = "RED";               // ❌ Type '"RED"' is not assignable to type 'Color'
```

This means you must always go through the enum to assign a value, which prevents typos
and invalid states.

### 3. Stable Serialization

If you add a new member in the middle of a numeric enum, all subsequent values shift.
String enums are immune to this — each value is explicitly defined and won't change when
you reorder members.

## How It Works — Compiled Output

String enums compile to a simpler object than numeric enums because there is no reverse
mapping:

```typescript
enum Fruit {
    Apple = "APPLE",
    Banana = "BANANA"
}
```

Compiles to:

```javascript
var Fruit;
(function (Fruit) {
    Fruit["Apple"] = "APPLE";
    Fruit["Banana"] = "BANANA";
})(Fruit || (Fruit = {}));
```

Notice there is no `Fruit["APPLE"] = "Apple"` line — you cannot look up the member name
from the string value at runtime.

## Heterogeneous Enums (Mixed)

TypeScript technically allows mixing string and numeric members in the same enum:

```typescript
enum Mixed {
    No = 0,
    Yes = "YES"
}
```

This is valid but **strongly discouraged**. It makes the enum harder to reason about and
breaks assumptions about the value type. Stick to one kind per enum.

## Pattern: String Enum for API Status Codes

String enums shine when modeling values that cross system boundaries — API responses,
database columns, configuration keys:

```typescript
enum OrderStatus {
    Pending = "pending",
    Confirmed = "confirmed",
    Shipped = "shipped",
    Delivered = "delivered",
    Cancelled = "cancelled"
}

function canCancel(status: OrderStatus): boolean {
    return status === OrderStatus.Pending || status === OrderStatus.Confirmed;
}
```

## Common Pitfalls

- **Forgetting to initialize every member.** Unlike numeric enums, string enums have no
  auto-increment — omitting a value is a compile error.
- **Comparing with raw strings.** Even though the runtime value is a string, TypeScript
  won't let you compare `status === "pending"` directly when `status` is typed as
  `OrderStatus`. Always compare against the enum member.
- **No reverse mapping.** If you need to convert a string back to an enum member, you'll
  have to write a helper function or use a type assertion.

## Key Takeaways

- String enums require an explicit string value for every member.
- They produce readable runtime values — great for logs, APIs, and serialization.
- They are stricter than numeric enums: raw strings are not assignable.
- No reverse mapping is generated — only name → value.
- Avoid mixing string and numeric members in the same enum.

<div class="hint">
If you need both the strictness of string enums and the ability to look up a member by
its value, consider building a small lookup map yourself:
`const statusByValue = new Map(Object.entries(OrderStatus).map(([k, v]) => [v, k]));`
</div>
