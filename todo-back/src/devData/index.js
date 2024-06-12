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
exports.resetData = exports.importData = exports.deleteAllData = void 0;
const fs_1 = require("fs");
const todoModel_1 = require("../Model/todoModel");
const userModel_1 = __importDefault(require("../Model/userModel"));
const APIError_1 = __importDefault(require("../utils/APIError"));
const todos = JSON.parse((0, fs_1.readFileSync)(`${__dirname}/todos.json`, { encoding: "utf-8" }));
const users = JSON.parse((0, fs_1.readFileSync)(`${__dirname}/users.json`, { encoding: "utf-8" }));
/**
 * function for deleting all data from databases: todo , user and ...
 */
const deleteAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoModel_1.todo.deleteMany();
    }
    catch (err) {
        throw new APIError_1.default({ message: "canont delete todos.", errorCode: 400 });
    }
    try {
        yield userModel_1.default.deleteMany();
    }
    catch (err) {
        throw new APIError_1.default({ message: "canont delete users.", errorCode: 400 });
    }
});
exports.deleteAllData = deleteAllData;
/**
 * function for importing all data from databases: todo , user and ...
 */
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoModel_1.todo.create(todos);
        console.log("todos imported.");
    }
    catch (err) {
        throw new APIError_1.default({ message: "cannot import todo", errorCode: 400 });
    }
    try {
        yield userModel_1.default.create(users);
        console.log("users imported.");
    }
    catch (err) {
        throw new APIError_1.default({ message: "cannot import todo", errorCode: 400 });
    }
});
exports.importData = importData;
/**
 * function that reset all data to dummy data in database
 */
const resetData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.deleteAllData)();
        yield (0, exports.importData)();
        console.log("all data restored.");
    }
    catch (err) {
        throw new APIError_1.default({ message: "resetDate failed.", errorCode: 500 });
    }
});
exports.resetData = resetData;
