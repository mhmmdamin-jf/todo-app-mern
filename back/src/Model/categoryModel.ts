import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true],
  },
  href: {
    type: String,
    require: [true],
  },
});

export const categoryModel = mongoose.model("category", categorySchema);
