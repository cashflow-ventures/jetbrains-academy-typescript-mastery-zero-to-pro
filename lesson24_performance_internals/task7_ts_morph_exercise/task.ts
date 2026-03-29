import * as ts from "typescript";

// TODO: Implement extractFunctionNames
// Parse the source string into an AST and return the names of all
// top-level FunctionDeclaration nodes in source order.
// Skip anonymous function declarations (those without a name).
export function extractFunctionNames(source: string): string[] {
    // Write your solution here
    return [];
}

// TODO: Implement countInterfaces
// Parse the source string and return the number of top-level
// InterfaceDeclaration nodes.
export function countInterfaces(source: string): number {
    // Write your solution here
    return 0;
}

// TODO: Implement getInterfaceProperties
// Parse the source, find the InterfaceDeclaration matching interfaceName,
// and return its PropertySignature member names in declaration order.
// Return an empty array if the interface is not found.
export function getInterfaceProperties(source: string, interfaceName: string): string[] {
    // Write your solution here
    return [];
}

// TODO: Implement getExportedIdentifiers
// Parse the source and return the names of all top-level declarations
// that carry the `export` keyword. Includes functions, interfaces,
// type aliases, variable statements (each variable name), classes, and enums.
// Return names in source order.
export function getExportedIdentifiers(source: string): string[] {
    // Write your solution here
    return [];
}
