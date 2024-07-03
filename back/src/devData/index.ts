import { readFileSync } from "fs";
import { todo, todoSchema } from "../Model/todoModel";
import User from "../Model/userModel";
import APIError from "../utils/APIError";
import { hashPassword } from "../lib/bcrypt";
import mongoose from "mongoose";
import { categoryModel } from "../Model/categoryModel";
import { json } from "express";

const todos = JSON.parse(
  readFileSync(`${__dirname}/todos.json`, { encoding: "utf-8" })
) as [mongoose.Schema];
const users = JSON.parse(
  readFileSync(`${__dirname}/users.json`, { encoding: "utf-8" })
);
const categories = JSON.parse(
  readFileSync(`${__dirname}/categories.json`, { encoding: "utf-8" })
);

/**
 * function for deleting all data from databases: todo , user and ...
 */
export const deleteAllData = async () => {
  try {
    await categoryModel.deleteMany();
  } catch (err) {
    throw new APIError({ message: "cannot delete cateories.", errorCode: 400 });
  }
  try {
    await todo.deleteMany();
  } catch (err) {
    throw new APIError({ message: "canont delete todos.", errorCode: 400 });
  }
  try {
    await User.deleteMany();
  } catch (err) {
    throw new APIError({ message: "canont delete users.", errorCode: 400 });
  }
};

/**
 * function for importing all data from databases: todo , user and ...
 */
export const importData = async () => {
  try {
    await categoryModel.create(categories);
    console.log("categories imported.");
  } catch (err) {
    throw new APIError({
      message: "cannot import categories.",
      errorCode: 400,
    });
  }
  try {
    await User.create(users);
    console.log("users imported.");
  } catch (err) {
    throw new APIError({ message: "cannot import todo", errorCode: 400 });
  }
  try {
    const defaultUser = await User.create({
      userName: "defaultUser1",
      password: "user1Pass@",
      passwordChangedAt: Date.now(),
      role: "user",
    });
    const defaultUser1 = await User.create({
      userName: "defaultUser2",
      password: "user1Pass@",
      passwordChangedAt: Date.now(),
      role: "user",
    });
    const todayCategory = await todo.findOne({ title: "today" });
    const changedTodos = todos.map((todo, i) => {
      if (i % 2 == 0) {
        return {
          ...todo,
          user: defaultUser1._id,
          category: todayCategory?._id,
        };
      }
      return { ...todo, user: defaultUser._id, category: todayCategory?._id };
    });
    await todo.create(changedTodos);
    console.log("todos imported.");
  } catch (err) {
    console.log(err);
    throw new APIError({ message: "cannot import todo", errorCode: 400 });
  }
};

/**
 * function that reset all data to dummy data in database
 */
export const resetData = async () => {
  try {
    await deleteAllData();
    await importData();
    console.log("all data restored.");
  } catch (err) {
    throw new APIError({ message: "resetDate failed.", errorCode: 500 });
  }
};
