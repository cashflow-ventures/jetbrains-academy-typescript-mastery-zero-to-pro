# Numeric Enums

Enums are one of the few TypeScript features that generate real JavaScript code at runtime.
A **numeric enum** maps a set of named constants to auto-incrementing integer values, giving
you readable labels instead of magic numbers scattered throughout your codebase.

## Core Concept

Declare a numeric enum with the `enum` keyword. By default, the first member starts at `0`
and each subsequent member increments by one:

```typescript
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

const move: Direction = Direction.Up; // 0
```

You can set a custom starting value. Members after the initializer continue incrementing:

```typescript
enum HttpCode {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500
}
```

When only some members have initializers, TypeScript increments from the last explicit value:

```typescript
enum Priority {
    Low = 1,
    Medium,    // 2
    High,      // 3
    Critical = 10,
    Emergency  // 11
}
```

## How It Works — Reverse Mapping

Numeric enums are compiled into a JavaScript object that maps **both ways**: name → value
and value → name. This is called **reverse mapping**.

Given this TypeScript:

```typescript
enum Status {
    Active,   // 0
    Inactive  // 1
}
```

The compiler emits roughly:

```javascript
var Status;
(function (Status) {
    Status[Status["Active"] = 0] = "Active";
    Status[Status["Inactive"] = 1] = "Inactive";
})(Status || (Status = {}));
```

This means you can look up a name from a value:

```typescript
console.log(Status.Active);   // 0
console.log(Status[0]);       // "Active"
console.log(Status[1]);       // "Inactive"
```

Reverse mapping is unique to numeric enums — string enums do not get it (covered in the
next task).

## Using Enums as Types

An enum also creates a **type** with the same name. You can use it in annotations to
restrict a parameter to only valid enum members:

```typescript
function describeStatus(status: Status): string {
    switch (status) {
        case Status.Active:
            return "The item is active.";
        case Status.Inactive:
            return "The item is inactive.";
    }
}
```

TypeScript's exhaustiveness checking works with enum-based switches — if you add a new
member to `Status` and forget a `case`, the compiler warns you.

## Computed and Constant Members

Enum members can be **constant** (evaluated at compile time) or **computed** (evaluated at
runtime). A member is constant if it is:

- The first member with no initializer (gets `0`)
- A member with no initializer following a numeric constant member
- Initialized with a constant enum expression (literals, references to other enum members,
  `+`, `-`, `~`, `|`, `&`, `^`, `<<`, `>>`, `>>>`)

A computed member uses a runtime expression:

```typescript
enum FileAccess {
    None = 0,
    Read = 1 << 0,       // 1  — constant (bitwise shift of literal)
    Write = 1 << 1,      // 2
    ReadWrite = Read | Write, // 3 — constant (references other members)
    Computed = "hello".length  // 5 — computed at runtime
}
```

## Common Pitfalls

- **Numeric enums accept any number at runtime.** TypeScript won't stop you from passing
  `42` where a `Direction` is expected — the type system treats numeric enums loosely.
  Use string enums or union literals when you need stricter safety.
- **Reverse mapping only works for numeric members.** Don't try `MyStringEnum["someValue"]`
  expecting to get the member name — it won't work.
- **Avoid gaps in auto-increment sequences.** Mixing explicit and implicit values can create
  confusing numbering. Be explicit when values matter (e.g., HTTP codes, bit flags).

## Key Takeaways

- Numeric enums map names to auto-incrementing integers starting at `0` by default.
- You can set custom starting values; subsequent members increment from there.
- Reverse mapping lets you look up the name from the numeric value at runtime.
- Enum members can be constant (compile-time) or computed (runtime).
- Numeric enums are loosely typed — any `number` is assignable to them.

<div class="hint">
Reverse mapping is a runtime feature — it only exists because TypeScript emits a real
JavaScript object. If you use `const enum` (covered later), the object is erased and
reverse mapping is unavailable.
</div>
