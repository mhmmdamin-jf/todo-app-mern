"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class ApiError
 * @type {APIErrorProps}
 */
class APIError extends Error {
    /**
     * @param {string} message
     * @param {statusCode} errorCode
     * @param {boolean} isOperational
     */
    constructor({ message = "something went wrong.", errorCode = 400, isOperational = true, }) {
        super(message);
        this.errorCode = errorCode;
        this.isOperational = isOperational;
    }
}
exports.default = APIError;
