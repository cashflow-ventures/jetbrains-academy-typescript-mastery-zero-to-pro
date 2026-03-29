# Access Modifiers Exercise

Practice using access modifiers and parameter properties by building a `UserAccount` class
that properly encapsulates its internal state.

## Instructions

1. In `task.ts`, create a class called `UserAccount` using **parameter properties** in the
   constructor for all properties:
   - `readonly id: number` — immutable after creation
   - `public username: string` — publicly readable and writable
   - `private password: string` — only accessible inside the class
   - `protected email: string` — accessible to subclasses
2. Implement a `checkPassword(attempt: string): boolean` method that returns `true` if the
   attempt matches the stored password, `false` otherwise.
3. Implement a `changePassword(oldPassword: string, newPassword: string): boolean` method
   that changes the password only if `oldPassword` matches the current password. Return
   `true` if the change succeeded, `false` otherwise.
4. Implement a `getMaskedEmail(): string` method that returns the email with the local part
   (before `@`) partially masked. Show the first character, replace the rest of the local
   part with `***`, then append `@` and the domain. For example, `"alice@example.com"`
   becomes `"a***@example.com"`.
5. Export the `UserAccount` class.

## Example

```typescript
const user = new UserAccount(1, "alice", "secret123", "alice@example.com");
user.id;                                    // 1
user.username;                              // "alice"
user.checkPassword("wrong");                // false
user.checkPassword("secret123");            // true
user.changePassword("secret123", "newpw");  // true
user.checkPassword("newpw");                // true
user.getMaskedEmail();                      // "a***@example.com"
```

<div class="hint">
Use `String.prototype.indexOf("@")` or `String.prototype.split("@")` to separate the local
part from the domain in the email address.
</div>
