import { NextFunction, Request, Response } from "express";
import { verify, sign } from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import User from "../Model/userModel";
import { compare } from "bcryptjs";
import APIError from "../utils/APIError";

/**
 *  sign jwt token by id and default secret and expire
 * @param {String} id
 * @returns {Function} signJWT
 */
export const signToken = async (id: string) => {
  return await sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60,
  });
};

/**
 *default options for cookie
 *@type {object}
 */
const cookieOptions = {
  expires: new Date(90 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
/**
 *  verify token by default secret
 * @param {String} id
 * @returns {Function} signJWT
 */
const verifyToken = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET as string);
};

/**
 * middleware func for register user. work with request and set cookie and user if succeed.
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.body);
      if (req.body.password !== req.body.confirmPassword) {
        throw new APIError({
          message: "password is not match.",
          errorCode: 405,
        });
      }
      const newUser = await User.create({
        userName: req.body.userName,
        password: req.body.password,
      });
      const id = newUser._id._id.toString();
      const token = await signToken(id);
      res.cookie("jwt", token, cookieOptions);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.status(201).json({
        status: "success",
        user: {
          userName: newUser.userName,
          role: newUser.role,
          _id: undefined,
          token: token,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * middleware func for login user. work with request and set cookie and user if succeed.
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exitingUser = await User.findOne({
        userName: { $eq: req.query.userName },
      }).select("+password");
      if (!exitingUser) {
        throw new APIError({ message: "invalid credentials.", errorCode: 405 });
      }
      const compareResault = await compare(
        req.query.password as string,
        exitingUser?.password as string
      );
      if (!compareResault) {
        throw new APIError({ message: "invalid credentials.", errorCode: 405 });
      }
      const id = exitingUser._id._id.toString();
      const token = await signToken(id);
      res.cookie("jwt", token, { sameSite: "none" });
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.status(200).json({
        status: "success",
        user: {
          //@ts-ignore
          ...exitingUser._doc,
          passwordChangedAt: undefined,
          password: undefined,
          token,
          _id: undefined,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * middlware for controlling client from server by comparing roles
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
export const restrict = (allowedRoles: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = allowedRoles.split(" ");
      const isAllowed = roles.includes(req.body.user.role);
      if (!isAllowed || !req.body.user.role) {
        throw new APIError({
          message: "unauthorized session.",
          errorCode: 400,
        });
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  });

/**
 * middlware for controlling current session client from server
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.headers);
      const cookieTokenKey = req.headers?.cookie?.split("=")[0] as string;
      const token = req.headers?.cookie?.split("=")[1] as string;
      // console.log(req.headers.cookie, req);
      // console.log(req.cookies);
      // const token = req.headers.jwt as string;
      const verifyResault = await verifyToken(token);
      //@ts-ignore
      const exitingUser = await User.findById(verifyResault.id);
      if (!verifyResault || !exitingUser) {
        throw new APIError({
          message: "unauthorized session.",
          errorCode: 400,
        });
      }
      req.body.user = exitingUser;
      if (
        // cookieTokenKey === "jwt" &&
        token
      ) {
        if (!verifyResault) {
          throw new APIError({
            message: "unauthorized session.",
            errorCode: 400,
          });
        }
        next();
      }
    } catch (err) {
      next(err);
    }
  }
);
