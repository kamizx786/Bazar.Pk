import express from "express";
import {
  forgotComplete,
  allusers,
  RegisterSeller,
  Forgotpassword,
  GoogleSignin,
  GoogleSignup,
  login,
  Register,
  RegisterComplete,
  UpdateProfile,
  DeleteUser,
  becomeSeller,
  getAccountStatus,
} from "../controllers/user.controller";
import { isAdmin, requireSigin } from "../middleware/index.middleware";
const router = express.Router();
router.post("/register-seller", RegisterSeller);
router.post("/become-seller", requireSigin, becomeSeller);
router.post("/get-account-status", requireSigin, getAccountStatus);
router.post("/register", Register);
router.get("/users", requireSigin, isAdmin, allusers);
router.delete("/delete-users/:id", requireSigin, isAdmin, DeleteUser);
router.post("/login", login);
router.post("/google-signup", GoogleSignup);
router.post("/google-signin", GoogleSignin);
router.put("/forgot", Forgotpassword);
router.put("/forgot/complete", forgotComplete);
router.put("/register/complete", RegisterComplete);
router.put("/profile-update", requireSigin, UpdateProfile);
module.exports = router;
