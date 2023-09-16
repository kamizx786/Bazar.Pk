import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    Product: [{
      Product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      count:Number,
      price:Number,
    }],
    cartTotal:Number,
    orderBy:{
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  },
  { timestamps: true }
);
export default mongoose.model("Cart", cartSchema);
