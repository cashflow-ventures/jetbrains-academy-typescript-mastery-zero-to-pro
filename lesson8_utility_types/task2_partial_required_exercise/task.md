# Partial & Required Exercise

Practice using `Partial<T>` for update operations and `Required<T>` for validation boundaries.

## Instructions

1. The `UserProfile` interface is provided for you.
2. Implement `updateProfile` — it takes a current `UserProfile` and a `Partial<UserProfile>` patch,
   and returns a new `UserProfile` with the patched values merged in.
3. Implement `validateProfile` — it takes a `Partial<UserProfile>` and checks that **all** fields
   are present (not `undefined`). If valid, return the object typed as `Required<UserProfile>`.
   If any field is missing, throw an `Error` with the message `"Missing required fields"`.
4. Implement `createReadonlyProfile` — it takes a `UserProfile` and returns a `Readonly<UserProfile>`.

## Example

```typescript
const profile: UserProfile = { username: "alice", email: "a@b.com", age: 30 };
updateProfile(profile, { age: 31 }); // { username: "alice", email: "a@b.com", age: 31 }

validateProfile({ username: "bob", email: "b@c.com", age: 25 }); // returns Required<UserProfile>
validateProfile({ username: "bob" }); // throws Error("Missing required fields")
```

<div class="hint">
Use the spread operator `{ ...current, ...patch }` to merge objects. For validation,
check each field individually against `undefined`.
</div>
