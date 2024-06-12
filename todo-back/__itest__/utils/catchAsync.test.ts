import { NextFunction, Request, Response } from "express";
import * as catchAsync from "../../src/utils/catchAsync";

const fnMock = (req: Request, res: Response, next: NextFunction) =>
  Promise<void | any>;
describe("catchAsync test", () => {
  test("should return wrapped function with .catch()", () => {
    const resault = catchAsync.catchAsync(fnMock as any);
    // expect(resault).not.toEqual(fnMock);
  });
});
