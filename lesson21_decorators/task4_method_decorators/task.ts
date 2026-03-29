// Method Decorators — Legacy (experimentalDecorators: true)

// 1. Logging decorator — wraps a method to log calls and results
function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]): any {
        console.log(`→ ${propertyKey}(${JSON.stringify(args)})`);
        const result = original.apply(this, args);
        console.log(`← ${propertyKey} returned ${JSON.stringify(result)}`);
        return result;
    };
}

// 2. Decorator factory — parameterized decorator
function deprecated(reason: string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]): any {
            console.warn(`DEPRECATED: ${propertyKey} — ${reason}`);
            return original.apply(this, args);
        };
    };
}

// 3. Readonly decorator — prevents method reassignment
function readonly(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    descriptor.writable = false;
}

class UserService {
    @log
    findUser(id: number): string {
        return `User_${id}`;
    }

    @deprecated("Use findUser instead")
    getUser(id: number): string {
        return this.findUser(id);
    }

    @readonly
    getVersion(): string {
        return "2.1.0";
    }
}

const svc = new UserService();
svc.findUser(42);    // Logs call and result
svc.getUser(1);      // Warns about deprecation
console.log(svc.getVersion()); // "2.1.0"
