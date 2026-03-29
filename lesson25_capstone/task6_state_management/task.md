# State Management

State management is the backbone of any interactive application. A Redux-like store
uses discriminated union actions, a pure reducer function, and a subscription mechanism
to manage state predictably. In this exercise you'll build a fully typed, generic
store from scratch — combining discriminated unions, generics, and higher-order functions.

## Instructions

1. In `task.ts`, define and export an `Item` interface with:
   - `id: string`
   - `name: string`

2. Define and export a `State` interface with:
   - `items: Item[]`

3. Define and export an `Action` discriminated union type with three variants:
   - `{ type: "ADD_ITEM"; payload: Item }`
   - `{ type: "REMOVE_ITEM"; payload: string }` (the payload is the item id)
   - `{ type: "CLEAR" }`

4. Export a `reducer` function with signature `(state: State, action: Action) => State`.
   It must be **pure** (no mutation of the input state):
   - `"ADD_ITEM"` — return a new state with the payload item appended to `items`
   - `"REMOVE_ITEM"` — return a new state with the item whose `id` matches the payload removed
   - `"CLEAR"` — return a new state with an empty `items` array

5. Export a generic `createStore<S, A>` function that takes an initial state and a
   reducer of type `(state: S, action: A) => S`, and returns an object with:
   - `getState(): S` — returns the current state
   - `dispatch(action: A): void` — runs the reducer with the current state and the
     action, updates the internal state, then notifies all subscribers
   - `subscribe(listener: () => void): () => void` — registers a listener that is
     called on every dispatch. Returns an **unsubscribe** function that removes
     the listener when called.

## Example

```typescript
const store = createStore<State, Action>(
    { items: [] },
    reducer
);

const calls: number[] = [];
const unsub = store.subscribe(() => calls.push(1));

store.dispatch({ type: "ADD_ITEM", payload: { id: "1", name: "Milk" } });
store.getState(); // { items: [{ id: "1", name: "Milk" }] }
calls;            // [1]

unsub();
store.dispatch({ type: "CLEAR" });
calls;            // [1]  — listener was unsubscribed
store.getState(); // { items: [] }
```

<div class="hint">
The `createStore` function uses a closure to hold the current state and an array (or
`Set`) of listener callbacks. `dispatch` applies the reducer to produce a new state,
then iterates over the listeners. `subscribe` pushes the listener and returns a
function that splices it out. Keep the reducer pure — always return a new object
with spread syntax instead of mutating the existing state.
</div>
