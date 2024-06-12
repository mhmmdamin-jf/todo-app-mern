import { readFileSync } from "fs";
import { todo } from "../Model/todoModel";
import User from "../Model/userModel";
import APIError from "../utils/APIError";

const todos = JSON.parse(
  readFileSync(`${__dirname}/todos.json`, { encoding: "utf-8" })
);
const users = JSON.parse(
  readFileSync(`${__dirname}/users.json`, { encoding: "utf-8" })
);

/**
 * function for deleting all data from databases: todo , user and ...
 */
export const deleteAllData = async () => {
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
    await todo.create(todos);
    console.log("todos imported.");
  } catch (err) {
    throw new APIError({ message: "cannot import todo", errorCode: 400 });
  }
  try {
    await User.create(users);
    console.log("users imported.");
  } catch (err) {
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
