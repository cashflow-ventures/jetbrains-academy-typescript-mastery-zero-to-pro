// ReturnType, Parameters, and ConstructorParameters

// --- ReturnType: derive the return type of a function ---
function fetchConfig() {
    return {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3,
    };
}

type AppConfig = ReturnType<typeof fetchConfig>;
// { apiUrl: string; timeout: number; retries: number }

const config: AppConfig = fetchConfig();
console.log(config.apiUrl); // "https://api.example.com"

// --- Parameters: extract argument types as a tuple ---
function formatDate(year: number, month: number, day: number): string {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type DateArgs = Parameters<typeof formatDate>;
// [year: number, month: number, day: number]

function logAndFormat(...args: DateArgs): string {
    console.log("Formatting date with args:", args);
    return formatDate(...args);
}

console.log(logAndFormat(2024, 1, 15)); // "2024-01-15"

// --- ConstructorParameters: extract constructor args ---
class ApiClient {
    constructor(
        public baseUrl: string,
        public apiKey: string,
        public timeout: number = 5000
    ) {}
}

type ClientArgs = ConstructorParameters<typeof ApiClient>;
// [baseUrl: string, apiKey: string, timeout?: number]

function createClient(...args: ClientArgs): ApiClient {
    return new ApiClient(...args);
}

const client = createClient("https://api.example.com", "secret-key");
console.log(client.baseUrl); // "https://api.example.com"
