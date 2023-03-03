import mongoose from "mongoose";
const { Schema } = mongoose;

const fieldSchema = new Schema(
  {
    Fieldname: {
      type: String,
      required: true,
      trim: true,
    },
    Category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  
  { timestamps: true }
);
export default mongoose.model("Field", fieldSchema);
