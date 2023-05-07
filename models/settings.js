import mongoose from "mongoose";
const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    image:{
      url:String,
      public_id:String
  },
    siteSubtitle: {
      type: String,
      required: true,
      trim: true,
  },
  siteTitle: {
    type: String,
    required: true,
    trim: true,
},
stripe_account_id: {
    type: String,
    required: true,
},
},
  { timestamps: true }
);
export default mongoose.model("Setting", settingSchema);
