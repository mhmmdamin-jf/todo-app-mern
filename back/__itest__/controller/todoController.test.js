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
const todoStub = {
    title: "task2132",
    isImportant: false,
    isCompleted: false,
    dueDate: 19158327156465,
    user: "666705a2d167d2b4162269a7",
    category: "66684bdbfb4d1e3164e59652",
};
describe("todo controller test:", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get("/api/auth/login?userName=2122r991&password=1234sdasd@123ASDASD56").set;
    }));
    it("should get all categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/categories");
        // expect(res.status).toBe(200);
        // expect(res.body.todos).not.toBeUndefined();
    }));
    it("should get all todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/");
        expect(res.body).not.toBeUndefined();
        //     expect(res.status).toBe(200);
    }));
    it("should cant get todos by unauthorized session", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/").set("Cookie", ["jwt=''"]);
        //expect(res.status).toBe(400);
    }));
    it("should add todo to database successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
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
        //     expect(resGetBefore.body).toHaveLength(1);
        //     expect(resGetBefore.body).toHaveLength(0);
        //     expect(res.status).toBe(201);
        //     expect(res.body.todo).toContain(todoStub);
    }));
    it("should get completed todos", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/api/todo/completedTasks");
        //     expect(res.body.todos).not.toHaveLength(0);
    }));
    it("shouls get custom data todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const resAdd = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        const todoDateString = todoStub.dueDate;
        const getCustomDateres = yield (0, supertest_1.default)(app_1.app).get(`/api/customDateTodos?endDate${todoDateString + 2000}&startDate=${todoDateString}`);
        // expect(getCustomDateres.body.todos).not.toHaveLength(0);
    }));
    it("should update added todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const resAdd = yield (0, supertest_1.default)(app_1.app).post("/api/todo").send(todoStub);
        const resUpdate = yield (0, supertest_1.default)(app_1.app).patch(`/api/todo/${resAdd.body.todo._id}`);
        //     expect(resUpdate.status).toBe(201);
    }));
});
