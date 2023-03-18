import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    Product: [{
      Product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      count:Number,
    }],
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    paymentIntent:{},
    orderStatus:{
      type:String,
      default:"Not Processed",  
    },
    orderBy:{
      type: Schema.Types.ObjectId,
      ref:"User"
    }
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
