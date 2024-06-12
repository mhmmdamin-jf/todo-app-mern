import { NextFunction } from "express";
import mongoose from "mongoose";

/**
 * @class todoSchema
 * @type {mongoose.Schema}
 */
const todoSchema = new mongoose.Schema({
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
    type: [Number],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: [true, "user is not selected."],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    default: "today",
  },
});

/**
 * pre find middleware for adding some queries to current find query
 * @property {queryMiddlewar}
 */
// todoSchema.pre(/^find/, function (next: NextFunction) {
//   this.populate({
//     path: "user",
//     select: "name",
//   });
//   next();
// });

export const todo = mongoose.model("Todo", todoSchema);
