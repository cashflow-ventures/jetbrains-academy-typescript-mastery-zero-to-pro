# Exhaustive Checking with never

When you narrow a union type through all its members, the remaining type becomes `never` —
a type that represents values that can never occur. You can use this to build an **exhaustiveness
check** that causes a compile-time error if you forget to handle a union member.

## Instructions

1. A helper function `assertNever` is provided. It takes a `never` parameter and throws an
   error. If TypeScript allows a value to reach this function, it means you missed a case.

2. The `TrafficLight` type is a union of `"red" | "yellow" | "green"`. Implement `getAction`
   that returns:
   - `"red"` → `"stop"`
   - `"yellow"` → `"caution"`
   - `"green"` → `"go"`
   Use a `switch` statement and call `assertNever` in the `default` case.

3. The `Shape` type is a union of `Circle | Rectangle | Triangle`. Implement `getPerimeter`:
   - Circle: `2 * Math.PI * radius`
   - Rectangle: `2 * (width + height)`
   - Triangle: `sideA + sideB + sideC`
   Use `assertNever` to ensure exhaustiveness.

4. The `HttpMethod` type is `"GET" | "POST" | "PUT" | "DELETE"`. Implement `isReadOnly` that
   returns `true` for `"GET"` and `false` for all others. Use `assertNever` in the default case.

## Example

```typescript
getAction("red");     // "stop"
getAction("green");   // "go"

getPerimeter({ kind: "circle", radius: 5 });  // ~31.42
getPerimeter({ kind: "rectangle", width: 4, height: 3 }); // 14

isReadOnly("GET");    // true
isReadOnly("POST");   // false
```

<div class="hint">
The `assertNever` function accepts a `never` parameter. If your `switch` doesn't cover all
cases, TypeScript will report an error because the uncovered case isn't assignable to `never`.
This is a compile-time safety net.
</div>
