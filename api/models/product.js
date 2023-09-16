import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    discription: {
      type: String,
      required: true,
      trim: true,
      
    },
    gallery_pics: [
      {
        url: String,
        publicId: String,
      },
    ],
    feature_pic: {
        url: String,
        publicId: String,
      },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
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
      default:"0"
    },
    unit:{
      type:String,
    },
    rating: [
      {
        star: Number,
        review:String,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
