import mongoose from "mongoose";
const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    Storename: {
      type: String,
      trim: true,
    },
    slug:{
      type: String,
      unique:true,
      trim:true,
      lowercase:true,
    },
    description: {
      type: String,
    },
    main_pic: {
      url: String,
      public_id:String,
    },
    cover_pic: {
      url: String,
      public_id:String,
    },
    Storewhatsapp: {
      type: Number,
    },
    Streetaddress: {
      type: String,
    },
   Country: {
      type: String,
    },
   City: {
      type: String,
    },
    location: {
        lng:"",
        lat:""
    },
    mapAddress:{
      type:String,
    },
    category:{
            type:Schema.Types.ObjectId,
             ref:"Category"
         },
    user:{
            type:Schema.Types.ObjectId,
             ref:"User"
         },
     facebook:{
      type:String
     },
     insta:{
      type:String
     },
    review:[
        {
            type:Schema.Types.ObjectId,
              ref:"User"
        }
    ],
    status:{
      type:String,
      default:"InActive",
    }
  },
  { timestamps: true }
);
export default mongoose.model("Store", storeSchema);
