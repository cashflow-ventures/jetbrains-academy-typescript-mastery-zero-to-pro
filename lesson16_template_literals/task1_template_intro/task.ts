// Template Literal Types — Demonstration

// Basic template literal type: combining string literals
type Color = "red" | "green" | "blue";
type Shade = "light" | "dark";
type ColorVariant = `${Shade}-${Color}`;
// "light-red" | "light-green" | "light-blue" |
// "dark-red"  | "dark-green"  | "dark-blue"

// Union expansion with event names
type DOMEvent = "click" | "scroll" | "mouseover";
type EventHandler = `on${Capitalize<DOMEvent>}`;
// "onClick" | "onScroll" | "onMouseover"

// Pattern types with broad interpolation
type CSSUnit = "px" | "em" | "rem" | "%";
type CSSValue = `${number}${CSSUnit}`;

function setWidth(value: CSSValue): void {
    console.log(`Width: ${value}`);
}

setWidth("100px");
setWidth("1.5em");

// Combining multiple unions (Cartesian product)
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiVersion = "v1" | "v2";
type MethodLabel = `[${ApiVersion}] ${HttpMethod}`;
// "[v1] GET" | "[v1] POST" | ... | "[v2] DELETE"

// Runtime demonstration
const handlers: Record<EventHandler, () => void> = {
    onClick: () => console.log("Clicked!"),
    onScroll: () => console.log("Scrolled!"),
    onMouseover: () => console.log("Hovered!"),
};

for (const [name, handler] of Object.entries(handlers)) {
    console.log(`${name}: registered`);
    handler();
}
