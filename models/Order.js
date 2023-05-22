import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    Products: [{
      Product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      order_quantity:{
        type:Number
      },
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
    orderType:{
     type:String
    },
    orderBy:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    order_address:{
      type:String
    },
    paymentType:{
      type:String
    },
    orderContact:{
      type:Number
    }
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
