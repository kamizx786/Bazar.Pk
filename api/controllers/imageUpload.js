import cloudinary from "cloudinary";
export const handleimage=async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.files.image.path);
    
        return res.json({
            url:result.url,
            public_id:result.public_id,
        });
    
    }catch(err)
    {
        console.log(err);
        return res.json({
            error:"Image Upload Error"
        })
    }
}