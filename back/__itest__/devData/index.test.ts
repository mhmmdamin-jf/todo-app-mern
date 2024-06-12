import { todo } from "../../src/Model/todoModel";
import User from "../../src/Model/userModel";
import { app } from "../../src/app";
import * as devData from "../../src/devData";
import request from "supertest";

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
  test("should delete all data from todos and users.", async () => {
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
  });

  test("should import all data in todo and user db", async () => {
    // await devData.importData();
    //     expect(importData).not.toThrow();
  });
  test("should delete and import data", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    // await devData.resetData();
    // expect(consoleSpy).toHaveBeenCalledTimes(3);
    // expect(consoleSpy).toHaveBeenLastCalledWith("all data restored.");
  });
});
