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
const userStub = { userName: "user1", password: "pass1" };
const todoStub = {
    title: "task2132",
    isImportant: false,
    isCompleted: false,
    dueDate: 19158327156465,
    user: "666705a2d167d2b4162269a7",
    category: "66684bdbfb4d1e3164e59652",
};
describe("import and export data test", () => {
    test("should delete all data from todos and users.", () => __awaiter(void 0, void 0, void 0, function* () {
        // const registerRes = await (
        //   await request(app).post("/api/auth")
        // ).body(userStub);
        // const res = await request(app).post("/api/todo").send(todoStub);
        // const allTodosBeforeRes = await request(app).get("/api/todo");
        // // await devData.deleteAllData();
        // const allTodosAfterRes = await request(app).get("/api/todo");
        // expect(allTodosAfterRes.body.todos).toHaveLength(0);
        // expect(allTodosAfterRes.body.todos).not.toEqual(
        //   allTodosBeforeRes.body.todos
    }));
    test("should import all data in todo and user db", () => __awaiter(void 0, void 0, void 0, function* () {
        // await devData.importData();
        //     expect(importData).not.toThrow();
    }));
    test("should delete and import data", () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleSpy = jest.spyOn(console, "log");
        // await devData.resetData();
        // expect(consoleSpy).toHaveBeenCalledTimes(3);
        // expect(consoleSpy).toHaveBeenLastCalledWith("all data restored.");
    }));
});
