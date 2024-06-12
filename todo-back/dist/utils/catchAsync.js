"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
/**
 * function for adding catching errors and wrapp
 * @param {Function} fn
 * @returns {Function} wrapped function
 */
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch();
exports.catchAsync = catchAsync;
