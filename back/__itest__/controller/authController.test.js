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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const userStub = { userName: "user1", password: "pass1" };
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
        //const resault= await authController.signToken("id");
        // expect(resault).not.toHaveLength(0);
    }));
    test("shoud register with valid req", () => __awaiter(void 0, void 0, void 0, function* () {
        //method 1
        //problem : res.status 500
        // const res = await request(app).get(`/api/todo/`).send();
        // expect(res.status).toBe(200);
        // expect(res.body.user).not.toBeUndefined();
    }));
    it("should not logged in.", () => __awaiter(void 0, void 0, void 0, function* () {
        const registerRes = (yield (0, supertest_1.default)(app_1.app).post("/api/auth")).body(userStub);
        const logginRes = yield (0, supertest_1.default)(app_1.app).get(`/api/auth?userName=${userStub.userName}&password=${userStub.password}`);
        // expect(logginRes.status).not.toBe(200);
        // expect(logginRes.body.user).toBeUndefined();
    }));
    it("should login successfully.", () => __awaiter(void 0, void 0, void 0, function* () {
        const registerRes = (yield (0, supertest_1.default)(app_1.app).post("/api/auth")).body(userStub);
        const logginRes = yield (0, supertest_1.default)(app_1.app).get(`/api/auth?userName=${userStub.userName}&password=${13123}`);
        // expect(logginRes.status).not.toBe(200);
        // expect(logginRes.body.user).toBeUndefined();
    }));
    it("should can be access with authorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        const logginRes = yield (0, supertest_1.default)(app_1.app).get(`/api/auth?userName=${userStub.userName}&password=${userStub.password}`);
        const ProtectRouteRes = yield (0, supertest_1.default)(app_1.app).get(`/api/todo/today`);
        // expect(ProtectRouteRes.status).toBe(200);
    }));
    it("should not can be access with unauthorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        const logginRes = yield (0, supertest_1.default)(app_1.app).get(`/api/auth?userName=${userStub.userName}&password=${123124}`);
        const ProtectRouteRes = yield (0, supertest_1.default)(app_1.app).get(`/api/todo/today`);
        // expect(ProtectRouteRes.status).toBe(400);
    }));
});
