// TODO: Build a Redux-like state management store using discriminated unions,
// a pure reducer, and a generic createStore function with subscriptions.

// --- Item interface ---
// TODO: Export an Item interface with id (string) and name (string)

// --- State interface ---
// TODO: Export a State interface with items (Item[])

// --- Action discriminated union ---
// TODO: Export an Action type that is a union of:
//   { type: "ADD_ITEM"; payload: Item }
//   { type: "REMOVE_ITEM"; payload: string }
//   { type: "CLEAR" }

// --- reducer ---
// TODO: Export a reducer function: (state: State, action: Action) => State
// It must be pure — never mutate the input state.
//   "ADD_ITEM"    → append payload to items
//   "REMOVE_ITEM" → remove item whose id matches payload
//   "CLEAR"       → return state with empty items array
export function reducer(state: any, action: any): any {
    // Write your solution here
    return state;
}

// --- createStore<S, A> ---
// TODO: Export a generic createStore function that accepts:
//   initialState: S
//   reducerFn: (state: S, action: A) => S
// and returns { getState, dispatch, subscribe }.
//   getState()            → returns current state
//   dispatch(action: A)   → applies reducer, updates state, notifies listeners
//   subscribe(listener)   → registers listener, returns unsubscribe function
export function createStore(initialState: any, reducerFn: any): any {
    // Write your solution here
    return {
        getState(): any {
            return undefined;
        },
        dispatch(action: any): void {
            // Write your solution here
        },
        subscribe(listener: any): any {
            // Write your solution here
            return () => {};
        },
    };
}
