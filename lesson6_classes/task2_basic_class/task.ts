// TODO: Create a BankAccount class with the following:
// - Properties: owner (string), balance (number)
// - Constructor: takes owner and initialBalance
// - deposit(amount): adds to balance (ignore non-positive amounts)
// - withdraw(amount): subtracts from balance, returns true/false
// - getBalance(): returns current balance
// - getSummary(): returns "Account owner: {owner}, Balance: {balance}"

export class BankAccount {
    owner: string;
    balance: number;

    constructor(owner: string, initialBalance: number) {
        // TODO: Initialize properties
        this.owner = "";
        this.balance = 0;
    }

    deposit(amount: number): void {
        // TODO: Add amount to balance (ignore if amount <= 0)
    }

    withdraw(amount: number): boolean {
        // TODO: Subtract amount from balance
        // Return true if successful, false if insufficient funds
        return false;
    }

    getBalance(): number {
        // TODO: Return current balance
        return 0;
    }

    getSummary(): string {
        // TODO: Return "Account owner: {owner}, Balance: {balance}"
        return "";
    }
}
