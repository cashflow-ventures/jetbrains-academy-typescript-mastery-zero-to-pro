# Compiler API Exercise

In the [previous task](course://lesson24_performance_internals/task6_ts_morph/task.ts) you
saw how the raw TypeScript compiler API can parse source code into an AST and walk it
programmatically. Now it's your turn. In this exercise you'll write functions that use the
`typescript` module to analyze TypeScript source code strings — extracting function names,
counting interfaces, and pulling property signatures out of the AST.

This is the same API that powers every TypeScript IDE feature, linter, and code-generation
tool. Mastering it means you can build custom analysis scripts, enforce coding conventions
across a codebase, or generate documentation — all by walking the AST.

## Instructions

1. In `task.ts`, implement `extractFunctionNames(source: string): string[]`.
   Parse the source string into an AST using `ts.createSourceFile`. Walk the
   **top-level** children and collect the names of every `FunctionDeclaration`.
   Return the names in the order they appear. Skip anonymous functions (no name).

2. Implement `countInterfaces(source: string): number`.
   Parse the source and return the total number of `InterfaceDeclaration` nodes
   at the top level of the file.

3. Implement `getInterfaceProperties(source: string, interfaceName: string): string[]`.
   Parse the source, find the `InterfaceDeclaration` whose name matches
   `interfaceName`, and return an array of its property names (from
   `PropertySignature` members) in declaration order. If the interface is not
   found, return an empty array. Ignore method signatures and other non-property
   members.

4. Implement `getExportedIdentifiers(source: string): string[]`.
   Parse the source and return the names of all top-level declarations that have
   the `export` keyword. This includes exported functions, interfaces, type
   aliases, variable statements, classes, and enums. For variable statements,
   include every variable name in the declaration list. Return names in source
   order.

5. All functions must be exported. Use `import * as ts from "typescript"` for the
   compiler API.

## Example

```typescript
const code = `
  export interface User { id: number; name: string; }
  interface Internal { secret: boolean; }
  export function greet(u: User): string { return u.name; }
  function helper() {}
  export const VERSION = "1.0";
`;

extractFunctionNames(code);
// → ["greet", "helper"]

countInterfaces(code);
// → 2

getInterfaceProperties(code, "User");
// → ["id", "name"]

getExportedIdentifiers(code);
// → ["User", "greet", "VERSION"]
```

<div class="hint">
Use `ts.createSourceFile(fileName, sourceText, target, setParentNodes)` to parse.
Then `ts.forEachChild(sourceFile, visitor)` or `sourceFile.statements` to iterate
top-level nodes. Guard with `ts.isFunctionDeclaration(node)`,
`ts.isInterfaceDeclaration(node)`, etc. Check for the `export` modifier using
`node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)`.
</div>
