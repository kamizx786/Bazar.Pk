const mongoose = require("mongoose");
const { Schema } = mongoose;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    details: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", CategorySchema);
