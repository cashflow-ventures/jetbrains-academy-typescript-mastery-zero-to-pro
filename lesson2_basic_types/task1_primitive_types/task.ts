export {};
// Primitive Types in TypeScript
// TypeScript has seven primitive types that mirror JavaScript's runtime primitives.

// 1. string — textual data
const language: string = "TypeScript";
const greeting: string = `Hello, ${language}!`;

// 2. number — integers, floats, Infinity, NaN
const version: number = 5.3;
const hexColor: number = 0xff6600;
const notANumber: number = NaN; // NaN is still a number!

// 3. boolean — true or false
const isStrict: boolean = true;
const isLegacy: boolean = false;

// 4. null — intentional absence of a value
const empty: null = null;

// 5. undefined — declared but not assigned
const notAssigned: undefined = undefined;

// 6. bigint — arbitrarily large integers (append n to a literal)
const big: bigint = 9007199254740991n;
const bigger: bigint = big + 1n;

// 7. symbol — unique, immutable identifiers
const id: symbol = Symbol("userId");
const anotherId: symbol = Symbol("userId");
console.log(id === anotherId); // false — every symbol is unique

// Quick demo: printing each type
console.log(`string:    ${greeting}`);
console.log(`number:    ${version}`);
console.log(`boolean:   ${isStrict}`);
console.log(`null:      ${empty}`);
console.log(`undefined: ${notAssigned}`);
console.log(`bigint:    ${bigger}`);
console.log(`symbol:    ${id.toString()}`);
