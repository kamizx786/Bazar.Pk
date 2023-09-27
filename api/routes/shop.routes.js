import express from "express";
import {
  create,
  AllShops,
  SellerShops,
  update,
  Delete,
  ApproveShop,
  DisApproveShop,
  Shops,
  findStoresWithinRadius,
} from "../controllers/shop.controller";
import {
  isSeller,
  EditDeleteStore,
  isAdmin,
  requireSigin,
} from "../middleware/index.middleware";
const router = express.Router();
router.put("/shop/approve/:_id", requireSigin, isAdmin, ApproveShop);
router.put("/shop/disapprove/:_id", requireSigin, isAdmin, DisApproveShop);
router.post("/shop/create", requireSigin, isSeller, create);
router.put(
  "/shop/update/:_id",
  requireSigin,
  isSeller,
  EditDeleteStore,
  update
);
router.delete(
  "/shop/delete/:_id",
  requireSigin,
  isSeller,
  EditDeleteStore,
  Delete
);
router.delete("/admin-shop-delete/delete/:_id", requireSigin, isAdmin, Delete);
router.get("/shop/AllShops", AllShops);
router.get("/shop/Shops", Shops);
router.get("/shop/findNearby", findStoresWithinRadius);
router.get("/shop/SellerShops", requireSigin, isSeller, SellerShops);

module.exports = router;
