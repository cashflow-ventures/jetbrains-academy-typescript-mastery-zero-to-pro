// Declaration Merging In Depth — all merging patterns demonstrated

// --- 1. Interface Merging ---
// Two interfaces with the same name merge their members.

interface Article {
    title: string;
    createdAt: string;
}

interface Article {
    author: string;
    tags: string[];
}

// Merged: Article has title, createdAt, author, and tags
const article: Article = {
    title: "Declaration Merging Guide",
    createdAt: "2024-01-15",
    author: "TypeScript Team",
    tags: ["typescript", "advanced"],
};

// --- 2. Namespace Merging ---
namespace StringUtils {
    export function capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

namespace StringUtils {
    export function reverse(str: string): string {
        return str.split("").reverse().join("");
    }
}

// Both functions available on the merged namespace
console.log(StringUtils.capitalize("hello")); // "Hello"
console.log(StringUtils.reverse("hello"));    // "olleh"

// --- 3. Class + Namespace Merging ---
class Validator {
    constructor(public rules: Validator.Rule[]) {}

    validate(value: string): boolean {
        return this.rules.every((rule) => rule.check(value));
    }
}

namespace Validator {
    export interface Rule {
        name: string;
        check(value: string): boolean;
    }

    export function required(): Rule {
        return { name: "required", check: (v) => v.length > 0 };
    }

    export function minLength(min: number): Rule {
        return { name: "minLength", check: (v) => v.length >= min };
    }
}

const validator = new Validator([
    Validator.required(),
    Validator.minLength(3),
]);
console.log("'hi' valid:", validator.validate("hi"));     // false
console.log("'hello' valid:", validator.validate("hello")); // true

console.log("Article:", article);
