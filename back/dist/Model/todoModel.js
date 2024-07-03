"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = exports.todoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @class todoSchema
 * @type {mongoose.Schema}
 */
exports.todoSchema = new mongoose_1.default.Schema({
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
        type: [Date],
    },
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "user",
        require: [true, "user is not selected."],
    },
    category: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "category",
        require: [true, "category is not selected."],
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
exports.todo = mongoose_1.default.model("Todo", exports.todoSchema);
