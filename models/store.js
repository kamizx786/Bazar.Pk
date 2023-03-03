import mongoose from "mongoose";
const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    Storename: {
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
    main_pic: {
      url: String,
      publicId:String,
      required: true,
    },
    cover_pic: {
      url: String,
      publicId:String,
      required: true,
    },
    timings: {
      startTime: {
        value: Number,
        amorPm: String,
      },
      endTime: {
        value: Number,
        amorPm: String,
      },
    },
    Storewhatsapp: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    location: {
      type: "Point",
      GeolocationCoordinates: [],
    },
    // category:{
    //         type:Schema.Types.ObjectId,
    //          ref:"Category"
    //      },
    user:{
            type:Schema.Types.ObjectId,
             ref:"User"
         },
    follower:{
        type:Schema.Types.ObjectId,
              ref:"User"
    },
    sociallinks:[
            {
        facebook:"",
        insta:""
        }
        
    ],
    review:[
        {
            type:Schema.Types.ObjectId,
              ref:"User"
        }
    ]
  },
  { timestamps: true }
);
export default mongoose.model("Store", storeSchema);
