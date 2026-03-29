# Build Your Own Partial

Now that you understand the `{ [K in keyof T]: ... }` syntax, it is time to rebuild
TypeScript's most common utility types from scratch. This exercise solidifies your
understanding of how mapped types transform object shapes.

## Instructions

1. In `task.ts`, implement the type alias `MyPartial<T>` that makes every property of `T` optional.
   It should behave identically to the built-in `Partial<T>`.

2. Implement the type alias `MyRequired<T>` that makes every property of `T` required
   (removes optionality). It should behave identically to the built-in `Required<T>`.

3. Implement the type alias `MyReadonly<T>` that makes every property of `T` readonly.
   It should behave identically to the built-in `Readonly<T>`.

4. Implement the helper function `applyPartialUpdate` that takes an object of type `T`
   and a partial update of type `MyPartial<T>`, and returns a new object with the updates
   merged in. Use object spread.

5. Implement the helper function `freezeObject` that takes an object of type `T` and
   returns it typed as `MyReadonly<T>`. Use `Object.freeze` internally.

## Example

```typescript
interface Config {
    host: string;
    port: number;
    debug?: boolean;
}

type PartialConfig = MyPartial<Config>;
// { host?: string; port?: number; debug?: boolean }

type RequiredConfig = MyRequired<Config>;
// { host: string; port: number; debug: boolean }

type ReadonlyConfig = MyReadonly<Config>;
// { readonly host: string; readonly port: number; readonly debug?: boolean }

const base: Config = { host: "localhost", port: 3000 };
const updated = applyPartialUpdate(base, { port: 8080 });
// { host: "localhost", port: 8080 }
```

<div class="hint">
For `MyPartial`, add `?` after the key bracket. For `MyRequired`, use `-?` to remove
optionality. For `MyReadonly`, add `readonly` before the key bracket.
</div>
