# Pick and Omit

When you have a large type but only need a subset of its properties — or want to exclude a few —
`Pick<T, K>` and `Omit<T, K>` are your go-to utility types. They let you derive new types from
existing ones without duplicating property definitions.

## Core Concept

```typescript
// Simplified definitions
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

`Pick<T, K>` creates a type with **only** the properties whose keys are in `K`.
`Omit<T, K>` creates a type with **all** properties of `T` **except** those whose keys are in `K`.

```typescript
interface Article {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

// Only id and title
type ArticlePreview = Pick<Article, "id" | "title">;
// { id: number; title: string }

// Everything except body
type ArticleMeta = Omit<Article, "body">;
// { id: number; title: string; author: string; createdAt: Date; updatedAt: Date }
```

## How It Works

### Pick — select specific properties

`Pick` is useful when you need a focused view of a larger type. A common pattern is creating
separate types for different API responses:

```typescript
interface User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    role: "admin" | "user";
    createdAt: Date;
}

// Public profile — no sensitive data
type PublicUser = Pick<User, "id" | "username" | "role">;

// Login response — just what the client needs
type LoginResponse = Pick<User, "id" | "username" | "email" | "role">;
```

### Omit — exclude specific properties

`Omit` is the inverse. It is especially handy when you want "everything except a few fields":

```typescript
// For creating a new user — no id or createdAt yet
type CreateUserInput = Omit<User, "id" | "createdAt">;
// { username: string; email: string; passwordHash: string; role: "admin" | "user" }

// For updating — omit the immutable fields
type UpdateUserInput = Partial<Omit<User, "id" | "createdAt">>;
```

Notice how `Omit` and `Partial` compose nicely — you can chain utility types to build exactly
the shape you need.

### Combining Pick and Omit

You can combine them for more complex transformations:

```typescript
// Take only name and email, then make them optional
type OptionalContact = Partial<Pick<User, "username" | "email">>;
// { username?: string; email?: string }
```

## Common Pitfalls

- **Typos in key names**: `Pick<User, "nmae">` is a compile error because `"nmae"` is not a key
  of `User`. This is actually a feature — it catches typos at compile time.
- **`Omit` does not error on unknown keys**: Unlike `Pick`, `Omit<User, "foo">` compiles without
  error even though `"foo"` is not a key of `User`. The `K` parameter in `Omit` is
  `keyof any` (i.e., `string | number | symbol`), not `keyof T`.
- **Shallow only**: Like `Partial` and `Readonly`, these operate on top-level properties only.

## Key Takeaways

- `Pick<T, K>` selects a subset of properties — great for creating focused response types.
- `Omit<T, K>` excludes properties — great for input types that skip auto-generated fields.
- Both compose well with other utility types like `Partial` and `Readonly`.
- `Pick` catches invalid key names at compile time; `Omit` does not.
- Use them to keep your types DRY — derive from a single source of truth.

<div class="hint">
A good rule of thumb: if you need fewer than half the properties, use `Pick`. If you need
most properties but want to exclude a few, use `Omit`.
</div>
