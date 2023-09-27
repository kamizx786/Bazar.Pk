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
import { validateInput } from "../middleware/validateInput.middleware";
import {
  loginValidation,
  registerValidation,
} from "../validators/user.validator";

const router = express.Router();

router.post(
  "/register-seller",
  validateInput(registerValidation, "BODY"),
  RegisterSeller
);
router.post("/become-seller", requireSigin, becomeSeller);
router.post("/get-account-status", requireSigin, getAccountStatus);
router.post("/register", validateInput(registerValidation, "BODY"), Register);
router.get("/users", requireSigin, isAdmin, allusers);
router.delete("/delete-users/:id", requireSigin, isAdmin, DeleteUser);
router.post("/login", validateInput(loginValidation, "BODY"), login);
router.put("/forgot", Forgotpassword);
router.put("/forgot/complete", forgotComplete);
router.put("/register/complete", RegisterComplete);
router.put("/profile-update", requireSigin, UpdateProfile);
module.exports = router;
