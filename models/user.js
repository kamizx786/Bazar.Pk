import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image:{
      url:String,
      public_id:String
  },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Confirmed",
    },
    role: {
      type: String,
      default: "Buyer",
    },
    secret: {
      type: String,
    },
    whatsapp: {
      type: Number,
    },

    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
