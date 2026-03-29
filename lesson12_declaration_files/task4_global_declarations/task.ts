// Global Declarations — declare global and augmenting built-in types

// In a module file, declare global extends the global scope.
// This file demonstrates the patterns conceptually.

export {};

// --- Simulating global augmentation ---
// In a real project, you'd write this in a .d.ts file:
//
// declare global {
//     interface Window {
//         analytics: { track(event: string): void };
//     }
//     const BUILD_VERSION: string;
// }

// --- Demonstrating the concept with local types ---

// Imagine a bundler injects these at build time:
interface AppGlobals {
    BUILD_VERSION: string;
    IS_PRODUCTION: boolean;
    API_BASE_URL: string;
}

// Simulating reading global config
function getAppGlobals(): AppGlobals {
    return {
        BUILD_VERSION: "1.2.3",
        IS_PRODUCTION: false,
        API_BASE_URL: "https://api.example.com",
    };
}

// Simulating Window augmentation pattern
interface AugmentedWindow {
    analytics: {
        track(event: string, data?: Record<string, unknown>): void;
        identify(userId: string): void;
    };
    __APP_CONFIG__: {
        apiUrl: string;
        environment: "dev" | "staging" | "production";
    };
}

function createAugmentedWindow(): AugmentedWindow {
    return {
        analytics: {
            track: (event, data) => console.log(`[Track] ${event}`, data),
            identify: (userId) => console.log(`[Identify] ${userId}`),
        },
        __APP_CONFIG__: {
            apiUrl: "https://api.example.com",
            environment: "dev",
        },
    };
}

// --- Usage ---
const globals: AppGlobals = getAppGlobals();
console.log(`Build: ${globals.BUILD_VERSION}, Production: ${globals.IS_PRODUCTION}`);

const win: AugmentedWindow = createAugmentedWindow();
win.analytics.track("page_view", { path: "/home" });
console.log("API URL:", win.__APP_CONFIG__.apiUrl);
