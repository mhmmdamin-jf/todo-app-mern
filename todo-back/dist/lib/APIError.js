"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    constructor({ message = "something went wrong.", errorCode = 400, isOperational = true, }) {
        super(message);
        this.errorCode = errorCode;
        this.isOperational = isOperational;
    }
}
exports.default = APIError;
