// TODO: Define a Dictionary interface with a string index signature (all values are string)
export interface Dictionary {
    // Define index signature here
}

// TODO: Define a TypedConfig interface with appName (string) and
// a string index signature where values can be string | number | boolean
export interface TypedConfig {
    // Define properties here
}

// TODO: Implement countKeys
// Takes a Dictionary and returns the number of keys
export function countKeys(dict: Dictionary): number {
    // Write your solution here
    return 0;
}

// TODO: Implement getValueOrDefault
// Takes a Dictionary, a key, and a fallback string
// Returns the value at key if it exists, otherwise the fallback
export function getValueOrDefault(dict: Dictionary, key: string, fallback: string): string {
    // Write your solution here
    return "";
}

// TODO: Implement mergeConfigs
// Takes two TypedConfig objects and returns a merged TypedConfig
// Second config's values override the first's
export function mergeConfigs(base: TypedConfig, override: TypedConfig): TypedConfig {
    // Write your solution here
    return { appName: "" };
}
