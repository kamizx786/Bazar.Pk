import Category from "../models/category";
import slugify from "slugify";
export const create=async(req,res)=>{
 try{
      const {name}=req.body;
      const category=await new Category({name,slug:slugify(name)}).save();
      res.json(category);
 }
 catch(error){
    console.log("Create",Error);
   res.status(400).send("Create Category Failed");
 }
}
export const update=async(req,res)=>{
    try{
        const {name}=req.body;
        const category=await  Category.findOneAndUpdate({slug:req.params.slug},
            {name,slug:slugify(name)},{
            new:true,
        });
        res.json(category);
   }
   catch(error){
      console.log("Create",Error);
      res.status(400).send("Update Category Failed");
   }
}
export const deletecategory=async(req,res)=>{
    try{
        await  Category.findOneAndDelete({slug:req.params.slug});
        res.json({
            data:"Category Deleted"
        });
   }
   catch(error){
      console.log("Create",Error);
      res.status(400).send("Delete Category Failed");
   }
}
export const AllCategories=async(req,res)=>{
    try{
       const category= await  Category.find().sort({createdAt:-1});
        res.json(category);
   }
   catch(error){
    res.status(400).send("Fetch Category Failed");
   }
}
export const SingleCategory=async(req,res)=>{
    try{
        const category= await  Category.findOne({slug:req.params.slug});
        if(category){
            res.json(category);
        }
        else{
            res.json({
                data:"Not Found"
            })
        }
    }
    catch(error){
        res.status(400).send("Create Category Failed");
    }
}