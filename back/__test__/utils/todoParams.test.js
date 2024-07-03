"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoModel_1 = require("../../src/Model/todoModel");
const todoParams_1 = __importDefault(require("../../src/utils/todoParams"));
const stubTodo = {
    query: { title: "one", sort: "price" },
    queryString: todoModel_1.todo.find(),
};
describe("todoParams test", () => {
    let sut;
    beforeEach(() => {
        sut = new todoParams_1.default(stubTodo);
        jest.clearAllMocks();
    });
    const filterQuerySpy = jest.spyOn(todoParams_1.default.prototype, "filterQuery");
    const filterSpy = jest.spyOn(todoParams_1.default.prototype, "filterQuery");
    test("should filter query.", () => {
        sut.filterQuery();
        //     expect(sut.filter.sort).toBeUndefined();
    });
    test("should return this and set the query string", () => {
        sut.filter();
        //     expect(filterSpy).toHaveReturned();
        //     expect(filterQuerySpy).toHaveBeenCalledTimes(1);
    });
});
