import express from "express"
import { Allorders, create,createPurchase,orders,Sellerorders,Stripecreate,update} from "../controllers/orders";
import { isSeller,EditDeleteProduct, requireSigin, isAdmin } from "../middleware";
const router=express.Router();

router.post("/order/create",requireSigin,create);
router.post("/order/create-purchase",requireSigin,createPurchase);
router.put("/order/update/:_id",requireSigin,isSeller,update);
router.put("/order/cancel/:_id",requireSigin,update);
router.post("/order/stripe-create",requireSigin,Stripecreate);
router.get("/orders",requireSigin,orders);
router.get("/allorders",requireSigin,isAdmin,Allorders);
router.get("/sellerOrders",requireSigin,Sellerorders)

module.exports=router;