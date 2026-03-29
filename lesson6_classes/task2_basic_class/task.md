# Basic Class Exercise

Put your class knowledge into practice by building a `BankAccount` class. You'll declare typed
properties, write a constructor, and implement methods that operate on the account's state.

## Instructions

1. In `task.ts`, create a class called `BankAccount` with the following typed properties:
   - `owner` of type `string`
   - `balance` of type `number`
2. Write a constructor that takes `owner` (string) and `initialBalance` (number) parameters
   and assigns them to the properties.
3. Implement a `deposit` method that takes an `amount` (number) and adds it to the balance.
   It should return `void`. If the amount is negative or zero, do nothing.
4. Implement a `withdraw` method that takes an `amount` (number) and subtracts it from the
   balance. It should return `boolean` — `true` if the withdrawal succeeded, `false` if
   there are insufficient funds (balance would go below zero). Do nothing if amount is
   negative or zero (return `false`).
5. Implement a `getBalance` method that returns the current balance as a `number`.
6. Implement a `getSummary` method that returns a string in the format:
   `"Account owner: {owner}, Balance: {balance}"`
7. Export the `BankAccount` class.

## Example

```typescript
const account = new BankAccount("Alice", 100);
account.deposit(50);           // balance is now 150
account.withdraw(30);          // returns true, balance is now 120
account.withdraw(200);         // returns false, balance stays 120
account.getBalance();          // returns 120
account.getSummary();          // "Account owner: Alice, Balance: 120"
```

<div class="hint">
Remember to check for edge cases: what happens when someone tries to deposit a negative
amount, or withdraw more than the balance? Guard against these in your method implementations.
</div>
