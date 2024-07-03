import mongoose from "mongoose";
import { compareHashed, hashPassword } from "../lib/bcrypt";
import { isStrongPassword } from "validator";
import { NextFunction } from "express";

export interface userProps {
  userName: string;
  password: string;
  passwordChangedAt: number;
}

/**
 * @class userSchema
 * @type {mongoose.Schema}
 */
export const userSchema = new mongoose.Schema({
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
      validator: function (el: string) {
        return isStrongPassword(el, {
          minLength: 6,
          minLowercase: 0,
          minNumbers: 0,
          minSymbols: 0,
          minUppercase: 0,
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
const checkPasswordChange = (user: mongoose.Document, password: string) =>
  !password || !user.isModified(password as string);

/**
 * pre save middleware for saving last changed time
 * @returns {void}
 */
userSchema.pre(
  "save",
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (checkPasswordChange(this, this.password as string)) {
      next();
    }
    const hashedPassword = await hashPassword(this.password as string);
    this.password = hashedPassword;
    this.passwordChangedAt = Date.now();
    next();
  }
);
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
userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password as string);
  next();
});

/**
 * async function for controlling password correctly
 * @param {string} password
 * @param {string} hashedPassword
 * @returns resault of comparing password by hashed in database
 */
export const isCorrectPassword = async function (
  password: string,
  hashedPassword: string
) {
  return compareHashed(password, hashedPassword);
};

/**
 * @class User
 * @type {mongoose.Model}
 */
const User = mongoose.model("user", userSchema);

export default User;
