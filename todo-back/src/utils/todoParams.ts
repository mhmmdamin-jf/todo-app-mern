import mongoose from "mongoose";

interface todoProps {
  query: any;
  queryString: any;
  // mongoose.Model<{
  //   dueDate: number[];
  //   title?: string | null | undefined;
  //   description?: string | null | undefined;
  //   isImportant?: boolean | null | undefined;
  //   isCompleted?: boolean | null | undefined;
  // }>;
}
class Todo {
  queryString: any;
  //  mongoose.Model<{
  //   dueDate: number[];
  //   title?: string | null | undefined;
  //   description?: string | null | undefined;
  //   isImportant?: boolean | null | undefined;
  //   isCompleted?: boolean | null | undefined;
  // }>;
  query: any;
  excludeFields: string[];
  constructor({ query, queryString }: todoProps) {
    this.query = query;
    this.queryString = queryString;
    this.excludeFields = ["sort"];
  }
  sort() {
    // this.queryString = this.queryString.sort
    //   ? String(this.query.sort)
    //       .split(",")
    //       .map((sortItem) => `-${sortItem}`)
    //       .join(" ")
    //   : "-dueDate";
    return this;
  }
  filterQuery() {
    const filteredQuery = this.excludeFields.map(
      (param) => (this.query[param] = undefined)
    );
    return filteredQuery;
  }
  filter() {
    const filteredQuery = this.filterQuery();
    this.queryString = this.queryString + this.queryString.find(filteredQuery);
    return this;
  }
}

export default Todo;
