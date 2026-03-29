# Intrinsic String Manipulation Types

TypeScript provides four built-in utility types that transform string literal types
at the character level. These are called *intrinsic* types because they are implemented
directly in the compiler — you cannot reimplement them in userland TypeScript. They are
essential companions to template literal types.

## Core Concept

The four intrinsic string manipulation types are:

```typescript
Uppercase<S>     // Converts every character to uppercase
Lowercase<S>     // Converts every character to lowercase
Capitalize<S>    // Converts the first character to uppercase
Uncapitalize<S>  // Converts the first character to lowercase
```

Each takes a string literal type (or union of string literals) and returns the
transformed version:

```typescript
type A = Uppercase<"hello">;       // "HELLO"
type B = Lowercase<"WORLD">;       // "world"
type C = Capitalize<"foo">;        // "Foo"
type D = Uncapitalize<"Bar">;      // "bar"
```

## How It Works

### Uppercase and Lowercase

These transform every character in the string literal:

```typescript
type Shout = Uppercase<"warning">;         // "WARNING"
type Whisper = Lowercase<"DANGER">;        // "danger"
type Mixed = Uppercase<"camelCase">;       // "CAMELCASE"
```

They work with unions too — each member is transformed independently:

```typescript
type Status = "active" | "inactive" | "pending";
type UpperStatus = Uppercase<Status>;
// "ACTIVE" | "INACTIVE" | "PENDING"
```

### Capitalize and Uncapitalize

These only affect the first character, leaving the rest unchanged:

```typescript
type Cap = Capitalize<"hello world">;      // "Hello world"
type Uncap = Uncapitalize<"Hello world">;  // "hello world"
type Cap2 = Capitalize<"fooBar">;          // "FooBar"
```

`Capitalize` is by far the most commonly used intrinsic type. It is the key to
building idiomatic JavaScript naming patterns at the type level.

### Combining with Template Literals

The real power emerges when you combine intrinsic types with template literal types:

```typescript
type Event = "click" | "scroll" | "focus";

// Build "onClick" | "onScroll" | "onFocus"
type EventHandler = `on${Capitalize<Event>}`;

// Build "CLICK_EVENT" | "SCROLL_EVENT" | "FOCUS_EVENT"
type EventConstant = `${Uppercase<Event>}_EVENT`;
```

This pattern is used extensively in frameworks. React's event handler props, for example,
follow the `on${Capitalize<event>}` pattern.

### Building Getter/Setter Names

A classic use case is generating accessor method names from property names:

```typescript
type PropName = "name" | "age" | "email";

type Getter = `get${Capitalize<PropName>}`;
// "getName" | "getAge" | "getEmail"

type Setter = `set${Capitalize<PropName>}`;
// "setName" | "setAge" | "setEmail"
```

### Chaining Transformations

You can nest intrinsic types to apply multiple transformations:

```typescript
type Input = "hello-world";
type Step1 = Capitalize<Input>;              // "Hello-world"
type Step2 = Uppercase<Input>;               // "HELLO-WORLD"
type Step3 = Capitalize<Lowercase<"FOO">>;   // "Foo"
```

Note that `Capitalize<Lowercase<S>>` is a common pattern to normalize a string to
"sentence case" — lowercase everything, then capitalize the first letter.

## Common Pitfalls

- **Cannot reimplement in userland**: Unlike `Partial` or `Readonly`, you cannot write your own version of `Uppercase<T>`. These types are compiler intrinsics — they use special logic that is not expressible in TypeScript's type language.
- **Only affect string literal types**: `Uppercase<string>` returns `string` — it does not narrow the type. These utilities are only useful with specific string literals or unions of literals.
- **Capitalize vs Uppercase**: `Capitalize<"hello">` is `"Hello"` (first char only), while `Uppercase<"hello">` is `"HELLO"` (all chars). Mixing them up is a common mistake.
- **No runtime effect**: These are purely compile-time transformations. You still need `toUpperCase()` or `toLowerCase()` at runtime.

## Key Takeaways

- TypeScript provides `Uppercase`, `Lowercase`, `Capitalize`, and `Uncapitalize` as built-in intrinsic types.
- They transform string literal types at the character level during compilation.
- `Capitalize` is the most commonly used — it enables patterns like `on${Capitalize<Event>}`.
- They distribute over unions, transforming each member independently.
- Combine them with template literal types for powerful string type construction.

<div class="hint">
The intrinsic string types were added in TypeScript 4.1 alongside template literal types.
They are the only types in TypeScript that are implemented as compiler built-ins rather
than as type aliases. The compiler recognizes them by name and applies the transformation
directly — there is no type definition you can inspect in `lib.d.ts` for their implementation.
</div>
