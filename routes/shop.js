import express from "express"
import { create,AllShops} from "../controllers/shop";
import { isSeller, requireSigin } from "../middleware";
const router=express.Router();

router.post("/shop/create",requireSigin,isSeller,create);
// router.put("/category/update/:slug",requireSigin,isAdmin,update);
// router.delete("/category/delete/:slug",requireSigin,isAdmin,deletecategory);
router.get("/shop/AllShops",AllShops);
// router.get("/category/SingleCategory/:slug",SingleCategory);
module.exports=router;