import { response } from "express";

interface APIErrorProps {
  message?: string;
  errorCode?: typeof response.statusCode;
  isOperational?: boolean;
}

/**
 * @class ApiError
 * @type {APIErrorProps}
 */
class APIError extends Error {
  errorCode: number;
  isOperational: boolean;
  /**
   * @param {string} message
   * @param {statusCode} errorCode
   * @param {boolean} isOperational
   */
  constructor({
    message = "something went wrong.",
    errorCode = 400,
    isOperational = true,
  }: APIErrorProps) {
    super(message);
    this.errorCode = errorCode;
    this.isOperational = isOperational;
  }
}

export default APIError;
