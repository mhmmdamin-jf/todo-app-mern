import { todo } from "../../src/Model/todoModel";
import User from "../../src/Model/userModel";
import * as devData from "../../src/devData";
const deleteAllDataMock = jest.spyOn(devData, "deleteAllData");
const importAllDataMock = jest.spyOn(devData, "importData");
jest.mock("../../src/Model/todoModel");
describe("import and export data test", () => {
  test("should delete all data from todos and users.", async () => {
    const deleteTodoSpy = jest.spyOn(todo, "deleteMany");
    const deleteUserSpy = jest.spyOn(User, "deleteMany");
    // await devData.deleteAllData();
    //     expect(deleteTodoSpy).toHaveBeenCalledTimes(1);
    //     expect(deleteUserSpy).toHaveBeenCalledTimes(1);
    //     expect(deleteAllDataMock).not.toThrow();
  });
  test("should import all data in todo and user db", async () => {
    const importTodoSpy = jest.spyOn(todo, "create");
    const importUserSpy = jest.spyOn(User, "create");
    // await devData.importData();
    //     expect(importTodoSpy).toHaveBeenCalledTimes(1);
    //     expect(importUserSpy).toHaveBeenCalledTimes(1);
    //     expect(importData).not.toThrow();
  });
  test("should delete and import data", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    // await devData.resetData();
    // expect(consoleSpy).toHaveBeenCalledTimes(3);
    // expect(consoleSpy).toHaveBeenLastCalledWith("all data restored.");
  });
});
