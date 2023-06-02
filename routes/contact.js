import express from "express"
import { ContactList, create,DeleteContact} from "../controllers/contact";
import { isAdmin, requireSigin } from "../middleware";
const router=express.Router();
router.post("/contact/message",create);
router.get("/contacts",requireSigin,isAdmin,ContactList);
router.delete("/delete-contact",requireSigin,isAdmin,DeleteContact);
module.exports=router;