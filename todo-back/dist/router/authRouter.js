"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("./../controller/authController");
/**
 * @namespace userRouter
 */
const userRouter = (0, express_1.Router)();
/**
 * @name /auth/login
 * router for logining and get current user data
 * @function
 * @memberof userRouter
 * @returns {object} user
 */
userRouter.get("/login", authController_1.login);
/**
 * @name /auth/register
 * router for signing up user
 * @function
 * @memberof userRouter
 */
userRouter.post("/register", authController_1.register);
exports.default = userRouter;
