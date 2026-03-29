// Enums vs Union Literal Types — comparing both approaches

// ── Approach 1: Enum ──
enum ColorEnum {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

function paintWithEnum(color: ColorEnum): string {
    return `Painting with enum: ${color}`;
}

// Must use the enum member — raw strings are rejected by the type system
console.log(paintWithEnum(ColorEnum.Red)); // "Painting with enum: RED"

// ── Approach 2: Union Literal Type ──
type ColorUnion = "RED" | "GREEN" | "BLUE";

function paintWithUnion(color: ColorUnion): string {
    return `Painting with union: ${color}`;
}

// Can pass string literals directly — no import needed
console.log(paintWithUnion("RED")); // "Painting with union: RED"

// ── Iteration: enum wins ──
// You can iterate over enum members at runtime:
const allEnumColors = Object.values(ColorEnum);
console.log("Enum values:", allEnumColors); // ["RED", "GREEN", "BLUE"]

// Union types exist only at compile time — no runtime iteration:
// There is no way to get ["RED", "GREEN", "BLUE"] from ColorUnion at runtime
// without duplicating the values in an array.

// ── Bundle size: union wins ──
// ColorEnum compiles to a JavaScript object (~100 bytes)
// ColorUnion compiles to nothing — it's erased completely
