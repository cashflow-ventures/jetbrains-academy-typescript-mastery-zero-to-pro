# What is TypeScript?

TypeScript is a programming language developed by Microsoft that builds on top of JavaScript.
It adds optional static typing to the language, letting you catch errors before your code ever runs.
If you already know JavaScript, you already know most of TypeScript — it's a strict superset, meaning
every valid JavaScript program is also a valid TypeScript program.

## Core Concept

TypeScript is a **superset of JavaScript**. Think of it as JavaScript with an extra layer: type annotations.
You can add types to variables, function parameters, and return values to describe the shape of your data.

```typescript
// Plain JavaScript — works in TypeScript too
const greeting = "Hello, world!";

// TypeScript — same thing, but with an explicit type annotation
const typedGreeting: string = "Hello, world!";
```

The key idea is that TypeScript **extends** JavaScript. It doesn't replace it or invent a new runtime.
Under the hood, browsers and Node.js still run plain JavaScript. TypeScript's job is to help you
write safer code *before* it reaches the runtime.

### Static Typing

In JavaScript, types are checked at **runtime** — you find out about a bug when the code executes
and something breaks. TypeScript shifts that checking to **compile time**. The TypeScript compiler
(`tsc`) analyzes your code and reports type errors before you ship anything.

```typescript
function double(value: number): number {
    return value * 2;
}

double(5);       // OK — 5 is a number
// double("hi"); // Error at compile time: Argument of type 'string' is not assignable to parameter of type 'number'
```

This means entire categories of bugs — passing the wrong type, misspelling a property name,
forgetting a required field — get caught while you're still writing code, not after your users
hit the bug in production.

## How It Works

TypeScript follows a straightforward pipeline:

1. **You write `.ts` files** with type annotations.
2. **The TypeScript compiler (`tsc`) checks your types** and reports any errors.
3. **`tsc` emits plain `.js` files** with all type annotations removed.
4. **The JavaScript runtime** (browser or Node.js) executes the output.

This third step is called **type erasure**. Types exist only at compile time — they are completely
stripped out of the final JavaScript output. There is zero runtime overhead from TypeScript's type system.

```typescript
// Before compilation (TypeScript)
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// After compilation (JavaScript) — types are gone
function greet(name) {
    return `Hello, ${name}!`;
}
```

Because of type erasure, you cannot use TypeScript types to make runtime decisions. For example,
you can't write `if (typeof x === "string")` using a TypeScript *type alias* — you need JavaScript's
built-in `typeof` operator, which checks the runtime value.

### The Compiler: `tsc`

The TypeScript compiler is a command-line tool called `tsc`. You install it via npm:

```
npm install -g typescript
```

Then you can compile a file:

```
tsc myFile.ts
```

This produces `myFile.js` — the same code with types removed. If there are type errors, `tsc`
prints them to the console. You can configure the compiler's behavior through a `tsconfig.json`
file (covered in a later task).

## Common Pitfalls

- **Thinking TypeScript runs in the browser.** It doesn't. Browsers run JavaScript. TypeScript
  must be compiled to JavaScript first.
- **Assuming types exist at runtime.** Because of type erasure, you can't inspect TypeScript types
  at runtime. Use JavaScript's `typeof`, `instanceof`, or custom checks for runtime validation.
- **Believing TypeScript is a different language from JavaScript.** It's not — it's a superset.
  Any JavaScript code is valid TypeScript. You can adopt TypeScript incrementally by renaming
  `.js` files to `.ts` and adding types gradually.

## Key Takeaways

- TypeScript is a superset of JavaScript — all JS is valid TS.
- It adds static type checking at compile time, catching bugs before runtime.
- The compiler (`tsc`) removes all type annotations during compilation (type erasure).
- There is no runtime cost — the output is plain JavaScript.
- You can adopt TypeScript gradually in any JavaScript project.

<div class="hint">
TypeScript was first released by Microsoft in 2012. Its creator, Anders Hejlsberg, also designed
C# and Turbo Pascal. The language has grown to become one of the most popular programming languages
in the world, consistently ranking in the top 5 on developer surveys.
</div>
