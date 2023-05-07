import Store from "../models/store"
import slugify from "slugify";
export const create=async(req,res)=>{
 try{
      const {values}=req.body;
      const slug=slugify(values.Storename);
      const store=await  Store.findOne({slug});
     if(store) return res.json({error:"Store Already Exist"});
      values.slug=slug;
      values.user=req.auth._id;
    const data=await new Store(values).save();
     return res.json({
        ok:true
     });
 }
 catch(error){
   return res.json({
    error:"Create Store Failed"
   });
 }
}
// export const update=async(req,res)=>{
//     try{
//         const {values}=req.body;
//         const slug=slugify(values.name);
//         values.slug=slug;
//         const category=await  Category.findOneAndUpdate({slug:req.params.slug},values,{
//             new:true,
//         });
//        return res.json({
//         ok:true
//        });
//    }
//    catch(error){
//       res.json({
//         error:"Update Category Failed"
//       });
//    }
// }
// export const deletecategory=async(req,res)=>{
//     try{
//         await  Category.findOneAndDelete({slug:req.params.slug});
//         return res.json({
//            ok:true
//         });
//    }
//    catch(error){
//     return  res.json({
//         error:"Delete Failed"
//     });
//    }
// }
export const AllShops=async(req,res)=>{
    try{
       const shops= await  Store.find().sort({createdAt:-1});
       return res.json({
            shops
        });
   }
   catch(error){
    res.json({
        error:"Fetch Store Failed"
    });
   }
}
// export const SingleCategory=async(req,res)=>{
//     try{
//         const category= await  Category.findOne({slug:req.params.slug});
//         if(category){
//            return res.json({category});
//         }
//         else{
//            return res.json({
//                 error:"Not Found"
//             })
//         }
//     }
//     catch(error){
//         res.json({
//             error:"Create Category Failed"
//         });
//     }
// }