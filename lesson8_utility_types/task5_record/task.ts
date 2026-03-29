// Record<K, V> — typed dictionaries and lookup tables

// Exhaustive lookup with literal union keys
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogConfig {
    color: string;
    prefix: string;
}

const logConfig: Record<LogLevel, LogConfig> = {
    debug: { color: "gray",   prefix: "[DEBUG]" },
    info:  { color: "blue",   prefix: "[INFO]" },
    warn:  { color: "yellow", prefix: "[WARN]" },
    error: { color: "red",    prefix: "[ERROR]" },
};

// General dictionary with string keys
type WordCount = Record<string, number>;

function countWords(text: string): WordCount {
    const counts: WordCount = {};
    for (const word of text.toLowerCase().split(/\s+/)) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

// Nested Record for multi-dimensional lookups
type Permission = "read" | "write" | "delete";
type Role = "viewer" | "editor" | "admin";

const permissions: Record<Role, Record<Permission, boolean>> = {
    viewer: { read: true,  write: false, delete: false },
    editor: { read: true,  write: true,  delete: false },
    admin:  { read: true,  write: true,  delete: true },
};

console.log(logConfig.error.prefix);          // "[ERROR]"
console.log(countWords("hello world hello")); // { hello: 2, world: 1 }
console.log(permissions.editor.write);        // true
