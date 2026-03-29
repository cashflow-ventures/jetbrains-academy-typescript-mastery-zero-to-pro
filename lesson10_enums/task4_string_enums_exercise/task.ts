// TODO: Create and export a string enum called HttpStatus
// Members: Ok = "200_OK", Created = "201_CREATED",
//          BadRequest = "400_BAD_REQUEST", NotFound = "404_NOT_FOUND",
//          ServerError = "500_SERVER_ERROR"

// TODO: Export a function called handleResponse
// Takes an HttpStatus and returns a descriptive message string
// Ok → "Success: Request completed."
// Created → "Success: Resource created."
// BadRequest → "Client Error: Bad request."
// NotFound → "Client Error: Resource not found."
// ServerError → "Server Error: Internal failure."
export function handleResponse(status: string): string {
    // Write your solution here
    return "";
}

// TODO: Export a function called isSuccessStatus
// Takes an HttpStatus and returns true for Ok or Created, false otherwise
export function isSuccessStatus(status: string): boolean {
    // Write your solution here
    return false;
}
