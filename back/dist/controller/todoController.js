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
exports.getTodo = exports.updateTodo = exports.getCompletedTasks = exports.getCustomDateTodos = exports.deleteTodo = exports.getInDayTodos = exports.getAllTodos = exports.addTodo = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const todoModel_1 = require("../Model/todoModel");
const todoParams_1 = __importDefault(require("../utils/todoParams"));
const APIError_1 = __importDefault(require("../utils/APIError"));
const factoryFn_1 = require("../controller/factoryFn");
/**
 * async functino for adding new todo
 * @param {todo} todoFile
 */
exports.addTodo = (0, factoryFn_1.addOne)(todoModel_1.todo);
/**
 * async function for getting all todos by some filter and params in pathname
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
const getAllTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let todos = new todoParams_1.default({ query: req.query, queryString: todoModel_1.todo });
    todos = todos.filter().sort();
    const todoData = yield todoModel_1.todo
        .find({ user: { $eq: { _id: (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id } } })
        .populate({
        path: "user",
        select: "name",
    })
        .populate({
        path: "category",
        select: "name",
    });
    (0, factoryFn_1.sendSuccessData)(res, todoData);
});
exports.getAllTodos = getAllTodos;
/**
 * async function for getting today tasks
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
exports.getInDayTodos = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const todos = yield todoModel_1.todo.aggregate([
        {
            $unwind: "$dueDate",
        },
        {
            $match: {
                dueDate: {
                    $lte: Date.now() + Number(process.env.START_DATE_TO_TASK),
                    $gte: Date.now(),
                },
                user: { $eq: { _id: (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d._id } },
            },
        },
    ]);
    if (!todos) {
        next(new APIError_1.default({ message: "cant find any todo.", errorCode: 404 }));
    }
    console.log(todos);
    (0, factoryFn_1.sendSuccessData)(res, todos);
}));
/**
 * function for deleting a todo
 */
exports.deleteTodo = (0, factoryFn_1.deleteOne)(todoModel_1.todo);
/**
 * async function for getting all todos in a custom range of date
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
exports.getCustomDateTodos = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const startDate = new Date(req.query.startDate + process.env.START_DATE_TO_TASK);
    const endDate = new Date(req.query.endDate);
    const todos = yield todoModel_1.todo.aggregate([
        { $unwind: "$dueDate" },
        {
            $match: {
                dueDate: {
                    $lte: startDate,
                    $gte: endDate,
                },
                user: { $eq: { _id: (_f = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f._id } },
            },
        },
    ]);
    (0, factoryFn_1.sendSuccessData)(res, todos);
}));
/**
 * async function for getting all completed todos
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
exports.getCompletedTasks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    const todos = yield todoModel_1.todo.aggregate([
        {
            $match: {
                isCompleted: {
                    $eq: true,
                },
                user: { $eq: { _id: (_h = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h._id } },
            },
        },
    ]);
    (0, factoryFn_1.sendSuccessData)(res, todos);
}));
/**
 * function for updating todo from req.body
 * sends response by resault
 */
exports.updateTodo = (0, factoryFn_1.updateOne)(todoModel_1.todo);
exports.getTodo = (0, factoryFn_1.getOne)(todoModel_1.todo);
