# Namespaces

Before ES modules became the standard, TypeScript had its own way of organizing code:
**namespaces** (originally called "internal modules"). While ES modules are the recommended
approach for new code, namespaces still appear in legacy codebases, declaration files, and
a few specific patterns worth understanding.

## Core Concept

A namespace wraps declarations inside a named scope, preventing them from polluting the
global namespace:

```typescript
namespace Validation {
    export interface Validator {
        isValid(value: string): boolean;
    }

    export class EmailValidator implements Validator {
        isValid(value: string): boolean {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
    }

    // Not exported — private to the namespace
    const MAX_LENGTH = 255;
}

// Access via the namespace name
const validator: Validation.Validator = new Validation.EmailValidator();
console.log(validator.isValid("test@example.com")); // true
```

Only members marked with `export` inside the namespace are accessible from outside.
Non-exported members are private to the namespace.

## How It Works — Compiled Output

Namespaces compile to an **immediately invoked function expression (IIFE)** that creates
an object:

```typescript
namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }
}
```

Compiles to:

```javascript
var MathUtils;
(function (MathUtils) {
    function add(a, b) {
        return a + b;
    }
    MathUtils.add = add;
})(MathUtils || (MathUtils = {}));
```

The IIFE pattern ensures that private members stay private and exported members are
attached to the namespace object.

## Namespace Merging

TypeScript allows multiple `namespace` declarations with the same name — they **merge**
automatically. This is useful for splitting a large namespace across files or extending
it incrementally:

```typescript
namespace Animals {
    export class Dog {
        speak(): string { return "Woof!"; }
    }
}

namespace Animals {
    export class Cat {
        speak(): string { return "Meow!"; }
    }
}

// Both Dog and Cat are available
const dog = new Animals.Dog();
const cat = new Animals.Cat();
```

Merging also works across different declaration types. A namespace can merge with a
class, function, or enum to add static-like properties:

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
        country: string;
    }
}

// The class and namespace merge — Album has both
// the constructor and the AlbumLabel type
const album = new Album({ name: "Acme Records", country: "US" });
```

## Nested Namespaces

Namespaces can be nested for deeper organization:

```typescript
namespace App {
    export namespace Models {
        export interface User {
            id: number;
            name: string;
        }
    }

    export namespace Services {
        export function getUser(id: number): Models.User {
            return { id, name: "Alice" };
        }
    }
}

const user: App.Models.User = App.Services.getUser(1);
```

You can also use the shorthand dot notation:

```typescript
namespace App.Models {
    export interface Product {
        id: number;
        name: string;
    }
}
```

## When to Use Namespaces

In modern TypeScript, **prefer ES modules over namespaces** for organizing code. However,
namespaces are still appropriate in these cases:

1. **Declaration files (`.d.ts`)** — Many DefinitelyTyped packages use namespaces to
   describe global libraries (e.g., `namespace Express { ... }`).
2. **Declaration merging** — Merging a namespace with a class or enum to add static
   members is a pattern that only namespaces support.
3. **Legacy codebases** — Older TypeScript projects may use namespaces extensively.
   Understanding them is necessary for maintenance.
4. **Global scripts** — If you're writing TypeScript that runs as a script (not a
   module), namespaces prevent global scope pollution.

## Common Pitfalls

- **Using namespaces in module files.** If your file has `import` or `export` at the
  top level, it's already a module. Adding `namespace` inside a module is redundant
  and confusing — use regular exports instead.
- **Confusing namespaces with modules.** Namespaces are a TypeScript-only organizational
  tool. ES modules are the JavaScript standard. Don't wrap your module exports in a
  namespace.
- **Over-nesting.** Deep namespace hierarchies like `App.Core.Data.Models.User` create
  verbose access patterns. Keep nesting shallow or switch to modules.

## Key Takeaways

- Namespaces group declarations under a named scope using the `namespace` keyword.
- Only `export`-ed members are accessible outside the namespace.
- Multiple namespace declarations with the same name merge automatically.
- Namespaces can merge with classes, functions, and enums.
- Prefer ES modules for new code; use namespaces for declaration files and merging patterns.

<div class="hint">
The `namespace` keyword replaced the older `module` keyword (e.g., `module Validation { ... }`).
You may see the old syntax in very old codebases. They're identical in behavior — TypeScript
renamed it to avoid confusion with ES modules.
</div>
