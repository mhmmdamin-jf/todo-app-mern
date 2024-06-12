import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { todo } from "../Model/todoModel";
import Todo from "../utils/todoParams";
import APIError from "../utils/APIError";
import {
  addOne,
  deleteOne,
  getOne,
  sendSuccessData,
  updateOne,
} from "../controller/factoryFn";

/**
 * async functino for adding new todo
 * @param {todo} todoFile
 */
export const addTodo = addOne(todo);

/**
 * async function for getting all todos by some filter and params in pathname
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let todos = new Todo({ query: req.query, queryString: todo });
  todos = todos.filter().sort();
  const todoData = await todo
    .find()
    .populate({
      path: "user",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    });
  sendSuccessData(res, todoData);
};

/**
 * async function for getting today tasks
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
export const getInDayTodos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const todos = await todo.aggregate([
      {
        $unwind: "$dueDate",
      },
      {
        $match: {
          dueDate: {
            $lte: Date.now() + Number(process.env.START_DATE_TO_TASK),
            $gte: Date.now(),
          },
        },
      },
    ]);
    if (!todos) {
      next(new APIError({ message: "cant find any todo.", errorCode: 404 }));
    }
    sendSuccessData(res, todos);
  }
);

/**
 * function for deleting a todo
 */
export const deleteTodo = deleteOne(todo);

/**
 * async function for getting all todos in a custom range of date
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
export const getCustomDateTodos = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const startDate = new Date(
      (req.query.startDate as string) + process.env.START_DATE_TO_TASK
    );
    const endDate = new Date(req.query.endDate as string);
    const todos = await todo.aggregate([
      { $unwind: "$dueDate" },
      {
        $match: {
          dueDate: {
            $lte: startDate,
            $gte: endDate,
          },
        },
      },
    ]);

    sendSuccessData(res, todos);
  }
);

/**
 * async function for getting all completed todos
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * sending response by resault and code
 */
export const getCompletedTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const todos = await todo.aggregate([
      {
        $match: {
          isCompleted: {
            $eq: true,
          },
        },
      },
    ]);
    sendSuccessData(res, todos);
  }
);

/**
 * function for updating todo from req.body
 * sends response by resault
 */
export const updateTodo = updateOne(todo);

export const getTodo = getOne(todo);
