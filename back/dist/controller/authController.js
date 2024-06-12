"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.restrict = exports.login = exports.register = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const catchAsync_1 = require("../utils/catchAsync");
const userModel_1 = __importDefault(require("../Model/userModel"));
const bcryptjs_1 = require("bcryptjs");
const APIError_1 = __importDefault(require("../utils/APIError"));
/**
 *  sign jwt token by id and default secret and expire
 * @param {String} id
 * @returns {Function} signJWT
 */
const signToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
    });
});
exports.signToken = signToken;
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
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("-----------------", process.env.JWT_SECRET, token, "-------------------");
    return yield (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
});
/**
 * middleware func for register user. work with request and set cookie and user if succeed.
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
exports.register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            throw new APIError_1.default({
                message: "password is not match.",
                errorCode: 405,
            });
        }
        const newUser = yield userModel_1.default.create({
            userName: req.body.userName,
            password: req.body.password,
        });
        const id = newUser._id._id.toString();
        const token = yield (0, exports.signToken)(id);
        res.cookie("jwt", token);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json({
            status: "success",
            user: Object.assign(Object.assign({}, newUser), { id: undefined }),
            token,
        });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * middleware func for login user. work with request and set cookie and user if succeed.
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
exports.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitingUser = yield userModel_1.default.findOne({
            userName: { $eq: req.query.userName },
        }).select("+password");
        if (!exitingUser) {
            throw new APIError_1.default({ message: "invalid credentials.", errorCode: 405 });
        }
        const compareResault = yield (0, bcryptjs_1.compare)(req.query.password, exitingUser === null || exitingUser === void 0 ? void 0 : exitingUser.password);
        if (!compareResault) {
            throw new APIError_1.default({ message: "invalid credentials.", errorCode: 405 });
        }
        const id = exitingUser._id._id.toString();
        const jwtEXP = Number(process.env.JWT_EXPIERS);
        const token = yield (0, exports.signToken)(id);
        // console.log(req.cookies);
        res.cookie("jwt", token, { httpOnly: false, sameSite: "none" });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.status(200).json({
            status: "success",
            user: Object.assign(Object.assign({}, exitingUser._doc), { passwordChangedAt: undefined, password: undefined, token }),
        });
    }
    catch (err) {
        next(err);
    }
}));
/**
 * middlware for controlling client from server by comparing roles
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
const restrict = (allowedRoles) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = allowedRoles.split(" ");
        const isAllowed = roles.includes(req.body.user.role);
        if (!isAllowed || !req.body.user.role) {
            throw new APIError_1.default({
                message: "unauthorized session.",
                errorCode: 400,
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.restrict = restrict;
/**
 * middlware for controlling current session client from server
 * @param {Request} req
 * @param {Response} res
 * @param {next} NextFunction
 * send response
 * @returns nothing
 */
exports.protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const cookieTokenKey = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.cookie) === null || _b === void 0 ? void 0 : _b.split("=")[0];
        const token = (_d = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.cookie) === null || _d === void 0 ? void 0 : _d.split("=")[1];
        console.log("////////////////", req.cookies);
        const verifyResault = yield verifyToken(token);
        //@ts-ignore
        const exitingUser = yield userModel_1.default.findById(verifyResault.id);
        if (!verifyResault || !exitingUser) {
            throw new APIError_1.default({
                message: "unauthorized session.",
                errorCode: 400,
            });
        }
        req.body.user = exitingUser;
        if (cookieTokenKey === "jwt" && token) {
            if (!verifyResault) {
                throw new APIError_1.default({
                    message: "unauthorized session.",
                    errorCode: 400,
                });
            }
            next();
        }
    }
    catch (err) {
        next(err);
    }
}));
