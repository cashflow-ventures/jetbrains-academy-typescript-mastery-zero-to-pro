# Variance Annotations

TypeScript 4.7 introduced explicit variance annotations — `out` for covariant and `in` for
contravariant type parameters. These annotations make subtype relationships between generic
types clear, correct, and faster for the compiler to check.

## Core Concept

**Variance** describes how subtype relationships between type arguments translate to subtype
relationships between the generic types that contain them.

Given `Dog extends Animal`:

- **Covariant** (`out T`): `Box<Dog>` is assignable to `Box<Animal>`. The type parameter
  flows *out* — it appears in output positions (return types, readonly properties).
- **Contravariant** (`in T`): `Handler<Animal>` is assignable to `Handler<Dog>`. The type
  parameter flows *in* — it appears in input positions (function parameters).
- **Invariant** (`in out T`): The type parameter appears in both input and output positions.
  Neither direction of assignment is safe.

```typescript
interface Animal { name: string; }
interface Dog extends Animal { breed: string; }

// Covariant: T only appears in output position
interface Reader<out T> {
    read(): T;
}

// Contravariant: T only appears in input position
interface Writer<in T> {
    write(value: T): void;
}

// Invariant: T appears in both positions
interface ReadWriter<in out T> {
    read(): T;
    write(value: T): void;
}
```

## How It Works

### Covariance (`out T`)

When a type parameter only appears in output positions, the generic type preserves the
subtype direction:

```typescript
interface Producer<out T> {
    produce(): T;
}

// Dog extends Animal, so Producer<Dog> extends Producer<Animal>
function processAnimal(producer: Producer<Animal>): void {
    const animal = producer.produce(); // Safe: we get at least an Animal
    console.log(animal.name);
}

const dogProducer: Producer<Dog> = {
    produce: () => ({ name: "Rex", breed: "Labrador" })
};

processAnimal(dogProducer); // OK — covariant
```

### Contravariance (`in T`)

When a type parameter only appears in input positions, the subtype direction reverses:

```typescript
interface Consumer<in T> {
    consume(value: T): void;
}

// Animal is a supertype of Dog
// So Consumer<Animal> is assignable to Consumer<Dog> (reversed!)
function feedDog(consumer: Consumer<Dog>): void {
    consumer.consume({ name: "Rex", breed: "Labrador" });
}

const animalConsumer: Consumer<Animal> = {
    consume: (animal) => console.log(animal.name)
};

feedDog(animalConsumer); // OK — contravariant
```

A `Consumer<Animal>` can handle any animal, so it can certainly handle a `Dog`.

### Invariance

When `T` appears in both input and output positions, neither assignment direction is safe:

```typescript
interface State<in out T> {
    get(): T;
    set(value: T): void;
}

// State<Dog> is NOT assignable to State<Animal>
// State<Animal> is NOT assignable to State<Dog>
```

### Why Annotate?

Without annotations, TypeScript infers variance by analyzing every member of the interface.
Explicit annotations:

1. **Document intent**: Readers immediately know how the type parameter is used.
2. **Catch mistakes**: If you mark `out T` but use `T` in an input position, the compiler errors.
3. **Improve performance**: The compiler can skip structural analysis for variance checking.

## Common Pitfalls

- **Mutable properties are invariant**: A property `value: T` (read + write) makes `T` invariant. Use `readonly value: T` for covariance.
- **Arrays are covariant in TS**: TypeScript treats `Dog[]` as assignable to `Animal[]` for pragmatic reasons, even though mutation makes this unsound. This is a known trade-off.
- **Callbacks reverse variance**: A function parameter `fn: (x: T) => void` puts `T` in a contravariant position because `T` is an input to the callback.
- **Forgetting `readonly`**: If you want a covariant container, all properties exposing `T` must be `readonly`.

## Key Takeaways

- `out T` means covariant — `T` only appears in output positions (return types, readonly properties).
- `in T` means contravariant — `T` only appears in input positions (parameters).
- `in out T` means invariant — `T` appears in both positions.
- Explicit annotations document intent, catch errors, and speed up type checking.
- Mutable properties make a type parameter invariant; use `readonly` for covariance.

<div class="hint">
Think of `out` as "this type parameter comes *out* of the interface" (you read it)
and `in` as "this type parameter goes *in* to the interface" (you write it).
This mnemonic matches the C# convention where these keywords originated.
</div>
