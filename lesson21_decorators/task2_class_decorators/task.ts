// Class Decorators — Legacy (experimentalDecorators: true)

// 1. Sealing a class to prevent prototype modification
function sealed(constructor: Function): void {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// 2. Replacing the constructor to inject an id property
function withId<T extends new (...args: any[]) => any>(
    constructor: T
): T {
    return class extends constructor {
        id: string = Math.random().toString(36).slice(2, 10);
    };
}

// 3. Registry pattern — collecting decorated classes
const registry: Map<string, Function> = new Map();

function register(constructor: Function): void {
    registry.set(constructor.name, constructor);
}

// Applying multiple decorators (bottom-to-top execution)
@register   // 2nd: registers the (possibly wrapped) class
@withId     // 1st: wraps the constructor to add id
@sealed     // 0th: seals the original prototype
class Player {
    constructor(public name: string) {}
}

const player = new Player("Alice") as Player & { id: string };
console.log(player.name);                  // "Alice"
console.log(player.id);                    // random 8-char string
console.log(registry.has("Player"));       // true
