# Pattern Matching with Template Literals

Template literal types are not just for constructing strings — they can also
*deconstruct* them. By combining template literals with conditional types and
the `infer` keyword, you can parse string types at compile time, extracting
pieces from a known pattern. This is the foundation of type-safe routing,
event parsing, and string protocol validation.

## Core Concept

When you write a conditional type like this:

```typescript
type ExtractName<S> = S extends `Hello, ${infer Name}!`
    ? Name
    : never;

type R = ExtractName<"Hello, Alice!">;  // "Alice"
```

TypeScript matches the string literal `"Hello, Alice!"` against the pattern
`` `Hello, ${infer Name}!` `` and binds the variable portion to `Name`. This
is type-level pattern matching — the string is parsed at compile time.

## How It Works

### Basic Extraction

The `infer` keyword inside a template literal captures the portion of the
string that matches the placeholder:

```typescript
type GetDomain<S> = S extends `${string}@${infer Domain}`
    ? Domain
    : never;

type D = GetDomain<"user@example.com">;  // "example.com"
```

Here `${string}` matches any prefix (the part before `@`), and `${infer Domain}`
captures everything after `@`.

### Multiple Captures

You can use multiple `infer` positions to extract several parts at once:

```typescript
type ParseRoute<S> = S extends `${infer Method} /${infer Path}`
    ? { method: Method; path: Path }
    : never;

type R = ParseRoute<"GET /users">;
// { method: "GET"; path: "users" }
```

### Recursive Parsing

Template literal pattern matching becomes extremely powerful when combined with
recursion. You can parse repeated patterns by having the type reference itself:

```typescript
type Split<S extends string, D extends string> =
    S extends `${infer Head}${D}${infer Tail}`
        ? [Head, ...Split<Tail, D>]
        : [S];

type Words = Split<"hello-world-foo", "-">;
// ["hello", "world", "foo"]
```

This recursively splits a string on a delimiter, producing a tuple of the parts.
Each recursive step peels off the first segment and processes the rest.

### Parsing Route Parameters

A practical application is extracting dynamic parameters from URL patterns:

```typescript
type ExtractParams<S extends string> =
    S extends `${string}:${infer Param}/${infer Rest}`
        ? Param | ExtractParams<Rest>
        : S extends `${string}:${infer Param}`
            ? Param
            : never;

type Params = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"
```

This type recursively walks the route string, finding each `:param` segment and
collecting the parameter names into a union.

### Validating String Formats

You can use template literal patterns as type guards for string formats:

```typescript
type IsHexColor<S extends string> =
    S extends `#${infer Rest}`
        ? Rest extends `${infer _}${infer _}${infer _}${infer _}${infer _}${infer _}`
            ? true
            : false
        : false;
```

While this is not a complete hex validator (it does not check character ranges),
it demonstrates how template patterns can enforce structural constraints.

### Combining with Mapped Types

Template literal pattern matching pairs beautifully with mapped types to transform
object types based on key names:

```typescript
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

## Common Pitfalls

- **Greedy matching**: `infer` captures as little as possible from the left. In `"a-b-c"` matched against `` `${infer Head}-${infer Tail}` ``, `Head` is `"a"` and `Tail` is `"b-c"`. This left-to-right minimal matching is important for recursive patterns.
- **Recursion depth limits**: TypeScript limits type recursion to around 50 levels. Very long strings or deeply nested patterns may hit this limit.
- **`string` vs specific literals**: Pattern matching only works with specific string literal types. If you pass `string` (the broad type), the pattern will not match — `string extends \`...\`` is always false.
- **Order of `infer` positions matters**: When multiple `infer` positions are adjacent without a separator, TypeScript may not be able to determine where one capture ends and another begins.

## Key Takeaways

- Template literal types combined with `infer` enable compile-time string parsing.
- You can extract parts of a string by matching against a pattern with `infer` placeholders.
- Recursive template literal types can parse repeated patterns like delimited lists or route parameters.
- This technique powers type-safe routing, event systems, and string protocol validation.
- Pattern matching only works with specific string literal types, not the broad `string` type.

<div class="hint">
Template literal pattern matching is the same concept as regex capture groups, but at
the type level. Where a regex like `/^(\w+)@(\w+)\.(\w+)$/` captures parts of a string
at runtime, a type like `` S extends `${infer User}@${infer Domain}` `` captures parts
at compile time. The key difference is that type-level parsing produces types, not values —
you get compile-time safety rather than runtime extraction.
</div>
