import { todo } from "../../src/Model/todoModel";
import Todo from "../../src/utils/todoParams";
const stubTodo = {
  query: { title: "one", sort: "price" },
  queryString: todo.find(),
};
describe("todoParams test", () => {
  let sut: Todo;
  beforeEach(() => {
    sut = new Todo(stubTodo);
    jest.clearAllMocks();
  });

  test("should filter query.", () => {
    sut.filterQuery();
    //     expect(sut.filter.sort).toBeUndefined();
  });
  test("should return this and set the query string", () => {
    const queryStringBefore = sut.queryString;
    sut.filter();
    const queryStringAfter = sut.queryString;
    // expect(queryStringAfter).not.toEqual(queryStringBefore)
  });
});
