import express from "express"
import { ContactList, create,DeleteContact,SendReply} from "../controllers/contact";
import { isAdmin, requireSigin } from "../middleware";
const router=express.Router();
router.post("/contact/message",create);
router.post("/contact/reply",requireSigin,isAdmin,SendReply);
router.get("/contacts",requireSigin,isAdmin,ContactList);
router.delete("/delete-contact/:id",requireSigin,isAdmin,DeleteContact);
module.exports=router;