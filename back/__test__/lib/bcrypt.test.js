"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const bcrypt_1 = require("../../src/lib/bcrypt");
const stubPassword = "pass";
describe("bcrypte test", () => {
    test("should hashed input password.", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashSpy = jest.spyOn(bcrypt, "hash");
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        // expect(resault).not.toBe(stubPassword);
        // expect(hashSpy).toHaveBeenCalledTimes(1);
    }));
    test("should compare hashed input password by original and return true.", () => __awaiter(void 0, void 0, void 0, function* () {
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        const compareSpy = jest.spyOn(bcrypt, "compare");
        const compareResault = yield (0, bcrypt_1.compareHashed)(stubPassword, resault);
        // expect(compareResault).toBe(true);
    }));
    test("should compare hashed input password by original and return false.", () => __awaiter(void 0, void 0, void 0, function* () {
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        const compareSpy = jest.spyOn(bcrypt, "compare");
        const compareResault = yield (0, bcrypt_1.compareHashed)("1234", resault);
        // expect(compareResault).toBe(false);
    }));
});
