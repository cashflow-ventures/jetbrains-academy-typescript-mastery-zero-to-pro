export {};
// Optional and Default Parameters

// 1. Optional parameter — marked with ? after the name
function greet(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));           // "Hello, Alice!"
console.log(greet("Alice", "Dr."));    // "Hello, Dr. Alice!"

// 2. Default parameter — provides a fallback value
function createUrl(path: string, protocol: string = "https"): string {
    return `${protocol}://${path}`;
}

console.log(createUrl("example.com"));          // "https://example.com"
console.log(createUrl("example.com", "http"));  // "http://example.com"

// 3. Default values provide type inference — no annotation needed
function repeat(text: string, times = 3): string {
    return text.repeat(times); // times is inferred as number from default
}

console.log(repeat("ha"));    // "hahaha"
console.log(repeat("ha", 5)); // "hahahahaha"

// 4. Optional params must come after required params
function buildTag(tag: string, id?: string, className?: string): string {
    let attrs = "";
    if (id) attrs += ` id="${id}"`;
    if (className) attrs += ` class="${className}"`;
    return `<${tag}${attrs}>`;
}

console.log(buildTag("div"));                        // "<div>"
console.log(buildTag("div", "main"));                // '<div id="main">'
console.log(buildTag("div", "main", "container"));   // '<div id="main" class="container">'

// 5. Combining optional and default parameters
function formatCurrency(amount: number, currency = "$", decimals?: number): string {
    const fixed = decimals !== undefined ? amount.toFixed(decimals) : amount.toString();
    return `${currency}${fixed}`;
}

console.log(formatCurrency(42));           // "$42"
console.log(formatCurrency(42, "€"));      // "€42"
console.log(formatCurrency(42, "€", 2));   // "€42.00"
