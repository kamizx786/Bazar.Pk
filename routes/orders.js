import express from "express"
import { create,orders,Sellerorders,Stripecreate} from "../controllers/orders";
import { isSeller,EditDeleteProduct, requireSigin, isAdmin } from "../middleware";
const router=express.Router();

router.post("/order/create",requireSigin,create);
router.post("/order/stripe-create",requireSigin,Stripecreate);
router.get("/orders",requireSigin,orders);
router.get("/sellerOrders",requireSigin,Sellerorders)
// router.put("/product/update/:slug",requireSigin,isSeller,EditDeleteProduct,update);
// router.post("/product/delete/:slug",requireSigin,isSeller,EditDeleteProduct,deleteproduct);
// router.get("/product/seller-products",requireSigin,isSeller,SellerProducts);
// router.get("/product/AllProducts",requireSigin,isAdmin,AllProducts);
// router.get("/product/SingleProduct/:slug",SingleCategory);
module.exports=router;