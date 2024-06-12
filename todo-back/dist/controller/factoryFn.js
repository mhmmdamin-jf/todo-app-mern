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
exports.getOne = exports.getAll = exports.updateOne = exports.addOne = exports.deleteOne = exports.sendSuccessData = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const APIError_1 = __importDefault(require("../utils/APIError"));
const todoModel_1 = require("../Model/todoModel");
/**
 * factory function for sending response with success status
 * @param {Response} res
 * @param {any} todoData
 * @param {number} code
 */
const sendSuccessData = (res, data, code) => {
    const resCode = code || 200;
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(resCode).json({
        status: "success",
        data,
    });
};
exports.sendSuccessData = sendSuccessData;
/**
 * factory async function for deleting a document
 * @param {Model} model
 * send response
 */
const deleteOne = (model) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteResault = yield model.findOneAndDelete({
        name: req.query.name,
    });
    if (!deleteResault) {
        next(new APIError_1.default({ message: "cant find any doc.", errorCode: 404 }));
    }
    res.status(204).json({
        status: "success",
    });
}));
exports.deleteOne = deleteOne;
/**
 * factory async function for creating a document in model
 * @param {Model} model
 * sending response by resault
 */
const addOne = (model) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(model, req.body);
        const doc = yield todoModel_1.todo.create(req.body);
        (0, exports.sendSuccessData)(res, doc, 201);
    }
    catch (err) {
        console.log(err);
        next(new APIError_1.default({ message: "cannot insert doc.", errorCode: 400 }));
    }
}));
exports.addOne = addOne;
/**
 * async function for updating doc from model.
 * @param {Model} model
 * sending response by resault
 */
const updateOne = (model) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDoc = yield model.findByIdAndUpdate(req.body.id, req.body.data, { runValidators: true, new: true });
    if (!updatedDoc) {
        next(new APIError_1.default({ message: "cant find any todo.", errorCode: 404 }));
    }
    res.status(201).json({
        status: "success",
        data: { updatedDoc },
    });
}));
exports.updateOne = updateOne;
const getAll = (model) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model.find();
        res.status(200).json({
            data,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.getAll = getAll;
const getOne = (model) => (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield model.find({ title: { $eq: req.body.name } });
        res.status(200).json({
            data,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.getOne = getOne;
