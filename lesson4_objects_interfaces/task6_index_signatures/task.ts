// Index Signatures — objects with dynamic keys

// 1. Basic string index signature
interface StringDictionary {
    [key: string]: string;
}

const colors: StringDictionary = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
};
colors["purple"] = "#800080";
console.log(`Red: ${colors["red"]}, Purple: ${colors["purple"]}`);

// 2. Combining index signatures with known properties
interface AppConfig {
    name: string;
    version: number;
    [key: string]: string | number;
}

const config: AppConfig = {
    name: "MyApp",
    version: 3,
    timeout: 5000,
    host: "localhost",
};
console.log(`${config.name} v${config.version}, host: ${config["host"]}`);

// 3. Number index signature — array-like objects
interface NumberMap {
    [index: number]: string;
}

const fruits: NumberMap = { 0: "apple", 1: "banana", 2: "cherry" };
console.log(`First fruit: ${fruits[0]}`);

// 4. Iterating over dynamic keys
function printDictionary(dict: StringDictionary): void {
    for (const key of Object.keys(dict)) {
        console.log(`  ${key}: ${dict[key]}`);
    }
}

console.log("Colors:");
printDictionary(colors);
