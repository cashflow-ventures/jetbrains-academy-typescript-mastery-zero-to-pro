// Recursive Conditional Types — Demonstration

// DeepReadonly: makes every property readonly at all levels
type DeepReadonly<T> =
    T extends (infer E)[]
        ? readonly DeepReadonly<E>[]
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// DeepPartial: makes every property optional at all levels
type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

// Flatten: recursively unwraps nested arrays
type Flatten<T> = T extends (infer E)[] ? Flatten<E> : T;

// --- Usage ---
interface Config {
    server: { host: string; port: number };
    features: { darkMode: boolean; beta: { enabled: boolean } };
}

type FrozenConfig = DeepReadonly<Config>;
type PartialConfig = DeepPartial<Config>;

type F1 = Flatten<number[][][]>;  // number
type F2 = Flatten<string[]>;      // string
type F3 = Flatten<boolean>;       // boolean

// Runtime equivalent of flatten
function flattenArray<T>(value: T | T[]): T[] {
    if (Array.isArray(value)) {
        return value.flatMap((item) => flattenArray(item)) as T[];
    }
    return [value];
}

console.log(flattenArray([[1, 2], [3, [4, 5]]]));  // [1, 2, 3, 4, 5]
console.log(flattenArray("hello"));                  // ["hello"]
