import express from "express"
import { create,update,deleteproduct,
    SellerProducts,AllProducts} from "../controllers/product";
import { isSeller,EditDeleteProduct, requireSigin, isAdmin } from "../middleware";
const router=express.Router();

router.post("/product/create",requireSigin,isSeller,create);
router.put("/product/update/:slug",requireSigin,isSeller,EditDeleteProduct,update);
router.post("/product/delete/:slug",requireSigin,isSeller,EditDeleteProduct,deleteproduct);
router.get("/product/seller-products",requireSigin,isSeller,SellerProducts);
router.get("/product/AllProducts",requireSigin,isAdmin,AllProducts);
// router.get("/product/SingleProduct/:slug",SingleCategory);
module.exports=router;