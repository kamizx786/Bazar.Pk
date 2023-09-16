import express from "express";
import {
  SiteSettings,
  createandupdate,
} from "../controllers/settings.controller";
import { isAdmin, requireSigin } from "../middleware/index.middleware";
const router = express.Router();

router.put("/updateSettings/:_id", requireSigin, isAdmin, createandupdate);
router.get("/siteSettings", SiteSettings);

module.exports = router;
