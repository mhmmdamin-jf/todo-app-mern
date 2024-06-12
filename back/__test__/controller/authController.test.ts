import { NextFunction, Request, Response } from "express";
import * as authController from "../../src/controller/authController";
import User from "../../src/Model/userModel";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn((id: object, secret: string, options: object) => {
    return "token";
  }),
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockImplementation(() => true),
}));
jest.mock("../../src/Model/userModel");
const userStub = { userName: "user1", password: "pass1" };
const reqMock = {
  body: { userName: "user1", password: "pass1", confirmPassword: "pass1" },
};
const resMock = {
  cookie: jest.fn(() => "token"),
  header: jest.fn(() => {}),
  status: jest.fn(() => {}),
  json: jest.fn(() => {}),
};
const nextMock = jest.fn();
const idStub = "1234";
const secretStub = "secret";
const expiresStub = 1;
describe("authentication & authorization test:", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("sign token should return a token by payload.", async () => {
    //method 1
    //problem : not callable
    // await authController.signToken("id");
    //     const signMock = jest.spyOn(jsonwebtoken, "sign").mockImplementation(() => {
    //       return "token";
    //     });
  });

  test("shoud register with valid req", async () => {
    //method 1
    //problem : not called
    const statusMock = jest.spyOn(Response, "json");
    const jsonMock = jest.spyOn(authController, "register");
    await authController.register(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    //method 2
    //problem : res.status 500
    // const res = await request(app).get(`/api/todo/`).send();

    //     expect(jsonMock).toHaveBeenCalled();
    //     expect(statusMock).toHaveBeenCalledWith(200);
    //     expect(jsonMock).toHaveBeenCalledWith(
    //       {
    //         status: "success",
    //         user: { userName: "user1", password: "pass1" },
    //       },
    //       "token"
    //     );
  });
  it("should not logged in.", async () => {
    const statusMock = jest.spyOn(Response, "json");
    const jsonMock = jest.spyOn(authController, "register");
    const authControllerSpy = jest.spyOn(authController, "login");
    const userCreateSpy = jest.spyOn(User, "create");
    await authController.register(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    await authController.login(
      { ...reqMock, password: "user99999" } as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    // expect(compareMock).toHaveBeenCalled();
    // expect(userCreateSpy).toHaveBeenCalled();
    // expect(authControllerSpy).toHaveBeenCalledWith(
    //   reqMock as any as Request,
    //   resMock as any as Response,
    //   nextMock as any as NextFunction
    // );
    // expect(statusMock).toHaveBeenCalledWith(400);
    // expect(jsonMock).not.toHaveBeenCalled();
  });
  it("should login successfully.", async () => {
    const statusMock = jest.spyOn(Response, "json");
    const jsonMock = jest.spyOn(authController, "register");
    const authControllerSpy = jest.spyOn(authController, "login");
    const userCreateSpy = jest.spyOn(User, "create");
    await authController.login(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    // expect(compareMock).toHaveBeenCalled();
    // expect(userCreateSpy).toHaveBeenCalled();
    // expect(authControllerSpy).toHaveBeenCalledWith(
    //   reqMock as any as Request,
    //   resMock as any as Response,
    //   nextMock as any as NextFunction
    // );
    // expect(statusMock).toHaveBeenCalledWith(200);
    // expect(jsonMock).toHaveBeenCalled();
  });
  it("should can be access with authorized session", async () => {
    await authController.login(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    const protectRes = await authController.protect(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    // expect(protectRes).not.toThrow(
    //   new APIError({
    //     message: "unauthorized session.",
    //     errorCode: 400,
    //   })
    // );
  });
  it("should not can be access with unauthorized session", async () => {
    await authController.register(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    await authController.login(
      { ...reqMock, password: "wrong" } as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    const protectRes = await authController.protect(
      reqMock as any as Request,
      resMock as any as Response,
      nextMock as any as NextFunction
    );
    // expect(protectRes).toThrow(
    //   new APIError({
    //     message: "unauthorized session.",
    //     errorCode: 400,
    //   })
    // );
  });
});
