// Intrinsic String Manipulation Types — Demonstration

// Uppercase: converts all characters to uppercase
type Shout = Uppercase<"hello">;           // "HELLO"
type AllCaps = Uppercase<"camelCase">;     // "CAMELCASE"

// Lowercase: converts all characters to lowercase
type Whisper = Lowercase<"WORLD">;         // "world"
type Lower = Lowercase<"FooBar">;          // "foobar"

// Capitalize: converts first character to uppercase
type Cap = Capitalize<"hello">;            // "Hello"
type Cap2 = Capitalize<"fooBar">;          // "FooBar"

// Uncapitalize: converts first character to lowercase
type Uncap = Uncapitalize<"Hello">;        // "hello"
type Uncap2 = Uncapitalize<"FooBar">;      // "fooBar"

// Combining with template literal types
type Event = "click" | "scroll" | "focus";
type EventHandler = `on${Capitalize<Event>}`;
// "onClick" | "onScroll" | "onFocus"

type EventConstant = `${Uppercase<Event>}_EVENT`;
// "CLICK_EVENT" | "SCROLL_EVENT" | "FOCUS_EVENT"

// Building getter/setter names
type PropName = "name" | "age" | "email";
type Getter = `get${Capitalize<PropName>}`;
// "getName" | "getAge" | "getEmail"

// Distribution over unions
type Status = "active" | "inactive" | "pending";
type UpperStatus = Uppercase<Status>;
// "ACTIVE" | "INACTIVE" | "PENDING"

// Runtime equivalents
const event: Event = "click";
const handlerName: string = `on${event.charAt(0).toUpperCase()}${event.slice(1)}`;
console.log(handlerName); // "onClick"

const status: Status = "active";
console.log(status.toUpperCase()); // "ACTIVE"
