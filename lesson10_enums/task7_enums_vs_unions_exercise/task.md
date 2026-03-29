# Enums vs Unions Exercise

Practice converting between enums and union literal types. You'll implement the same
logic using both approaches to see the trade-offs firsthand.

## Instructions

1. In `task.ts`, create and export a **string enum** called `RoleEnum` with members:
   - `Admin` = `"ADMIN"`
   - `Editor` = `"EDITOR"`
   - `Viewer` = `"VIEWER"`

2. Create and export a **union literal type** called `RoleUnion`:
   `"ADMIN" | "EDITOR" | "VIEWER"`

3. Export a function `describeRoleEnum` that takes a `RoleEnum` and returns:
   - `Admin` → `"Full access to all resources."`
   - `Editor` → `"Can edit and publish content."`
   - `Viewer` → `"Read-only access."`

4. Export a function `describeRoleUnion` that takes a `RoleUnion` and returns the
   same messages as above for the corresponding string values.

5. Export a function `getAllRoles` that returns an array of all `RoleEnum` values
   by reading them from the enum object at runtime (use `Object.values`).

## Example

```typescript
describeRoleEnum(RoleEnum.Admin);     // "Full access to all resources."
describeRoleUnion("EDITOR");          // "Can edit and publish content."
getAllRoles();                         // ["ADMIN", "EDITOR", "VIEWER"]
```

<div class="hint">
For `describeRoleEnum`, use a `switch` on the enum parameter. For `describeRoleUnion`,
the same `switch` works — but the parameter is a plain string union instead of an enum type.
`Object.values(RoleEnum)` gives you all the string values at runtime.
</div>
