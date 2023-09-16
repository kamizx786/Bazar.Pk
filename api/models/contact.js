import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Contact", contactSchema);
