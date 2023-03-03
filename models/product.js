import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    discription: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Too Short"],
      maxlength: [2000, "Too Long"],
    },
    pic: [
      {
        url: String,
        publicId: String,
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    rating: [
      {
        star: Number,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    salePrice: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
