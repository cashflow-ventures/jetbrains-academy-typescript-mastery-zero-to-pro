// Type definitions
type ColorValue = string | [number, number, number];
type Palette = Record<string, ColorValue>;

// TODO: Create a palette object using satisfies Palette
// It should have these properties:
//   primary: "blue"
//   secondary: "green"
//   accent: [255, 136, 0]
// Use satisfies so that string properties stay as literal strings
// and the tuple property stays as a number tuple
export const palette = {} as Record<string, unknown>;

// TODO: Implement getPaletteCSS
// Takes a key that is a key of your palette ("primary" | "secondary" | "accent")
// If the value is a string, return it as-is
// If the value is a tuple [r, g, b], return "rgb(r, g, b)"
export function getPaletteCSS(key: "primary" | "secondary" | "accent"): string {
    // Write your solution here
    return "";
}

// Type for app configuration
type AppConfig = {
    appName: string;
    version: string;
    maxRetries: number;
    debug: boolean;
};

// TODO: Create an appConfig object using as const satisfies AppConfig
// It should have:
//   appName: "MyApp"
//   version: "1.0.0"
//   maxRetries: 3
//   debug: false
export const appConfig = {} as Record<string, unknown>;

// TODO: Implement getConfigSummary
// Returns "{appName} v{version} (debug: {debug})"
// Use the appConfig object directly
export function getConfigSummary(): string {
    // Write your solution here
    return "";
}
