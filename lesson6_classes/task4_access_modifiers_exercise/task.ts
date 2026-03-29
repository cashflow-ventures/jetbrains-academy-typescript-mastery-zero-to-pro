// TODO: Create a UserAccount class using parameter properties
// - readonly id: number
// - public username: string
// - private password: string
// - protected email: string

export class UserAccount {
    constructor(
        readonly id: number,
        public username: string,
        private password: string,
        protected email: string
    ) {}

    // TODO: Check if the attempt matches the stored password
    checkPassword(attempt: string): boolean {
        // Write your solution here
        return false;
    }

    // TODO: Change password if oldPassword matches current password
    changePassword(oldPassword: string, newPassword: string): boolean {
        // Write your solution here
        return false;
    }

    // TODO: Return email with masked local part
    // "alice@example.com" → "a***@example.com"
    getMaskedEmail(): string {
        // Write your solution here
        return "";
    }
}
