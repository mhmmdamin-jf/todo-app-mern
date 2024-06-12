import { NextFunction, Request, Response } from "express";

/**
 * function for adding catching errors and wrapp
 * @param {Function} fn
 * @returns {Function} wrapped function
 */
export const catchAsync =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void | any>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch();
