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
const cors = require("cors");
const dotenv = require("dotenv");
exports.app = express();
dotenv.config({ path: "./src/config.env" });
exports.app.use(cors({
    origin: "http://localhost:3000", // Allow the correct origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cookies",
        "Cookie",
        "cookie",
    ],
    credentials: true, // Include credentials if needed
}));
// app.options(
//   "*",
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cookies",
//       "Cookie",
//       "Cook",
//     ],
//     credentials: true,
//     sameSite: "None",
//   })
// );
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
