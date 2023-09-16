import express from "express";
import { handleimage } from "../controllers/imageUpload.controller";
import formidable from "express-formidable";
import { requireSigin } from "../middleware/index.middleware";
const router = express.Router();

router.post(
  "/image/upload",
  requireSigin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  handleimage
);
module.exports = router;
