import express from "express";
import {
  create,
  update,
  deleteproduct,
  SellerProducts,
  AllProducts,
  ProductRating,
} from "../controllers/product.controller";

import {
  isSeller,
  EditDeleteProduct,
  requireSigin,
  isAdmin,
} from "../middleware/index.middleware";
const router = express.Router();

router.post("/product/create", requireSigin, isSeller, create);
router.put("/product/rating/:slug", requireSigin, ProductRating);
router.put(
  "/product/update/:slug",
  requireSigin,
  isSeller,
  EditDeleteProduct,
  update
);
router.post(
  "/product/delete/:slug",
  requireSigin,
  isSeller,
  EditDeleteProduct,
  deleteproduct
);
router.get("/product/seller-products", requireSigin, isSeller, SellerProducts);
router.get("/product/AllProducts", requireSigin, isAdmin, AllProducts);
router.get("/allProducts", AllProducts);
// router.get("/product/SingleProduct/:slug",SingleCategory);
module.exports = router;
