# Method Decorators Exercise

Practice writing method decorators that wrap function behavior. You will build a logging decorator and a caching decorator, then apply them to a service class.

## Instructions

1. Implement the `log` method decorator. It should:
   - Store each call as a `LogEntry` object in the exported `logEntries` array
   - Each `LogEntry` has `method` (string), `args` (any[]), and `result` (any)
   - The decorator must call the original method and return its result unchanged

2. Implement the `cache` method decorator. It should:
   - Cache results based on a JSON-stringified key of the arguments
   - Return the cached result on subsequent calls with the same arguments
   - Only call the original method if the result is not already cached

3. Implement the `DataService` class:
   - `fetchUser(id: number): string` decorated with `@log` — returns `"User_{id}"`
   - `computeHash(input: string): string` decorated with `@cache` — returns `"hash_{input}_{input.length}"`

## Example

```typescript
const svc = new DataService();
svc.fetchUser(1);    // returns "User_1", logged in logEntries
svc.fetchUser(2);    // returns "User_2", logged in logEntries
logEntries.length;   // 2

svc.computeHash("abc"); // computes and caches
svc.computeHash("abc"); // returns cached result
```

<div class="hint">
For the cache decorator, use a `Map<string, any>` captured in the decorator's closure.
Use `JSON.stringify(args)` as the cache key. Replace `descriptor.value` with a wrapper
that checks the map before calling the original.
</div>
