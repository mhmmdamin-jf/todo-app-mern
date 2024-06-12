import { categoryModel } from "../Model/categoryModel";
import { getAll } from "./factoryFn";

export const getCategories = getAll(categoryModel);
