import admin from "firebase-admin";
import Store from "../models/store";
import User from "../models/user"
import { expressjwt } from "express-jwt";
const jwt=require("jsonwebtoken")
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

// // export const verifyToken = (req, res, next) => {
// //   const authHeader = req.headers.authorization;
// //   if (authHeader) {
// //     const token = authHeader.split(' ')[1];
// //     console.log(token);
// //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //       if (err) {
// //         return res.sendStatus(403);
// //       }
// //       next();
// //     });
// //   } else {
// //     res.sendStatus(401);
// //   }
// // };

export const requireSigin=expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
})


export const isAdmin=async(req,res,next)=>{
    try{
        const user=await User.findById(req.auth._id);
        if(user.role!=="Admin"){
            return res.json({
                error:"UnAuthorized Admin"
            })
        }else{
            next();
        }
    }catch(error){
    console.log("Admin Authentication Error");
    return res.json({
        error:"Admin Authentication Error"
    });
    }
}

export const isSeller=async(req,res,next)=>{
    try{
        const user=await User.findById(req.auth._id);
        if(user.role!=="Seller"){
            return res.json({
                error:"UnAuthorized "
            })
        }else{
            next();
        }
    }catch(error){
    return res.json({
        error:"Seller Authentication Error"
    });
    }
}
export const EditDeleteStore=async(req,res,next)=>{
   
    try{
        const store=await Store.findById(req.params._id);
        if(store.user!= req.auth._id){
            return res.json({
                error:"You are Not allowed to Delete"
            });
        }
        else{
            next();
        }
    
    }catch(error){
        res.json({error:"Unauthorized Error"});
    }
    }