import { NextFunction, Request, Response, response } from "express";
import { catchAsync } from "../utils/catchAsync";
import APIError from "../utils/APIError";
import mongoose, { Model } from "mongoose";

/**
 * factory function for sending response with success status
 * @param {Response} res
 * @param {any} todoData
 * @param {number} code
 */
export const sendSuccessData = (
  res: Response,
  data: any,
  code?: typeof response.statusCode
) => {
  const resCode = code || 200;
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.status(resCode).json({
    status: "success",
    data,
  });
};

/**
 * factory async function for deleting a document
 * @param {Model} model
 * send response
 */
export const deleteOne = (model: typeof Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const deleteResault = await model.findOneAndDelete({
      name: req.query.name,
    });
    if (!deleteResault) {
      next(new APIError({ message: "cant find any doc.", errorCode: 404 }));
    }
    res.status(204).json({
      status: "success",
    });
  });

/**
 * factory async function for creating a document in model
 * @param {Model} model
 * sending response by resault
 */
export const addOne = (model: typeof Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("1");
      const doc = await model.create(req.body);
      console.log("2");
      console.log(doc);
      sendSuccessData(res, doc, 201);
    } catch (err) {
      console.log(err);
      next(new APIError({ message: "cannot insert doc.", errorCode: 400 }));
    }
  });

/**
 * async function for updating doc from model.
 * @param {Model} model
 * sending response by resault
 */
export const updateOne = (model: typeof Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const updatedDoc = await model.findByIdAndUpdate(
      req.body.id,
      req.body.data,
      { runValidators: true, new: true }
    );
    if (!updatedDoc) {
      next(new APIError({ message: "cant find any todo.", errorCode: 404 }));
    }
    res.status(201).json({
      status: "success",
      data: { updatedDoc },
    });
  });

export const getAll = (model: typeof mongoose.Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await model.find();
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  });

export const getOne = (model: typeof mongoose.Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await model.find({ title: { $eq: req.body.name } });
      res.status(200).json({
        data,
      });
    } catch (err) {
      next(err);
    }
  });
