// Builder Pattern — Fluent builder with method chaining

// The object we want to build
interface HttpRequest {
    readonly method: "GET" | "POST" | "PUT" | "DELETE";
    readonly url: string;
    readonly headers: Record<string, string>;
    readonly body?: string;
    readonly timeout: number;
}

// Fluent builder with method chaining
class HttpRequestBuilder {
    private method: HttpRequest["method"] = "GET";
    private url: string = "";
    private headers: Record<string, string> = {};
    private body?: string;
    private timeout: number = 30000;

    // Each setter returns `this` for chaining
    setMethod(method: HttpRequest["method"]): this {
        this.method = method;
        return this;
    }

    setUrl(url: string): this {
        this.url = url;
        return this;
    }

    addHeader(key: string, value: string): this {
        this.headers[key] = value;
        return this;
    }

    setBody(body: string): this {
        this.body = body;
        return this;
    }

    setTimeout(ms: number): this {
        this.timeout = ms;
        return this;
    }

    build(): HttpRequest {
        if (!this.url) {
            throw new Error("URL is required");
        }
        return {
            method: this.method,
            url: this.url,
            headers: { ...this.headers },
            body: this.body,
            timeout: this.timeout,
        };
    }
}

// Usage — fluent chaining reads like a sentence
const request = new HttpRequestBuilder()
    .setMethod("POST")
    .setUrl("https://api.example.com/users")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer token123")
    .setBody(JSON.stringify({ name: "Alice" }))
    .setTimeout(5000)
    .build();

console.log(request);
// {
//   method: "POST",
//   url: "https://api.example.com/users",
//   headers: { "Content-Type": "application/json", Authorization: "Bearer token123" },
//   body: '{"name":"Alice"}',
//   timeout: 5000
// }
