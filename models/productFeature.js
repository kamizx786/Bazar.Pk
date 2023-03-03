import mongoose from "mongoose";
const { Schema } = mongoose;

const productFeatureSchema = new Schema(
  {
    fieldValue: {
      type:{},
    },
    Product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    Field: {
      type: Schema.Types.ObjectId,
      ref: "Field",
    },

  },
  { timestamps: true }
);
export default mongoose.model("ProductFeature", productFeatureSchema);
