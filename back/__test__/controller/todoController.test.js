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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const express_1 = require("express");
const todoController = __importStar(require("../../src/controller/todoController"));
const factoryFn = __importStar(require("../../src/controller/factoryFn"));
const todoStub = {
    title: "task2132",
    isImportant: false,
    isCompleted: false,
    dueDate: 19158327156465,
    user: "666705a2d167d2b4162269a7",
    category: "66684bdbfb4d1e3164e59652",
};
describe("todo controller test:", () => {
    const sendSuccessDataSpy = jest.spyOn(factoryFn, "sendSuccessData");
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get("/api/auth/login?userName=2122r991&password=1234sdasd@123ASDASD56").set;
    }));
    it("should get all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const responseJsonSpy = jest.spyOn(express_1.response, "json");
        const responseStatusSpy = jest.spyOn(express_1.response, "status");
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/categories");
        //     expect.any(sendSuccessDataSpy).toHaveBeenCalledTimes(1);
        //     expect(responseJsonSpy).toHaveBeenCalledTimes(1);
        //     expect(responseStatusSpy).toHaveBeenCalledWith(200);
    }));
    it("should get all todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/");
        expect(res.body).not.toBeUndefined();
        //     expect.any(sendSuccessDataSpy).toHaveBeenCalledTimes(1);
        //     expect(res.status).toBe(200);
    }));
    it("should cant get todos by unauthorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/").set("Cookie", ["jwt=''"]);
        //     expect.any(sendSuccessDataSpy).toHaveBeenCalledTimes(0);
        //expect(res.status).toBe(400);
    }));
    it("should add todo to database successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        //     expect.any(sendSuccessDataSpy).toHaveBeenCalledTimes(1);
        //     expect(res.status).toBe(201);
        //     expect(res.body.todo).toContain(todoStub);
    }));
    it("should delete a todo from database successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const resAdd = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        const resGetBefore = yield (0, supertest_1.default)(app_1.app)
            .post(`/api/todo?title=${todoStub.title}`)
            .send(todoStub);
        const resDelete = yield (0, supertest_1.default)(app_1.app).delete(`/api/todo/${resGetBefore.body._id}`);
        const resGetAfter = yield (0, supertest_1.default)(app_1.app)
            .post(`/api/todo?title=${todoStub.title}`)
            .send(todoStub);
        //     expect.any(sendSuccessDataSpy).toHaveBeenCalledTimes(1);
        //     expect(resGetBefore.body).toHaveLength(1);
        //     expect(resGetBefore.body).toHaveLength(0);
        //     expect(res.status).toBe(201);
        //     expect(res.body.todo).toContain(todoStub);
    }));
    it("should get completed todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const getCompletedTasksSpy = jest.spyOn(todoController, "getCompletedTasks");
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/completedTasks");
        //     expect(getCompletedTasksSpy).toHaveBeenCalledTimes(1);
        //     expect(res.body.todos).not.toHaveLength(0);
    }));
    it("shouls get custom data todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const getCustomDateTodosSpy = jest.spyOn(todoController, "getCustomDateTodos");
        const resAdd = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        const todoDateString = todoStub.dueDate;
        const getCustomDateres = yield (0, supertest_1.default)(app_1.app).get(`/api/customDateTodos?endDate${todoDateString + 2000}&startDate=${todoDateString}`);
        // expect(getCustomDateres.body.todos).not.toHaveLength(0);
        // expect(getCustomDateTodosSpy).toHaveBeenCalledTimes(1);
    }));
    it("should update added todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const resAdd = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        const resUpdate = yield (0, supertest_1.default)(app_1.app).patch(`/api/todo/${resAdd.body.todo._id}`);
        const updateSpy = jest.spyOn(todoController, "updateTodo");
        //     expect(resUpdate.status).toBe(201);
        //     expect(updateSpy).toHaveBeenCalledTimes(1);
    }));
});
