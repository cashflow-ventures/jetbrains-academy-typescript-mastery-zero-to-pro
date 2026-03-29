// TODO: Export an interface BaseUser with id (number), name (string), email (string)

// TODO: Export an interface AugmentedUser extending BaseUser with:
//   role ("admin" | "editor" | "viewer"), lastLogin (string)

// TODO: Export a function augmentUser(user, role, lastLogin) returning AugmentedUser
export function augmentUser(
    user: { id: number; name: string; email: string },
    role: "admin" | "editor" | "viewer",
    lastLogin: string
): { id: number; name: string; email: string; role: "admin" | "editor" | "viewer"; lastLogin: string } {
    // Write your solution here
    return { id: 0, name: "", email: "", role: "viewer", lastLogin: "" };
}

// TODO: Export an interface BaseConfig with host (string), port (number)

// TODO: Export an interface AugmentedConfig extending BaseConfig with:
//   ssl (boolean), timeout (number), retries (number)

// TODO: Export a function augmentConfig(config, extras) returning AugmentedConfig
export function augmentConfig(
    config: { host: string; port: number },
    extras: { ssl: boolean; timeout: number; retries: number }
): { host: string; port: number; ssl: boolean; timeout: number; retries: number } {
    // Write your solution here
    return { host: "", port: 0, ssl: false, timeout: 0, retries: 0 };
}

// TODO: Export a function hasAugmentation(value: unknown, key: string): boolean
// Returns true if value is a non-null object that has the given key as own property
export function hasAugmentation(value: unknown, key: string): boolean {
    // Write your solution here
    return false;
}
