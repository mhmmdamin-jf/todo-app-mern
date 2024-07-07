"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor({ query, queryString }) {
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
        this.excludeFields.filter((param) => !this.excludeFields.includes(this.query[param]));
        return this.query;
    }
    filter() {
        const filteredQuery = this.filterQuery();
        this.queryString = this.queryString.find(filteredQuery);
        return this;
    }
}
exports.default = Todo;
