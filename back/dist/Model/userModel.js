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
exports.isCorrectPassword = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = require("../lib/bcrypt");
const validator_1 = require("validator");
/**
 * @class userSchema
 * @type {mongoose.Schema}
 */
exports.userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        require: [true, "userName is required."],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "password is required."],
        select: false,
        validate: {
            validator: function (el) {
                return (0, validator_1.isStrongPassword)(el, {
                    minLength: 6,
                    minLowercase: 2,
                    minNumbers: 2,
                    minSymbols: 1,
                    minUppercase: 1,
                });
            },
            message: "password is not strong",
        },
    },
    passwordChangedAt: {
        type: Number,
        default: Date.now(),
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});
/**
 *  function for checking password changes in database
 * @param {mongoose.Document} user
 * @param {string} password
 * @returns {boolean} resault of contorolling current pass is changed or not
 */
const checkPasswordChange = (user, password) => !password || !user.isModified(password);
/**
 * pre save middleware for saving last changed time
 * @returns {void}
 */
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (checkPasswordChange(this, this.password)) {
            next();
        }
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(this.password);
        this.password = hashedPassword;
        this.passwordChangedAt = Date.now();
        next();
    });
});
//following code is not working
// userSchema.methods.isCorrectPassword = async function (password: string) {
//   const user = this as userProps;
//   return comparePassword(password, user.password);
// };
//@ts-ignore
/**
 * pre save middleware for hashing new password if changed
 * @returns {void}
 */
//@ts-ignore
exports.userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield (0, bcrypt_1.hashPassword)(this.password);
        next();
    });
});
/**
 * async function for controlling password correctly
 * @param {string} password
 * @param {string} hashedPassword
 * @returns resault of comparing password by hashed in database
 */
const isCorrectPassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcrypt_1.compareHashed)(password, hashedPassword);
    });
};
exports.isCorrectPassword = isCorrectPassword;
/**
 * @class User
 * @type {mongoose.Model}
 */
const User = mongoose_1.default.model("user", exports.userSchema);
exports.default = User;
