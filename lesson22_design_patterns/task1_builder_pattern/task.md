# Builder Pattern

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. In TypeScript, builders shine because method chaining combined with generics can enforce construction rules at compile time — ensuring required fields are set before `build()` is ever called.

## Core Concept

A builder provides a fluent API where each method returns `this` (or a new builder type), enabling chained calls. The final `build()` method assembles the object. TypeScript's type system can track which fields have been set, making invalid states unrepresentable.

```typescript
// Simple fluent builder
interface UserConfig {
    readonly name: string;
    readonly email: string;
    readonly age?: number;
    readonly role: "admin" | "user";
}

class UserBuilder {
    private config: Partial<UserConfig> = {};

    setName(name: string): this {
        this.config.name = name;
        return this;
    }

    setEmail(email: string): this {
        this.config.email = email;
        return this;
    }

    setAge(age: number): this {
        this.config.age = age;
        return this;
    }

    setRole(role: "admin" | "user"): this {
        this.config.role = role;
        return this;
    }

    build(): UserConfig {
        const { name, email, role } = this.config;
        if (!name || !email || !role) {
            throw new Error("name, email, and role are required");
        }
        return { ...this.config, name, email, role };
    }
}

const user = new UserBuilder()
    .setName("Alice")
    .setEmail("alice@example.com")
    .setRole("admin")
    .build();
```

## How It Works

The key to a fluent builder is returning `this` from every setter method. This enables method chaining — each call flows into the next. The `build()` method validates and returns the final immutable object.

For type-safe builders that enforce required fields at compile time, you can use generics to track which fields have been set:

```typescript
// Type-safe builder using generics to track set fields
type BuilderState = {
    hasName: boolean;
    hasEmail: boolean;
};

class SafeBuilder<State extends BuilderState = { hasName: false; hasEmail: false }> {
    private data: Record<string, unknown> = {};

    setName(name: string): SafeBuilder<State & { hasName: true }> {
        this.data.name = name;
        return this as any;
    }

    setEmail(email: string): SafeBuilder<State & { hasEmail: true }> {
        this.data.email = email;
        return this as any;
    }

    // build() is only available when both required fields are set
    build(this: SafeBuilder<{ hasName: true; hasEmail: true }>): { name: string; email: string } {
        return this.data as { name: string; email: string };
    }
}

const valid = new SafeBuilder().setName("Bob").setEmail("bob@test.com").build(); // OK
// new SafeBuilder().setName("Bob").build(); // Compile error — email not set
```

## Common Pitfalls

- **Forgetting to return `this`**: Every setter must return `this` for chaining to work. A missing return breaks the fluent API.
- **Mutable builders**: If the builder mutates internal state, reusing a builder instance between builds can cause subtle bugs. Consider resetting state in `build()` or making the builder single-use.
- **Over-engineering**: Not every object needs a builder. Use it when construction is complex (many optional fields, validation rules, or step-dependent logic).

## Key Takeaways

- The Builder pattern provides a fluent API for constructing complex objects step by step
- Returning `this` from setters enables method chaining
- TypeScript generics can track builder state at compile time, enforcing required fields
- Builders are ideal when objects have many optional parameters or complex validation rules
- The pattern separates construction logic from the object's representation

<div class="hint">
The Builder pattern is especially powerful in TypeScript when combined with conditional types.
You can make `build()` only callable when all required fields are set — turning runtime
validation errors into compile-time type errors. Libraries like Drizzle ORM and Prisma
use builder-like patterns extensively for type-safe query construction.
</div>
