import { NextFunction, Request, Response } from "express";
// import helmet from "helmet";
// import hpp from "hpp";
// import erl from "express-rate-limit";
// import ems from "express-mongo-sanitize";
import authRouter from "./router/authRouter";
import todoRouter from "./router/todoRouter";
import APIError from "./utils/APIError";
const express = require("express");
export const app = express();
// const limiter = erl({
//   limit: 1000,
//   windowMs: 3600 * 1000,
//   message: "requests limit.",
// });
// app.use(helmet());
// app.use(hpp());
app.use(express.json());
// app.use(limiter);
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
// app.use(ems({ replaceWith: "_" }));
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(
    new APIError({
      message: `the url ${req.originalUrl} not found.`,
      errorCode: 404,
    })
  )
);
