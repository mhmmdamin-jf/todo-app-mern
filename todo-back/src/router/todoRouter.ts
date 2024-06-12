import { Router } from "express";
import { protect, restrict } from "../controller/authController";

import {
  deleteTodo,
  getAllTodos,
  getCompletedTasks,
  getCustomDateTodos,
  getInDayTodos,
  updateTodo,
  addTodo,
} from "../controller/todoController";
import { getCategories } from "../controller/categoryController";

/**
 * @namespace todoRouter
 */
const todoRouter = Router();

/**
 * gettings all categories from db
 * @name getAllCategories
 * @function
 * @memberof todoRouter
 */
todoRouter.route("/categories").get(getCategories);

/**
 * contolling session by server-side
 * @name protectSession
 * @function
 * @memberof todoRouter
 */
todoRouter.use(protect, restrict("user"));

/**
 * function for getting all todos in today
 * @name /todo/today
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all todos in today
 */
todoRouter.route("/today").get(getInDayTodos);

/**
 * function for getting all completed todos
 * @name /todo/completedTasks
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all completed todos
 */
todoRouter.route("/completedTasks").get(getCompletedTasks);

/**
 * function for getting all todos in custom date
 * @name /todo/customDateTodos
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} all todos in custom date
 */
todoRouter.route("/customDateTodos").get(getCustomDateTodos);

/**
 * function for getting all todos or post a todo
 * @name /todo/
 * @function
 * @memberof todoRouter
 * @returns {Array<object>} by resault
 */
todoRouter.route("/").post(addTodo).get(getAllTodos);

/**
 * function for delete or update todo or post a todo
 * @name /todo/:id
 * @function
 * @memberof todoRouter
 * @param {string} id
 * @returns {Array<object>} by resault
 */
todoRouter.route("/:id").delete(deleteTodo).patch(updateTodo);

export default todoRouter;
