# TypeScript Mastery — From Zero to Pro

A comprehensive, interactive TypeScript course built for the [JetBrains Academy](https://plugins.jetbrains.com/plugin/10081-jetbrains-academy) plugin in WebStorm / IntelliJ IDEA. 25 lessons, 168 tasks, covering TypeScript from absolute beginner to advanced type-level programming.

## Getting Started

1. Install [WebStorm](https://www.jetbrains.com/webstorm/) (or IntelliJ IDEA with the JavaScript plugin)
2. Install the [JetBrains Academy plugin](https://plugins.jetbrains.com/plugin/10081-jetbrains-academy)
3. Open this project as a course: **File → Learn and Teach → Open Course from Disk**
4. Select the root folder of this repository
5. Start learning — theory tasks explain concepts, edu tasks let you code, quizzes test your knowledge

## Course Structure

| # | Lesson | Focus |
|---|--------|-------|
| 1 | TypeScript Fundamentals | What TS is, type erasure, tsconfig |
| 2 | Basic Types | Primitives, arrays, tuples, any/unknown/never |
| 3 | Functions | Parameters, overloads, rest params, callbacks |
| 4 | Objects and Interfaces | Interfaces, type aliases, index signatures, intersections |
| 5 | Union Types and Literal Types | Discriminated unions, as const, satisfies |
| 6 | Classes | Access modifiers, inheritance, abstract classes |
| 7 | Generics — The Basics | Generic functions, interfaces, classes, constraints |
| 8 | Utility Types | Partial, Pick, Omit, Record, ReturnType, Awaited |
| 9 | Type Guards and Narrowing | typeof, instanceof, custom guards, assertion functions |
| 10 | Enums | Numeric, string, const enums, enums vs unions |
| 11 | Modules and Namespaces | ES modules, type-only imports, barrel exports |
| 12 | Declaration Files | .d.ts, DefinitelyTyped, declaration merging |
| 13 | Advanced Generics | keyof, indexed access, variance annotations |
| 14 | Mapped Types | Key remapping, modifiers, building utility types |
| 15 | Conditional Types | Distribution, infer keyword, recursive types |
| 16 | Template Literal Types | String manipulation, pattern matching |
| 17 | Branded and Opaque Types | Nominal typing patterns |
| 18 | Error Handling | Custom errors, Result pattern |
| 19 | Async TypeScript | Promises, async/await, concurrent patterns |
| 20 | Explicit Resource Management | using keyword, Disposable, DisposableStack |
| 21 | Decorators | TC39 stage 3 decorators, class/method/field |
| 22 | Design Patterns | Builder, Strategy, Observer, Repository, DI |
| 23 | Type-Level Programming | Prettify, UnionToIntersection, type arithmetic |
| 24 | Performance and Compiler Internals | Compiler pipeline, traces, ts-morph, monorepos |
| 25 | Capstone Project | Full-stack TypeScript project tying everything together |

## Task Types

- **Theory** — Read explanations and annotated code examples
- **Edu** — Write code to pass hidden Jest tests (click "Check" to validate)
- **Quiz** — Multiple-choice questions with feedback

## Tech Stack

- TypeScript ^5.3.3
- Jest ^29.3.1 + ts-jest ^29.1.1
- Strict mode enabled

## Project Layout

```
course-info.yaml          ← Course metadata
tsconfig.json             ← Shared compiler config
package.json              ← Dependencies (typescript, jest, ts-jest)
jest.config.js            ← Jest configuration
lesson1_ts_fundamentals/  ← Each lesson is a folder
  lesson-info.yaml        ← Lesson metadata and task order
  task1_.../              ← Each task is a subfolder
    task-info.yaml        ← Task type and file visibility
    task.md               ← Instructions / theory content
    task.ts               ← Code file (starter or example)
    test/test.ts          ← Hidden Jest tests (edu tasks only)
```

## Running Tests Manually

```bash
npm install
npx jest --testPathPattern="lesson1_ts_fundamentals/task3"
```

## License

This course is provided as-is for educational purposes.
