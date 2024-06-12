"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// import helmet from "helmet";
// import hpp from "hpp";
// import erl from "express-rate-limit";
// import ems from "express-mongo-sanitize";
const authRouter_1 = __importDefault(require("./router/authRouter"));
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const APIError_1 = __importDefault(require("./utils/APIError"));
const express = require("express");
exports.app = express();
// const limiter = erl({
//   limit: 1000,
//   windowMs: 3600 * 1000,
//   message: "requests limit.",
// });
// app.use(helmet());
// app.use(hpp());
exports.app.use(express.json());
// app.use(limiter);
exports.app.use("/api/auth", authRouter_1.default);
exports.app.use("/api/todo", todoRouter_1.default);
// app.use(ems({ replaceWith: "_" }));
exports.app.all("*", (req, res, next) => next(new APIError_1.default({
    message: `the url ${req.originalUrl} not found.`,
    errorCode: 404,
})));
