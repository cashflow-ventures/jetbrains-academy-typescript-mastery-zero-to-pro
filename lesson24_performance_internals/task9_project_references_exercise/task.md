# Project References Exercise

In the [previous task](course://lesson24_performance_internals/task8_project_references/task.ts)
you learned how TypeScript project references split a codebase into independently compilable
units with a dependency graph, enabling fast incremental builds via `tsc -b`. Now you'll
model that system in code.

In this exercise you'll implement functions that work with a multi-package dependency graph —
the same kind of graph that `tsc -b` builds internally when it reads `references` arrays
from `tsconfig.json` files. You'll compute build order (topological sort), detect circular
references, and determine which packages need rebuilding when source files change.

## Instructions

1. In `task.ts`, you are given a `PackageGraph` type representing a dependency graph where
   each key is a package name and its value is an array of package names it depends on
   (its `references`). Implement `getBuildOrder(graph: PackageGraph): string[] | null`.
   Return a topological ordering of the packages — dependencies before dependents — so
   that `tsc -b` could build them left to right. If the graph contains a cycle, return
   `null` (TypeScript forbids circular project references). When multiple packages have
   no remaining dependencies, sort them alphabetically for deterministic output.

2. Implement `getAffectedPackages(graph: PackageGraph, changed: string[]): string[]`.
   Given a set of changed package names, return all packages that need rebuilding. A
   package needs rebuilding if it was directly changed **or** if any of its transitive
   dependencies were changed (since its `.tsBuildInfo` would be stale). Return the result
   sorted in valid build order (same topological rules as `getBuildOrder`). If the graph
   has a cycle, return an empty array.

3. Implement `getDirectDependents(graph: PackageGraph, pkg: string): string[]`.
   Return the packages that directly depend on `pkg` (i.e., packages whose `references`
   array includes `pkg`). Return them sorted alphabetically.

4. Implement `validateGraph(graph: PackageGraph): string[]`.
   Return an array of validation error strings. Check for:
   - References to packages not defined in the graph: `"Unknown reference '<name>' in '<pkg>'"`
   - Self-references: `"Self-reference in '<pkg>'"`
   - Circular dependencies: `"Circular dependency detected: <pkg1> -> <pkg2> -> ... -> <pkg1>"`
   Report errors in the order listed above. Within each category, sort alphabetically by
   the first package name mentioned. For circular dependencies, start the cycle from the
   alphabetically smallest package in the cycle.

5. All functions must be exported.

## Example

```typescript
const graph: PackageGraph = {
    shared: [],
    server: ["shared"],
    client: ["shared"],
    app: ["server", "client"],
};

getBuildOrder(graph);
// → ["shared", "client", "server", "app"]

getAffectedPackages(graph, ["shared"]);
// → ["shared", "client", "server", "app"]

getDirectDependents(graph, "shared");
// → ["client", "server"]

validateGraph(graph);
// → []  (no errors)
```

<div class="hint">
For topological sort, use Kahn's algorithm: start with packages that have zero in-degree
(no dependencies), add them to the result, then remove their edges and repeat. If you
process all packages, the graph is acyclic. If packages remain, there's a cycle. When
choosing among packages with equal in-degree, pick alphabetically for determinism.
</div>
