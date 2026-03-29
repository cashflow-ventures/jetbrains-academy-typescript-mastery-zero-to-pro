# UnionToIntersection Exercise

Put the contravariant inference technique into practice. You will implement
`UnionToIntersection<U>` and use it to build a utility that merges multiple
configuration objects into a single combined config.

## Instructions

1. In `task.ts`, implement the type alias `UnionToIntersection<U>` that converts
   a union type into an intersection type using contravariant function parameter
   inference.

2. Implement the function `mergeConfigs<T extends object>(configs: T[]): UnionToIntersection<T>`
   that takes an array of config objects and merges them into a single object
   using `Object.assign`. The return type should be `UnionToIntersection<T>`.

3. Implement the function `collectHandlers<T extends Record<string, Function>>(handlers: T[]): UnionToIntersection<T>`
   that merges an array of handler maps into a single handler map.

## Example

```typescript
type U = UnionToIntersection<{ a: 1 } | { b: 2 }>;
// { a: 1 } & { b: 2 }

mergeConfigs([{ host: "localhost" }, { port: 3000 }]);
// { host: "localhost", port: 3000 }

collectHandlers([
    { onClick: () => "click" },
    { onHover: () => "hover" },
]);
// { onClick: () => "click", onHover: () => "hover" }
```

<div class="hint">
The key pattern: `(U extends unknown ? (x: U) => void : never) extends
(x: infer I) => void ? I : never`. The outer conditional distributes the
union into function types, and the inner `infer` extracts the intersection
from the contravariant parameter position.
</div>
