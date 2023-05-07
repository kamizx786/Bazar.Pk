import admin from "firebase-admin";
import User from "../models/user"
import { expressjwt } from "express-jwt";
// var serviceAccount=require("../firebaseAdmin/ServiceKey.json");

// admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount)
// })
// export const GoogleAuthCheck=async(req,res,next)=>{
//     try{
//     const firebaseuser=await admin.auth().verifyIdToken(req.headers.authcheck);
//      req.user=firebaseuser;
//      next();
//     }catch(error){
//     console.log("Google Auth Check Error");
//     return res.status(400).json({
//         error:"Invalid or Expired"
//     });
//     }
//     }

export const requireSigin=expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
})


export const isAdmin=async(req,res,next)=>{
    try{
        const user=await User.findById(req.auth._id);
        if(user.role!=="Admin"){
            return res.status(400).json({
                error:"UnAuthorized Admin"
            })
        }else{
            next();
        }
    }catch(error){
    console.log("Admin Authentication Error");
    return res.status(400).json({
        error:"Admin Authentication Error"
    });
    }
}

export const isSeller=async(req,res,next)=>{
    try{
        const user=await User.findById(req.auth._id);
        if(user.role!=="Seller"){
            return res.status(400).json({
                error:"UnAuthorized Seller"
            })
        }else{
            next();
        }
    }catch(error){
    console.log("Seller Authentication Error");
    return res.status(400).json({
        error:"Seller Authentication Error"
    });
    }
}