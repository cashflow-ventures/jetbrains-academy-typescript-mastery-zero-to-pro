// Strategy Pattern — Swappable algorithms via interfaces and generics

// Strategy interface for formatting output
interface Formatter {
    format(data: Record<string, unknown>): string;
}

// Concrete strategy: JSON formatting
const jsonFormatter: Formatter = {
    format(data: Record<string, unknown>): string {
        return JSON.stringify(data, null, 2);
    },
};

// Concrete strategy: CSV-like formatting
const csvFormatter: Formatter = {
    format(data: Record<string, unknown>): string {
        const keys = Object.keys(data);
        const values = keys.map((k) => String(data[k]));
        return keys.join(",") + "\n" + values.join(",");
    },
};

// Concrete strategy: plain text formatting
const textFormatter: Formatter = {
    format(data: Record<string, unknown>): string {
        return Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
    },
};

// Context class that uses a strategy
class DataExporter {
    constructor(private formatter: Formatter) {}

    setFormatter(formatter: Formatter): void {
        this.formatter = formatter;
    }

    exportData(data: Record<string, unknown>): string {
        return this.formatter.format(data);
    }
}

// Usage — swap strategies at runtime
const exporter = new DataExporter(jsonFormatter);
const sample = { name: "Alice", age: 30, active: true };

console.log("=== JSON ===");
console.log(exporter.exportData(sample));

exporter.setFormatter(csvFormatter);
console.log("\n=== CSV ===");
console.log(exporter.exportData(sample));

exporter.setFormatter(textFormatter);
console.log("\n=== Text ===");
console.log(exporter.exportData(sample));
