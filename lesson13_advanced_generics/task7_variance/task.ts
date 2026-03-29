// Variance Annotations — Demonstration

interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Covariant: T only in output positions
interface Producer<out T> {
    produce(): T;
}

// Contravariant: T only in input positions
interface Consumer<in T> {
    consume(value: T): void;
}

// Invariant: T in both positions
interface State<in out T> {
    get(): T;
    set(value: T): void;
}

// --- Covariance in action ---
const dogProducer: Producer<Dog> = {
    produce: () => ({ name: "Rex", breed: "Labrador" }),
};

// Producer<Dog> assignable to Producer<Animal> ✓
const animalProducer: Producer<Animal> = dogProducer;
console.log("Produced:", animalProducer.produce().name);

// --- Contravariance in action ---
const animalConsumer: Consumer<Animal> = {
    consume: (animal) => console.log("Consuming:", animal.name),
};

// Consumer<Animal> assignable to Consumer<Dog> ✓
const dogConsumer: Consumer<Dog> = animalConsumer;
dogConsumer.consume({ name: "Buddy", breed: "Poodle" });

// --- Invariance: neither direction works ---
// const dogState: State<Dog> = someAnimalState;  // Error
// const animalState: State<Animal> = someDogState; // Error

// Readonly properties enable covariance
interface ReadonlyBox<out T> {
    readonly value: T;
}

const dogBox: ReadonlyBox<Dog> = { value: { name: "Max", breed: "Beagle" } };
const animalBox: ReadonlyBox<Animal> = dogBox; // OK — covariant
console.log("Box:", animalBox.value.name);
