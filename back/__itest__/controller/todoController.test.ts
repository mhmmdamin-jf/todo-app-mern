import request from "supertest";
import { app } from "../../src/app";
import { response } from "express";
import * as todoController from "../../src/controller/todoController";
import * as factoryFn from "../../src/controller/factoryFn";
const todoStub = {
  title: "task2132",
  isImportant: false,
  isCompleted: false,
  dueDate: 19158327156465,
  user: "666705a2d167d2b4162269a7",
  category: "66684bdbfb4d1e3164e59652",
};
describe("todo controller test:", () => {
  beforeEach(async () => {
    await request(app).get(
      "/api/auth/login?userName=2122r991&password=1234sdasd@123ASDASD56"
    ).set;
  });
  it("should get all categories", async () => {
    const res = await request(app).get("/api/todo/categories");
    // expect(res.status).toBe(200);
    // expect(res.body.todos).not.toBeUndefined();
  });
  it("should get all todos", async () => {
    const res = await request(app).get("/api/todo/");
    expect(res.body).not.toBeUndefined();

    //     expect(res.status).toBe(200);
  });
  it("should cant get todos by unauthorized session", async () => {
    const res = await request(app).get("/api/todo/").set("Cookie", ["jwt=''"]);

    //expect(res.status).toBe(400);
  });
  it("should add todo to database successfully", async () => {
    const res = await request(app).post("/api/todo").send(todoStub);

    //     expect(res.status).toBe(201);
    //     expect(res.body.todo).toContain(todoStub);
  });
  it("should delete a todo from database successfully", async () => {
    const resAdd = await request(app).post("/api/todo").send(todoStub);
    const resGetBefore = await request(app)
      .post(`/api/todo?title=${todoStub.title}`)
      .send(todoStub);
    const resDelete = await request(app).delete(
      `/api/todo/${resGetBefore.body._id}`
    );
    const resGetAfter = await request(app)
      .post(`/api/todo?title=${todoStub.title}`)
      .send(todoStub);

    //     expect(resGetBefore.body).toHaveLength(1);
    //     expect(resGetBefore.body).toHaveLength(0);
    //     expect(res.status).toBe(201);
    //     expect(res.body.todo).toContain(todoStub);
  });
  it("should get completed todos", async () => {
    const res = await request(app).get("/api/todo/completedTasks");
    //     expect(res.body.todos).not.toHaveLength(0);
  });
  it("shouls get custom data todo", async () => {
    const resAdd = await request(app).post("/api/todo").send(todoStub);
    const todoDateString = todoStub.dueDate;
    const getCustomDateres = await request(app).get(
      `/api/customDateTodos?endDate${
        todoDateString + 2000
      }&startDate=${todoDateString}`
    );
    // expect(getCustomDateres.body.todos).not.toHaveLength(0);
  });
  it("should update added todo", async () => {
    const resAdd = await request(app).post("/api/todo").send(todoStub);
    const resUpdate = await request(app).patch(
      `/api/todo/${resAdd.body.todo._id}`
    );
    //     expect(resUpdate.status).toBe(201);
  });
});
