import { NextFunction } from "express";
import mongoose from "mongoose";
import { categoryModel } from "./categoryModel";

/**
 * @class todoSchema
 * @type {mongoose.Schema}
 */
export const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "title is required."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isImportant: {
    type: Boolean,
    require: [true, "isImportnat should be specified."],
  },
  isCompleted: {
    type: Boolean,
  },
  dueDate: {
    type: [Date],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: [true, "user is not selected."],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    require: [true, "category is not selected."],
  },
});

/**
 * pre find middleware for adding some queries to current find query
 * @property {queryMiddlewar}
 */
// todoSchema.pre(/^find/, async function (next: NextFunction) {
//   this.populate({
//     path: "user",
//     select: "name",
//   });
//   next();
// });

export const todo = mongoose.model("Todo", todoSchema);
