# Opaque Currency Types Exercise

Practice building opaque types that prevent mixing incompatible currency
values. You will create `USD` and `EUR` opaque types with constructors
and arithmetic operations that enforce currency safety at compile time.

## Instructions

1. In `task.ts`, declare a non-exported `unique symbol` called `CurrencyBrand`.

2. Define opaque types `USD` and `EUR` as `number` intersected with an object
   containing `readonly [CurrencyBrand]` keyed to `"USD"` or `"EUR"` respectively.

3. Implement `usd(amount: number): USD` — returns the branded value. Throws
   an `Error` with message `"Amount must be finite"` if the input is not finite
   (use `Number.isFinite`).

4. Implement `eur(amount: number): EUR` — same validation as `usd`, but brands
   as `EUR`.

5. Implement `addUSD(a: USD, b: USD): USD` — adds two USD amounts and returns
   a branded USD result.

6. Implement `addEUR(a: EUR, b: EUR): EUR` — adds two EUR amounts and returns
   a branded EUR result.

7. Implement `toNumber(amount: USD | EUR): number` — unwraps the branded value
   to a plain number.

## Example

```typescript
const price = usd(29.99);
const tax = usd(2.01);
const total = addUSD(price, tax);
toNumber(total); // 32

const euroPrice = eur(25.00);
const euroTax = eur(5.00);
const euroTotal = addEUR(euroPrice, euroTax);
toNumber(euroTotal); // 30

// addUSD(price, euroPrice); // Compile error — cannot mix currencies!
usd(Infinity);              // throws "Amount must be finite"
```

<div class="hint">
Remember that arithmetic on branded numbers returns plain `number`. After adding
`a + b`, you must re-cast the result with `as USD` or `as EUR` to preserve the
brand. The `unique symbol` should be declared with `declare const` and NOT exported.
</div>
