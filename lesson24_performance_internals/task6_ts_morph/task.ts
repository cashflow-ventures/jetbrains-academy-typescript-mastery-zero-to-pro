// Programmatic AST Manipulation — Raw Compiler API vs ts-morph
//
// The raw TypeScript compiler API parses and navigates ASTs.
// ts-morph wraps it in a friendlier, mutable interface (shown in comments).
import * as ts from "typescript";

// --- Raw API: parse source code into an AST and walk it ---
const source = ts.createSourceFile("example.ts",
    `interface User { id: number; name: string; }
function greet(user: User): string { return "Hello, " + user.name; }`,
    ts.ScriptTarget.Latest, true);

ts.forEachChild(source, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
        console.log(`Interface: ${node.name.text}`);
        node.members.forEach((m) => {
            if (ts.isPropertySignature(m) && m.name)
                console.log(`  prop: ${(m.name as ts.Identifier).text}`);
        });
    }
    if (ts.isFunctionDeclaration(node) && node.name)
        console.log(`Function: ${node.name.text}`);
});

// --- Raw API: generating "const x: number = 42;" is verbose ---
const stmt = ts.factory.createVariableStatement(undefined,
    ts.factory.createVariableDeclarationList([
        ts.factory.createVariableDeclaration("x", undefined,
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
            ts.factory.createNumericLiteral("42"))
    ], ts.NodeFlags.Const));
const printer = ts.createPrinter();
const tmp = ts.createSourceFile("t.ts", "", ts.ScriptTarget.Latest);
console.log("Generated:", printer.printNode(ts.EmitHint.Unspecified, stmt, tmp));

// --- ts-morph makes this trivial (not installed — pseudocode) ---
// import { Project, VariableDeclarationKind } from "ts-morph";
// const file = new Project().createSourceFile("temp.ts", "");
// file.addVariableStatement({
//     declarationKind: VariableDeclarationKind.Const,
//     declarations: [{ name: "x", type: "number", initializer: "42" }],
// });
// One call vs 8 lines of factory functions — that's the ts-morph advantage.
