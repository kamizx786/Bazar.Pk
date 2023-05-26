import express from "express"
import { ContactList, create} from "../controllers/contact";
import { isAdmin, requireSigin } from "../middleware";
const router=express.Router();
router.post("/contact/message",create);
router.get("/contacts",requireSigin,isAdmin,ContactList);
module.exports=router;