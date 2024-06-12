import { Router } from "express";
import { login, register } from "./../controller/authController";
/**
 * @namespace userRouter
 */
const userRouter = Router();

/**
 * @name /auth/login
 * router for logining and get current user data
 * @function
 * @memberof userRouter
 * @returns {object} user
 */
userRouter.get("/login", login);

/**
 * @name /auth/register
 * router for signing up user
 * @function
 * @memberof userRouter
 */
userRouter.post("/register", register);

export default userRouter;
