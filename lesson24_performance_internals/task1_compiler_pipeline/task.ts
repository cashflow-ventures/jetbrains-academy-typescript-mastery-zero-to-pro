// The TypeScript Compiler Pipeline — Five Phases in Action

// Phase 1 – Scanner: tokenizes this source into keywords, identifiers, literals, punctuation
// Phase 2 – Parser:  builds an AST (FunctionDeclaration → parameters, returnType, body)
// Phase 3 – Binder:  creates Symbols for "add", "a", "b" and links them to their scopes
// Phase 4 – Checker: verifies a + b is number, return type matches annotation
// Phase 5 – Emitter: strips type annotations → outputs plain JavaScript

function add(a: number, b: number): number {
    return a + b;
}

// The checker infers "result" as number — no annotation needed
const result = add(10, 32);
console.log("10 + 32 =", result); // 42

// This interface exists ONLY during compilation (phases 2-4).
// The emitter erases it completely — zero trace in the .js output.
interface Point {
    x: number;
    y: number;
}

// Binder links "Point" usage to the declaration above.
// Checker validates the object literal matches the Point shape.
const origin: Point = { x: 0, y: 0 };
console.log("Origin:", origin);

// After the emitter runs, the output is just:
//   function add(a, b) { return a + b; }
//   const result = add(10, 32);
//   console.log("10 + 32 =", result);
//   const origin = { x: 0, y: 0 };
//   console.log("Origin:", origin);
// All types, annotations, and the interface are gone — that's type erasure.
