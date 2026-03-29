// TODO: Declare a non-exported unique symbol called CurrencyBrand
declare const CurrencyBrand: unique symbol;

// TODO: Define opaque types USD and EUR
// USD = number & { readonly [CurrencyBrand]: "USD" }
// EUR = number & { readonly [CurrencyBrand]: "EUR" }
export type USD = any;
export type EUR = any;

// TODO: Implement usd constructor
// Throws "Amount must be finite" if !Number.isFinite(amount)
export function usd(amount: number): USD {
    // Write your solution here
    return 0 as any;
}

// TODO: Implement eur constructor
// Throws "Amount must be finite" if !Number.isFinite(amount)
export function eur(amount: number): EUR {
    // Write your solution here
    return 0 as any;
}

// TODO: Implement addUSD — adds two USD values, returns USD
export function addUSD(a: USD, b: USD): USD {
    // Write your solution here
    return 0 as any;
}

// TODO: Implement addEUR — adds two EUR values, returns EUR
export function addEUR(a: EUR, b: EUR): EUR {
    // Write your solution here
    return 0 as any;
}

// TODO: Implement toNumber — unwraps branded value to plain number
export function toNumber(amount: USD | EUR): number {
    // Write your solution here
    return 0;
}
