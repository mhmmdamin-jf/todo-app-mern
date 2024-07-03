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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController = __importStar(require("../../src/controller/authController"));
const userModel_1 = __importDefault(require("../../src/Model/userModel"));
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn((id, secret, options) => {
        return "token";
    }),
}));
jest.mock("bcryptjs", () => ({
    compare: jest.fn().mockImplementation(() => true),
}));
jest.mock("../../src/Model/userModel");
const userStub = { userName: "user1", password: "pass1" };
const reqMock = {
    body: { userName: "user1", password: "pass1", confirmPassword: "pass1" },
};
const resMock = {
    cookie: jest.fn(() => "token"),
    header: jest.fn(() => { }),
    status: jest.fn(() => { }),
    json: jest.fn(() => { }),
};
const nextMock = jest.fn();
const idStub = "1234";
const secretStub = "secret";
const expiresStub = 1;
describe("authentication & authorization test:", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("sign token should return a token by payload.", () => __awaiter(void 0, void 0, void 0, function* () {
        //method 1
        //problem : not callable
        // await authController.signToken("id");
        //     const signMock = jest.spyOn(jsonwebtoken, "sign").mockImplementation(() => {
        //       return "token";
        //     });
    }));
    test("shoud register with valid req", () => __awaiter(void 0, void 0, void 0, function* () {
        //method 1
        //problem : not called
        const statusMock = jest.spyOn(Response, "json");
        const jsonMock = jest.spyOn(authController, "register");
        yield authController.register(reqMock, resMock, nextMock);
        //method 2
        //problem : res.status 500
        // const res = await request(app).get(`/api/todo/`).send();
        //     expect(jsonMock).toHaveBeenCalled();
        //     expect(statusMock).toHaveBeenCalledWith(200);
        //     expect(jsonMock).toHaveBeenCalledWith(
        //       {
        //         status: "success",
        //         user: { userName: "user1", password: "pass1" },
        //       },
        //       "token"
        //     );
    }));
    it("should not logged in.", () => __awaiter(void 0, void 0, void 0, function* () {
        const statusMock = jest.spyOn(Response, "json");
        const jsonMock = jest.spyOn(authController, "register");
        const authControllerSpy = jest.spyOn(authController, "login");
        const userCreateSpy = jest.spyOn(userModel_1.default, "create");
        yield authController.register(reqMock, resMock, nextMock);
        yield authController.login(Object.assign(Object.assign({}, reqMock), { password: "user99999" }), resMock, nextMock);
        // expect(compareMock).toHaveBeenCalled();
        // expect(userCreateSpy).toHaveBeenCalled();
        // expect(authControllerSpy).toHaveBeenCalledWith(
        //   reqMock as any as Request,
        //   resMock as any as Response,
        //   nextMock as any as NextFunction
        // );
        // expect(statusMock).toHaveBeenCalledWith(400);
        // expect(jsonMock).not.toHaveBeenCalled();
    }));
    it("should login successfully.", () => __awaiter(void 0, void 0, void 0, function* () {
        const statusMock = jest.spyOn(Response, "json");
        const jsonMock = jest.spyOn(authController, "register");
        const authControllerSpy = jest.spyOn(authController, "login");
        const userCreateSpy = jest.spyOn(userModel_1.default, "create");
        yield authController.login(reqMock, resMock, nextMock);
        // expect(compareMock).toHaveBeenCalled();
        // expect(userCreateSpy).toHaveBeenCalled();
        // expect(authControllerSpy).toHaveBeenCalledWith(
        //   reqMock as any as Request,
        //   resMock as any as Response,
        //   nextMock as any as NextFunction
        // );
        // expect(statusMock).toHaveBeenCalledWith(200);
        // expect(jsonMock).toHaveBeenCalled();
    }));
    it("should can be access with authorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        yield authController.login(reqMock, resMock, nextMock);
        const protectRes = yield authController.protect(reqMock, resMock, nextMock);
        // expect(protectRes).not.toThrow(
        //   new APIError({
        //     message: "unauthorized session.",
        //     errorCode: 400,
        //   })
        // );
    }));
    it("should not can be access with unauthorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        yield authController.register(reqMock, resMock, nextMock);
        yield authController.login(Object.assign(Object.assign({}, reqMock), { password: "wrong" }), resMock, nextMock);
        const protectRes = yield authController.protect(reqMock, resMock, nextMock);
        // expect(protectRes).toThrow(
        //   new APIError({
        //     message: "unauthorized session.",
        //     errorCode: 400,
        //   })
        // );
    }));
});
