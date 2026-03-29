# Typing Objects

Now it's your turn to work with inline object types. You'll write functions that accept objects
as parameters and return objects, using the object type literal syntax you just learned.

## Instructions

1. Implement `formatAddress` — it takes an object with `street` (string), `city` (string), and
   an optional `zip` (string). Return a formatted string: `"street, city"` or `"street, city zip"`
   if zip is provided.

2. Implement `createProduct` — it takes `name` (string) and `price` (number) and returns an object
   with those properties plus an `id` property (number). Use a simple counter starting at 1 that
   increments each time the function is called.

3. Implement `getFullName` — it takes an object with `first` (string), `last` (string), and an
   optional `middle` (string). Return the full name: `"first last"` or `"first middle last"` if
   middle is provided.

4. Export all three functions.

## Example

```typescript
formatAddress({ street: "123 Main St", city: "Springfield" });
// returns "123 Main St, Springfield"

formatAddress({ street: "123 Main St", city: "Springfield", zip: "62704" });
// returns "123 Main St, Springfield 62704"

createProduct("Widget", 9.99);
// returns { id: 1, name: "Widget", price: 9.99 }

getFullName({ first: "John", last: "Doe" });
// returns "John Doe"

getFullName({ first: "John", middle: "Michael", last: "Doe" });
// returns "John Michael Doe"
```

<div class="hint">
For the product counter, declare a `let` variable outside the function. Each call to
`createProduct` should increment it and use the new value as the `id`.
</div>
