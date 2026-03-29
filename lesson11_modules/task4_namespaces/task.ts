// Namespaces — grouping declarations under a named scope

// A namespace wraps related code together
namespace Validation {
    // Exported — accessible outside the namespace
    export interface Validator {
        isValid(value: string): boolean;
    }

    export class StringLengthValidator implements Validator {
        constructor(private min: number, private max: number) {}

        isValid(value: string): boolean {
            return value.length >= this.min && value.length <= this.max;
        }
    }

    export class PatternValidator implements Validator {
        constructor(private pattern: RegExp) {}

        isValid(value: string): boolean {
            return this.pattern.test(value);
        }
    }

    // Not exported — private to the namespace
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    export function createEmailValidator(): Validator {
        return new PatternValidator(EMAIL_REGEX);
    }
}

// --- Namespace merging: same name, declarations combine ---
namespace Validation {
    export class NumberRangeValidator {
        constructor(private min: number, private max: number) {}

        isInRange(value: number): boolean {
            return value >= this.min && value <= this.max;
        }
    }
}

// Using the merged namespace
const lengthCheck: Validation.Validator = new Validation.StringLengthValidator(1, 50);
const emailCheck: Validation.Validator = Validation.createEmailValidator();
const rangeCheck = new Validation.NumberRangeValidator(0, 100);

console.log("'Hello' length valid?", lengthCheck.isValid("Hello"));       // true
console.log("'a@b.com' email valid?", emailCheck.isValid("a@b.com"));     // true
console.log("42 in range 0-100?", rangeCheck.isInRange(42));              // true
