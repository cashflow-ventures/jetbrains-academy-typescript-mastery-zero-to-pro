# Custom Type Guards

The built-in narrowing techniques — `typeof`, `instanceof`, and `in` — cover many cases, but
sometimes you need to narrow based on more complex logic. TypeScript lets you write **user-defined
type guard functions** that return a special `param is Type` predicate. When the function returns
`true`, TypeScript narrows the parameter to that type in the calling scope.

## Core Concept

A type guard function looks like a regular boolean function, but its return type is annotated
with `param is Type` instead of `boolean`:

```typescript
interface Fish {
    swim: () => void;
}

interface Bird {
    fly: () => void;
}

function isFish(animal: Fish | Bird): animal is Fish {
    return "swim" in animal;
}

function move(animal: Fish | Bird): void {
    if (isFish(animal)) {
        animal.swim();  // animal: Fish — narrowed!
    } else {
        animal.fly();   // animal: Bird — narrowed!
    }
}
```

The `animal is Fish` return type tells TypeScript: "If this function returns `true`, treat
the parameter as `Fish` in the calling code." Without this annotation, TypeScript would not
narrow the type — it would just see a `boolean` return.

## How It Works

### The `param is Type` Syntax

The predicate must reference one of the function's parameters by name:

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNonNull<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
```

The parameter name in the predicate (`value`) must match the actual parameter name. The type
after `is` can be any type — a primitive, an interface, a class, or even a complex union.

### Narrowing with Complex Checks

Custom guards shine when the narrowing logic is too complex for a simple `typeof` or `in` check:

```typescript
interface User {
    type: "user";
    name: string;
    email: string;
}

interface Admin {
    type: "admin";
    name: string;
    email: string;
    permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
    return person.type === "admin" && "permissions" in person;
}

function greetPerson(person: User | Admin): string {
    if (isAdmin(person)) {
        return `Admin ${person.name} with ${person.permissions.length} permissions`;
    }
    return `User ${person.name}`;
}
```

### Guarding `unknown` Values

Type guards are especially useful when working with `unknown` data — for example, parsing
JSON or handling API responses:

```typescript
interface ApiResponse {
    status: number;
    data: string;
}

function isApiResponse(value: unknown): value is ApiResponse {
    return (
        typeof value === "object" &&
        value !== null &&
        "status" in value &&
        "data" in value &&
        typeof (value as ApiResponse).status === "number" &&
        typeof (value as ApiResponse).data === "string"
    );
}

function handleResponse(raw: unknown): string {
    if (isApiResponse(raw)) {
        return `Status ${raw.status}: ${raw.data}`;
    }
    return "Invalid response";
}
```

## Common Pitfalls

- **TypeScript trusts your predicate**: If your guard function returns `true` incorrectly,
  TypeScript will narrow to the wrong type. The compiler doesn't verify that your runtime
  logic actually matches the type predicate — that's your responsibility.
- **Don't forget the `is` keyword**: Writing `function isString(x: unknown): boolean` instead
  of `value is string` means TypeScript won't narrow. The function works at runtime but
  provides no type information.
- **Avoid overly broad guards**: A guard that always returns `true` will silently narrow
  everything, hiding bugs. Keep your checks thorough and accurate.

## Key Takeaways

- Custom type guards use the `param is Type` return type to tell TypeScript about narrowing.
- They enable narrowing based on complex logic that built-in checks can't express.
- The compiler trusts your predicate — make sure the runtime check matches the type claim.
- They're essential for safely working with `unknown` data from external sources.
- Both the `if` branch (guard returns `true`) and the `else` branch (guard returns `false`)
  are narrowed.

<div class="hint">
You can combine multiple type guards in a single condition:
`if (isUser(data) && isAdmin(data))`. TypeScript applies both narrowings, giving you
the intersection of both types.
</div>
