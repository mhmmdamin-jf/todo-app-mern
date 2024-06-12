"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const categoryModel_1 = require("../Model/categoryModel");
const factoryFn_1 = require("./factoryFn");
exports.getCategories = (0, factoryFn_1.getAll)(categoryModel_1.categoryModel);
