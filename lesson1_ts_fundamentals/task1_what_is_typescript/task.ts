// What is TypeScript?
// TypeScript is a superset of JavaScript that adds static typing.
// This file demonstrates the core concepts: type annotations and type erasure.

// 1. Type annotations — explicitly declare what type a variable holds
const language: string = "TypeScript";
const year: number = 2012;
const isSuperset: boolean = true;
console.log(`Is TypeScript a superset of JS? ${isSuperset}`);

// 2. Typed function — parameters and return type are annotated
function describeLanguage(name: string, since: number): string {
    return `${name} has been around since ${since}.`;
}

// 3. The compiler checks types at compile time
const description: string = describeLanguage(language, year);
console.log(description); // "TypeScript has been around since 2012."

// 4. Type erasure — after compilation, the types disappear.
//    The JavaScript output of this file would look like:
//
//    const language = "TypeScript";
//    const year = 2012;
//    const isSuperset = true;
//    function describe(name, since) {
//        return `${name} has been around since ${since}.`;
//    }
//    const description = describe(language, year);
//    console.log(description);

// 5. Because it's a superset, plain JavaScript works too
const jsStyle = "No type annotation here — still valid TypeScript!";
console.log(jsStyle);
