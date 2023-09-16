import express from "express"
import { create,update,deletecategory,
    AllCategories,SingleCategory } from "../controllers/Category";
import { isAdmin, requireSigin } from "../middleware";
const router=express.Router();

router.post("/category/create",requireSigin,isAdmin,create);
router.put("/category/update/:slug",requireSigin,isAdmin,update);
router.delete("/category/delete/:slug",requireSigin,isAdmin,deletecategory);
router.get("/category/AllCategories",AllCategories);
router.get("/category/SingleCategory/:slug",SingleCategory);
module.exports=router;