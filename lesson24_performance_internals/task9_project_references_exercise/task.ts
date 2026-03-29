// A dependency graph where each key is a package name and its value
// is the list of packages it depends on (its "references").
export type PackageGraph = Record<string, string[]>;

// TODO: Implement getBuildOrder
// Return a topological ordering of packages (dependencies before dependents).
// When multiple packages have zero remaining dependencies, sort alphabetically.
// Return null if the graph contains a circular dependency.
export function getBuildOrder(graph: PackageGraph): string[] | null {
    // Write your solution here
    return null;
}

// TODO: Implement getAffectedPackages
// Given changed packages, return all packages that need rebuilding:
// directly changed packages plus any package that transitively depends
// on a changed package. Return in valid build order.
// Return an empty array if the graph has a cycle.
export function getAffectedPackages(graph: PackageGraph, changed: string[]): string[] {
    // Write your solution here
    return [];
}

// TODO: Implement getDirectDependents
// Return packages that directly depend on the given package
// (packages whose references include pkg). Sort alphabetically.
export function getDirectDependents(graph: PackageGraph, pkg: string): string[] {
    // Write your solution here
    return [];
}

// TODO: Implement validateGraph
// Check for: unknown references, self-references, and circular dependencies.
// Return error strings in the specified format.
export function validateGraph(graph: PackageGraph): string[] {
    // Write your solution here
    return [];
}
