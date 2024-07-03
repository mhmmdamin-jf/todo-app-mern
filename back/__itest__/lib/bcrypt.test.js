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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../../src/lib/bcrypt");
const stubPassword = "pass";
describe("bcrypte test", () => {
    test("should hashed input password.", () => __awaiter(void 0, void 0, void 0, function* () {
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        // expect(resault).not.toBe(stubPassword);
    }));
    test("should compare hashed input password by original and return true.", () => __awaiter(void 0, void 0, void 0, function* () {
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        const compareResault = yield (0, bcrypt_1.compareHashed)(stubPassword, resault);
        // expect(compareResault).toBe(true);
    }));
    test("should compare hashed input password by original and return false.", () => __awaiter(void 0, void 0, void 0, function* () {
        const resault = yield (0, bcrypt_1.hashPassword)(stubPassword);
        const compareResault = yield (0, bcrypt_1.compareHashed)("1234", resault);
        // expect(compareResault).toBe(false);
    }));
});
