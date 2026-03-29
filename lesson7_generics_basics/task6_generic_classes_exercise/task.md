# Generic Classes Exercise

Build two classic data structures — a `Stack` and a `Queue` — using generic classes.
Both should be fully type-safe and work with any element type.

## Instructions

1. Implement the `Stack<T>` class (last in, first out):
   - `push(item: T)` — adds an item to the top of the stack
   - `pop()` — removes and returns the top item, or `undefined` if empty
   - `peek()` — returns the top item without removing it, or `undefined` if empty
   - `isEmpty()` — returns `true` if the stack has no items
   - `size` — a getter that returns the number of items
   - `toArray()` — returns a copy of the internal items as an array (bottom to top)

2. Implement the `Queue<T>` class (first in, first out):
   - `enqueue(item: T)` — adds an item to the back of the queue
   - `dequeue()` — removes and returns the front item, or `undefined` if empty
   - `front()` — returns the front item without removing it, or `undefined` if empty
   - `isEmpty()` — returns `true` if the queue has no items
   - `size` — a getter that returns the number of items
   - `toArray()` — returns a copy of the internal items as an array (front to back)

## Example

```typescript
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.peek();    // 2
stack.pop();     // 2
stack.size;      // 1

const queue = new Queue<string>();
queue.enqueue("a");
queue.enqueue("b");
queue.front();   // "a"
queue.dequeue(); // "a"
queue.size;      // 1
```

<div class="hint">
Both classes can use a private array (`T[]`) as internal storage. For the stack, `push`
and `pop` map directly to `Array.push()` and `Array.pop()`. For the queue, `enqueue`
maps to `Array.push()` and `dequeue` maps to `Array.shift()`.
</div>

<div class="hint">
For `toArray()`, return a copy of the internal array using the spread operator
`[...this.items]` so that external code can't modify the internal state.
</div>
