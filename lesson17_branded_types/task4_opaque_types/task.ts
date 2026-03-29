// Opaque Types — Demonstration

// The unique symbol is NOT exported — this is the key to opacity
declare const CurrencyBrand: unique symbol;

// Opaque currency types
type USD = number & { readonly [CurrencyBrand]: "USD" };
type EUR = number & { readonly [CurrencyBrand]: "EUR" };

// Constructor functions — the only way to create currency values
function usd(amount: number): USD {
    if (!Number.isFinite(amount)) {
        throw new Error("Amount must be finite");
    }
    return amount as USD;
}

function eur(amount: number): EUR {
    if (!Number.isFinite(amount)) {
        throw new Error("Amount must be finite");
    }
    return amount as EUR;
}

// Operations that preserve the brand
function addUSD(a: USD, b: USD): USD {
    return ((a as number) + (b as number)) as USD;
}

function addEUR(a: EUR, b: EUR): EUR {
    return ((a as number) + (b as number)) as EUR;
}

// Unwrap to plain number when needed
function toNumber(amount: USD | EUR): number {
    return amount as number;
}

// Usage
const price = usd(29.99);
const tax = usd(2.40);
const total = addUSD(price, tax);

console.log(`Total: $${toNumber(total)}`); // "Total: $32.39"

const euroPrice = eur(25.00);
// addUSD(price, euroPrice); // Error! Cannot mix USD and EUR

console.log(`EUR price: €${toNumber(euroPrice)}`);
