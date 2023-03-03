import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    role: {
      default: "Buyer",
    },
    whatsapp: {
      type: Number,
    },
    following:{
        type:Schema.Types.ObjectId,
        ref:"Store"
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripe_session: {},
    // wishlist:{
    //          type:Schema.Types.ObjectId,
    //          ref:"Product",
    //      },
    cart: {
      type: Array,
      default: [],
    },
    address:{
        type:String,
    }
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
