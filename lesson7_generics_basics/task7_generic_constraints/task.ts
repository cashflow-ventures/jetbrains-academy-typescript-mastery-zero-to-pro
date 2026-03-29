// Generic Constraints — restricting what types T can be

// 1. Constraining to types with a .length property
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log(getLength("hello"));     // 5
console.log(getLength([1, 2, 3]));   // 3
console.log(getLength({ length: 7, name: "test" })); // 7

// 2. Constraining to an interface
interface HasId {
    id: string;
}

function logId<T extends HasId>(item: T): void {
    console.log(`ID: ${item.id}`);
}

logId({ id: "abc", name: "Alice" }); // "ID: abc"

// 3. Constraining one parameter by another with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { name: "Alice", age: 30, active: true };
console.log(getProperty(user, "name")); // "Alice"
console.log(getProperty(user, "age"));  // 30

// 4. Returning the longer of two items
function longest<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}

console.log(longest("hello", "hi"));       // "hello"
console.log(longest([1, 2, 3], [4, 5]));   // [1, 2, 3]
