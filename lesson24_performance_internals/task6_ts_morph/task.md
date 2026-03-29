# Programmatic AST Manipulation with ts-morph

In the [compiler pipeline task](course://lesson24_performance_internals/task1_compiler_pipeline/task.ts)
you learned that TypeScript parses source code into an Abstract Syntax Tree (AST). You can
inspect that AST manually, but what if you want to *programmatically* read, modify, and
generate TypeScript code? The raw TypeScript compiler API (`typescript` module) exposes
everything you need — but its API is low-level, verbose, and full of sharp edges. **ts-morph**
is a community library that wraps the compiler API in a developer-friendly interface, making
programmatic AST manipulation practical for real-world tooling.

## Core Concept

**ts-morph** (formerly ts-simple-ast) is a TypeScript library that provides a high-level,
object-oriented wrapper around the TypeScript compiler API. It lets you:

- **Read** source files: navigate the AST, find classes/functions/interfaces, inspect types.
- **Modify** existing code: rename symbols, add/remove properties, change types, insert
  statements.
- **Generate** new code: create entire source files, classes, and functions from scratch.
- **Transform** codebases: write scripts that refactor thousands of files automatically.

The key insight is that ts-morph maintains a **live, mutable AST**. When you call
`classDeclaration.addProperty(...)`, ts-morph updates the in-memory AST and can write the
modified source back to disk — preserving formatting, comments, and whitespace as much as
possible.

### Why Not Use the Raw Compiler API?

The TypeScript compiler API (`import * as ts from "typescript"`) is powerful but painful for
code modification:

- **Immutable AST.** The compiler's AST nodes are read-only. To "modify" code, you must
  create entirely new AST nodes and build a new tree — a process called creating a
  **custom transformer**.
- **No file management.** The compiler API doesn't handle reading/writing files or managing
  a project. You wire that up yourself.
- **Verbose node creation.** Creating a simple variable declaration requires nested factory
  calls: `ts.factory.createVariableStatement(...)` with modifiers, declaration lists, and
  initializers — easily 10+ lines for one statement.
- **No type information by default.** To get resolved types (not just syntax), you need to
  create a Program, get a TypeChecker, and manually resolve symbols.

ts-morph solves all of these problems. It loads your `tsconfig.json`, creates a Project with
full type information, and gives you mutable wrapper objects for every AST node.

## How It Works

### Project Setup and Navigation

ts-morph's entry point is the `Project` class. You point it at a `tsconfig.json` and it
loads all source files with full type resolution:

```typescript
// import { Project } from "ts-morph";

// Load a project from tsconfig
// const project = new Project({ tsConfigFilePath: "./tsconfig.json" });

// Get a specific source file
// const sourceFile = project.getSourceFileOrThrow("src/models/user.ts");

// Navigate the AST — find all classes in the file
// const classes = sourceFile.getClasses();
// classes.forEach(cls => {
//     console.log(cls.getName());           // "User"
//     console.log(cls.getProperties());     // PropertyDeclaration[]
//     console.log(cls.getMethods());        // MethodDeclaration[]
// });

// Find all interfaces across the entire project
// const interfaces = project.getSourceFiles()
//     .flatMap(sf => sf.getInterfaces());
```

Every AST node is wrapped in a ts-morph class with intuitive getters and setters. A
`ClassDeclaration` has `.getName()`, `.getProperties()`, `.getMethods()`,
`.getImplements()`, and dozens more. You navigate the tree the way you think about code —
not the way the compiler represents it internally.

### Modifying Existing Code

ts-morph's mutable AST is its killer feature. You modify code by calling methods on AST
nodes:

```typescript
// Add a property to an existing class
// const userClass = sourceFile.getClassOrThrow("User");
// userClass.addProperty({
//     name: "createdAt",
//     type: "Date",
//     hasQuestionToken: false,
//     initializer: "new Date()",
// });

// Rename a method across the entire project (updates all references)
// const method = userClass.getMethodOrThrow("getFullName");
// method.rename("displayName");

// Remove a property
// userClass.getPropertyOrThrow("legacyField").remove();

// Change a function's return type
// const fn = sourceFile.getFunctionOrThrow("processData");
// fn.setReturnType("Promise<Result<Data, AppError>>");

// Save all changes back to disk
// project.saveSync();
```

When you call `project.saveSync()`, ts-morph writes the modified AST back to the original
files. It uses a printer that preserves your existing formatting style — indentation,
trailing commas, quote style — so the output looks like hand-written code, not
machine-generated output.

### Generating New Code

You can also create entire source files from scratch:

```typescript
// const newFile = project.createSourceFile("src/generated/api-types.ts", "");
//
// newFile.addInterface({
//     name: "ApiResponse",
//     isExported: true,
//     typeParameters: [{ name: "T" }],
//     properties: [
//         { name: "data", type: "T" },
//         { name: "status", type: "number" },
//         { name: "message", type: "string" },
//     ],
// });
//
// newFile.addTypeAlias({
//     name: "UserResponse",
//     isExported: true,
//     type: "ApiResponse<User>",
// });
//
// newFile.saveSync();
// Writes a properly formatted .ts file with the interface and type alias
```

### Custom Transformers (Raw Compiler API)

For scenarios where you need to plug into the TypeScript compilation pipeline itself — not
just modify source files — you write **custom transformers**. These use the raw compiler API
and operate on the immutable AST during the emit phase:

```typescript
// A custom transformer is a function that receives a TransformationContext
// and returns a visitor function that walks and replaces AST nodes.
//
// import * as ts from "typescript";
//
// const removeConsoleLogTransformer: ts.TransformerFactory<ts.SourceFile> =
//     (context) => (sourceFile) => {
//         function visitor(node: ts.Node): ts.Node | undefined {
//             // Remove all console.log() calls
//             if (ts.isExpressionStatement(node) &&
//                 ts.isCallExpression(node.expression) &&
//                 ts.isPropertyAccessExpression(node.expression.expression) &&
//                 node.expression.expression.name.text === "log") {
//                 return undefined; // Delete the node
//             }
//             return ts.visitEachChild(node, visitor, context);
//         }
//         return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
//     };
//
// // Use with: ts.emit(program, /*...*/,  { before: [removeConsoleLogTransformer] });
```

Custom transformers are used by build tools (webpack's `ts-loader`, `ttypescript`) to
modify code during compilation. Common use cases include stripping debug statements,
injecting metadata, and rewriting import paths.

### Real-World Use Cases

Programmatic AST manipulation powers many tools you may already use:

| Use Case | Tool / Approach |
|----------|----------------|
| Auto-generate API client types from OpenAPI specs | ts-morph code generation |
| Enforce coding conventions (e.g., all exports must have JSDoc) | ts-morph analysis scripts |
| Migrate codebase from one pattern to another | ts-morph find-and-replace across files |
| Strip `console.log` in production builds | Custom transformer |
| Auto-add `readonly` to all interface properties | ts-morph modification script |
| Generate barrel (`index.ts`) files automatically | ts-morph file creation |
| Inject runtime type validators from TypeScript types | Custom transformer |

## Common Pitfalls

- **Using ts-morph for build-time transforms.** ts-morph is designed for offline scripts
  and tooling — not for plugging into the compilation pipeline. If you need transforms
  during `tsc` compilation, use custom transformers with the raw compiler API. ts-morph is
  for "run this script once to refactor my codebase" scenarios.

- **Forgetting to call `.saveSync()` or `.save()`.** ts-morph operates on an in-memory AST.
  Changes aren't written to disk until you explicitly save. This is by design — it lets you
  preview changes before committing them — but it's easy to forget.

- **Modifying nodes while iterating.** If you iterate over a list of classes and remove some
  during iteration, the indices shift. Collect the nodes to modify first, then apply changes
  in a separate pass — or iterate in reverse order.

- **Assuming ts-morph is a runtime dependency.** ts-morph is a *development tool* — you run
  it in scripts, CI pipelines, or code generators. It should never be bundled into your
  application. Install it as a dev dependency: `npm install --save-dev ts-morph`.

- **Ignoring the TypeChecker integration.** ts-morph gives you access to resolved types, not
  just syntax. Use `.getType()` on any node to get the checker's resolved type — this is
  far more powerful than pattern-matching on syntax alone.

## Key Takeaways

- ts-morph wraps the TypeScript compiler API in a high-level, mutable AST interface that
  makes programmatic code reading, modification, and generation practical.
- The raw compiler API uses an immutable AST — modifications require building new trees via
  custom transformers, which is verbose but necessary for build-time transforms.
- ts-morph is ideal for offline tooling: codebase analysis, automated refactoring, code
  generation, and enforcing conventions.
- Custom transformers plug into the compilation pipeline itself and are used by build tools
  to modify code during emit.
- Both approaches operate on the same AST you learned about in the compiler pipeline task —
  the difference is the level of abstraction and when the manipulation happens.

<div class="hint">
ts-morph's `getType()` method returns the same resolved type that the TypeScript checker
computes. This means you can write scripts that understand your code at the *type level*,
not just the syntax level. For example, you could find all functions that return `Promise`
types and ensure they have proper error handling — something a regex-based tool could never
do reliably.
</div>

<div class="hint">
The TypeScript AST Viewer at https://ts-ast-viewer.com is invaluable when working with
either ts-morph or the raw compiler API. Paste any TypeScript code and it shows the exact
AST structure, node types, and properties — so you know exactly which ts-morph methods to
call or which `ts.is*()` guards to use in a custom transformer.
</div>
