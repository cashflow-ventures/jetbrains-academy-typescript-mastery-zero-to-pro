export interface UserProfile {
    username: string;
    email: string;
    age: number;
}

// TODO: Implement updateProfile
// Merge the patch into the current profile and return the result
export function updateProfile(current: UserProfile, patch: Partial<UserProfile>): UserProfile {
    // Write your solution here
    return current;
}

// TODO: Implement validateProfile
// Check that all fields are present. If valid, return as Required<UserProfile>.
// If any field is missing, throw new Error("Missing required fields")
export function validateProfile(data: Partial<UserProfile>): Required<UserProfile> {
    // Write your solution here
    throw new Error("Not implemented");
}

// TODO: Implement createReadonlyProfile
// Return the profile as Readonly<UserProfile>
export function createReadonlyProfile(profile: UserProfile): Readonly<UserProfile> {
    // Write your solution here
    return {} as Readonly<UserProfile>;
}
