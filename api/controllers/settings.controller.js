import Settings from "../models/settings";
export const createandupdate=async(req,res)=>{
 try{
      const data=req.body.values;
      const settings=await Settings.findByIdAndUpdate(req.params._id,data,{
        new:true,
      })
     return res.json({
        settings
     });
 }
 catch(error){
   return res.json({
    error:"Create and update Failed"
   });
 }
}
export const SiteSettings = async (req, res) => {
    try {
      const getSetting = await Settings.find();
      const setting=getSetting[0];
      return res.json({
       setting
      });
    } catch (error) {
      res.json({
        error: "Get Settings Error",
      });
    }
  };