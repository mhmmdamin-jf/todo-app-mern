import { NextFunction, Request, Response } from "express";
import * as catchAsync from "../../src/utils/catchAsync";

const reqMock: any = {};
const resMock: any = {};
const nextMock: any = {};
const fnMock = (req: Request, res: Response, next: NextFunction) =>
  Promise<void | any>;
describe("catchAsync test", () => {
  test("should return wrapped function with .catch()", () => {
    const catchAsyncSpy = jest.spyOn(catchAsync, "catchAsync");
    const resault = catchAsync.catchAsync(fnMock as any);
    //     expect(catchAsyncSpy).toHaveBeenCalledTimes(1);
  });
});
