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
const todoModel_1 = require("../../src/Model/todoModel");
const userModel_1 = __importDefault(require("../../src/Model/userModel"));
const devData = __importStar(require("../../src/devData"));
const deleteAllDataMock = jest.spyOn(devData, "deleteAllData");
const importAllDataMock = jest.spyOn(devData, "importData");
jest.mock("../../src/Model/todoModel");
describe("import and export data test", () => {
    test("should delete all data from todos and users.", () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTodoSpy = jest.spyOn(todoModel_1.todo, "deleteMany");
        const deleteUserSpy = jest.spyOn(userModel_1.default, "deleteMany");
        // await devData.deleteAllData();
        //     expect(deleteTodoSpy).toHaveBeenCalledTimes(1);
        //     expect(deleteUserSpy).toHaveBeenCalledTimes(1);
        //     expect(deleteAllDataMock).not.toThrow();
    }));
    test("should import all data in todo and user db", () => __awaiter(void 0, void 0, void 0, function* () {
        const importTodoSpy = jest.spyOn(todoModel_1.todo, "create");
        const importUserSpy = jest.spyOn(userModel_1.default, "create");
        // await devData.importData();
        //     expect(importTodoSpy).toHaveBeenCalledTimes(1);
        //     expect(importUserSpy).toHaveBeenCalledTimes(1);
        //     expect(importData).not.toThrow();
    }));
    test("should delete and import data", () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleSpy = jest.spyOn(console, "log");
        // await devData.resetData();
        // expect(consoleSpy).toHaveBeenCalledTimes(3);
        // expect(consoleSpy).toHaveBeenLastCalledWith("all data restored.");
    }));
});
