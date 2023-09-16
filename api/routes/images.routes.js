import express from "express";
import { handleimage } from "../controllers/imageUpload";
import { requireSigin } from "../middleware";
import formidable from "express-formidable";
const router = express.Router();

router.post(
  "/image/upload",
  requireSigin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  handleimage
);
module.exports = router;
