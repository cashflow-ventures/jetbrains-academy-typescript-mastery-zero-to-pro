# Type-Safe Error Handling

Refactor traditional try/catch code into the Result pattern. You will build
functions that return typed Results instead of throwing exceptions, then
compose them into a pipeline.

## Instructions

The `Result` type and `ok`/`err` helpers are provided for you.

1. Implement `parseInteger(input: string): Result<number, string>`:
   - If the trimmed input is empty, return `err(`Invalid integer: '${input}'`)`.
   - Use `Number(input)` to parse. If the result `isNaN`, return `err(`Invalid integer: '${input}'`)`.
   - If the number is not a whole number (use `Number.isInteger`), return `err(`Not an integer: '${input}'`)`.
   - Otherwise return `ok` with the parsed number.

2. Implement `validateRange(min: number, max: number)` that returns a function
   `(value: number) => Result<number, string>`:
   - If `value < min`, return `err(`Value ${value} is below minimum ${min}`)`.
   - If `value > max`, return `err(`Value ${value} exceeds maximum ${max}`)`.
   - Otherwise return `ok(value)`.

3. Implement `parseAndValidate(input: string, min: number, max: number): Result<number, string>`:
   - First call `parseInteger(input)`.
   - If that succeeds, pass the value to `validateRange(min, max)`.
   - Return the final Result. Use the provided `flatMapResult` helper.

4. Implement `collectResults<T, E>(results: Result<T, E>[]): Result<T[], E>`:
   - If all results are ok, return `ok` with an array of all values.
   - If any result is an error, return the *first* error encountered.

## Example

```typescript
parseInteger("42");          // { ok: true, value: 42 }
parseInteger("abc");         // { ok: false, error: "Invalid integer: 'abc'" }
parseInteger("3.14");        // { ok: false, error: "Not an integer: '3.14'" }

const check = validateRange(1, 100);
check(50);                   // { ok: true, value: 50 }
check(200);                  // { ok: false, error: "Value 200 exceeds maximum 100" }

parseAndValidate("42", 1, 100);  // { ok: true, value: 42 }
parseAndValidate("abc", 1, 100); // { ok: false, error: "Invalid integer: 'abc'" }

collectResults([ok(1), ok(2), ok(3)]);  // { ok: true, value: [1, 2, 3] }
collectResults([ok(1), err("bad")]);    // { ok: false, error: "bad" }
```

<div class="hint">
For `collectResults`, iterate through the array and check each result. As soon
as you find an error, return it immediately. If you reach the end without errors,
collect all values into an array.
</div>
