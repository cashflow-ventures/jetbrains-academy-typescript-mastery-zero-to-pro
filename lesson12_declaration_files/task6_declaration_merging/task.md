# Declaration Merging In Depth

Declaration merging is one of TypeScript's most powerful and unique features. When two
declarations share the same name, TypeScript **merges** them into a single definition
instead of throwing an error. This mechanism powers interface extension, namespace
augmentation, and many patterns used by libraries and frameworks. Understanding the
merging rules is essential for writing advanced TypeScript.

## Core Concept

Declaration merging occurs when the compiler encounters multiple declarations with the
same name in the same scope. The result depends on what kinds of declarations are being
merged. TypeScript has three declaration types:

- **Namespace** — creates a named object with exported members
- **Type** — creates a type alias or interface visible in type positions
- **Value** — creates a runtime value (variable, function, class, enum)

Different declaration kinds can merge with each other according to specific rules.

### Interface Merging

The most common form of merging. When two `interface` declarations share the same name,
their members are combined:

```typescript
interface User {
    id: number;
    name: string;
}

interface User {
    email: string;
    role: "admin" | "user";
}

// Merged result — User has all four properties:
const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
};
```

Later declarations take precedence for overloaded function signatures. Non-function
members must have identical types if they share a name — otherwise TypeScript reports
an error.

### Namespace Merging

Two `namespace` declarations with the same name merge their exported members:

```typescript
namespace Validation {
    export function isEmail(value: string): boolean {
        return value.includes("@");
    }
}

namespace Validation {
    export function isUrl(value: string): boolean {
        return value.startsWith("http");
    }
}

// Both functions are available:
Validation.isEmail("test@example.com"); // true
Validation.isUrl("https://example.com"); // true
```

Non-exported members remain private to their original namespace block.

## How It Works

### Class + Namespace Merging

A namespace can merge with a class to add static members. The class must be declared
**before** the namespace:

```typescript
class Album {
    label: Album.AlbumLabel;

    constructor(label: Album.AlbumLabel) {
        this.label = label;
    }
}

namespace Album {
    export interface AlbumLabel {
        name: string;
        color: string;
    }

    export function createDefault(): Album {
        return new Album({ name: "Default", color: "blue" });
    }
}

// The namespace adds a nested type and a static-like factory:
const label: Album.AlbumLabel = { name: "Vinyl", color: "black" };
const album = new Album(label);
const defaultAlbum = Album.createDefault();
```

This pattern is useful for attaching helper types and factory functions to a class
without cluttering the class body.

### Enum + Namespace Merging

A namespace can extend an enum with additional static members:

```typescript
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE",
}

namespace Color {
    export function fromHex(hex: string): Color | undefined {
        const map: Record<string, Color> = {
            "#FF0000": Color.Red,
            "#00FF00": Color.Green,
            "#0000FF": Color.Blue,
        };
        return map[hex.toUpperCase()];
    }

    export function toDisplayName(color: Color): string {
        const names: Record<Color, string> = {
            [Color.Red]: "Red",
            [Color.Green]: "Green",
            [Color.Blue]: "Blue",
        };
        return names[color];
    }
}

// Use enum values and namespace functions together:
const color = Color.fromHex("#FF0000"); // Color.Red
if (color) {
    console.log(Color.toDisplayName(color)); // "Red"
}
```

### Module Augmentation

To add declarations to an existing module (e.g., a third-party library), use
`declare module`:

```typescript
// Augmenting Express with a custom property on Request
import { Request } from "express";

declare module "express" {
    interface Request {
        userId?: string;
        sessionId?: string;
    }
}

// Now req.userId is recognized by TypeScript
function handler(req: Request): void {
    console.log(req.userId);
}
```

Module augmentation follows the same interface merging rules — your new properties
are merged into the existing interface definition.

### What Cannot Merge

Not all declaration combinations are valid:

| Declaration A | Declaration B | Can Merge? |
|--------------|--------------|------------|
| Interface    | Interface    | ✅ Yes     |
| Namespace    | Namespace    | ✅ Yes     |
| Namespace    | Class        | ✅ Yes     |
| Namespace    | Function     | ✅ Yes     |
| Namespace    | Enum         | ✅ Yes     |
| Class        | Class        | ❌ No      |
| Type Alias   | Type Alias   | ❌ No      |
| Type Alias   | Interface    | ❌ No      |

Classes cannot merge with other classes, and type aliases cannot merge with anything.
This is why interfaces are preferred when you need declaration merging.

## Common Pitfalls

- **Type aliases don't merge.** If you write `type User = { id: number }` twice,
  TypeScript reports a duplicate identifier error. Use `interface` when you need merging.
- **Property type conflicts in interface merging.** If two interface declarations define
  the same non-function property with different types, TypeScript reports an error. The
  types must be identical.
- **Namespace must come after class/function.** When merging a namespace with a class or
  function, the class or function declaration must appear first. Reversing the order
  causes an error.
- **Forgetting `export` in namespaces.** Members inside a namespace block that aren't
  marked `export` are private to that block and won't appear in the merged result.
- **Module augmentation scope.** `declare module "x"` must appear in a module file (one
  with `import`/`export`). In a script file, it declares a new ambient module instead
  of augmenting an existing one.

## Key Takeaways

- Interfaces with the same name automatically merge their members.
- Namespaces merge with each other, and can also merge with classes, functions, and enums.
- Class + namespace merging adds static-like members and nested types to a class.
- Enum + namespace merging adds utility functions to an enum.
- Type aliases and classes cannot merge with themselves — use interfaces for mergeable types.
- Module augmentation (`declare module "x"`) extends third-party module types.
- The class or function must be declared before the namespace that merges with it.

<div class="hint">
Declaration merging is how TypeScript's own `lib.d.ts` files work. The `Array` interface
is defined across multiple `lib.*.d.ts` files — each ECMAScript version adds new methods
(like `Array.prototype.at()` from ES2022) by merging into the existing `Array` interface.
</div>

<div class="hint">
When extending third-party types via module augmentation, create a dedicated `types/`
directory with `.d.ts` files. This keeps your augmentations organized and easy to find.
Name the files after the module they augment: `types/express.d.ts`, `types/lodash.d.ts`.
</div>
