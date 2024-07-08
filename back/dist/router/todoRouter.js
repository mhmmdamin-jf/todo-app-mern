"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const todoController_1 = require("../controller/todoController");
const categoryController_1 = require("../controller/categoryController");
/**
 * @namespace todoRouter
 */
const todoRouter = (0, express_1.Router)();
/**
 * gettings all categories from db
 * @name getAllCategories
 * @function
 * @memberof todoRouter
 */
todoRouter.route("/categories").get(categoryController_1.getCategories);
/**
 * contolling session by server-side
 * @name protectSession
 * @function
 * @memberof todoRouter
 */
todoRouter.use(authController_1.protect, (0, authController_1.restrict)("user"));
/**
 * function for getting all todos in today
 * @name /todo/today
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all todos in today
 */
todoRouter.route("/today").get(todoController_1.getInDayTodos);
/**
 * function for getting all completed todos
 * @name /todo/completedTasks
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all completed todos
 */
todoRouter.route("/completedTasks").get(todoController_1.getCompletedTasks);
/**
 * function for getting all todos in custom date
 * @name /todo/customDateTodos
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all todos in custom date
 */
todoRouter.route("/customDateTodos").get(todoController_1.getCustomDateTodos);
/**
 * function for add todos or post a todo
 * @name /todo/
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} by resault
 */
todoRouter.route("/").post(todoController_1.attachCategory, todoController_1.addTodo).get(todoController_1.getAllTodos);
/**
 * function for delete or update todo or post a todo
 * @name /todo/:id
 * @function
 * @memberof todoRouter
 * @param {string} id
 * @returns {Array<object>} by resault
 */
todoRouter.route("/:id").delete(todoController_1.deleteTodo).patch(todoController_1.updateTodo);
exports.default = todoRouter;
