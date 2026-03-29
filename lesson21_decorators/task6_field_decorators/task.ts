// Field Decorators — Legacy (experimentalDecorators: true)

// 1. Metadata registration — track which fields are required
const requiredFields: Map<Function, string[]> = new Map();

function required(target: any, propertyKey: string): void {
    const ctor = target.constructor;
    const fields = requiredFields.get(ctor) || [];
    fields.push(propertyKey);
    requiredFields.set(ctor, fields);
}

// 2. Getter/setter replacement using a WeakMap for per-instance storage
function clamp(min: number, max: number) {
    return function (target: any, propertyKey: string): void {
        const storage = new WeakMap<object, number>();

        Object.defineProperty(target, propertyKey, {
            get(this: object): number {
                return storage.get(this) ?? min;
            },
            set(this: object, value: number): void {
                storage.set(this, Math.max(min, Math.min(max, value)));
            },
            enumerable: true,
            configurable: true,
        });
    };
}

// Applying field decorators
class PlayerStats {
    @required
    name: string = "";

    @required
    @clamp(0, 100)
    health: number = 100;

    @clamp(0, 999)
    score: number = 0;
}

const stats = new PlayerStats();
stats.name = "Hero";
stats.health = 150;   // Clamped to 100
stats.score = -10;     // Clamped to 0

console.log(stats.health);  // 100
console.log(stats.score);   // 0
console.log(requiredFields.get(PlayerStats)); // ["name", "health"]
