import express from "express";
const router = express.Router();
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
} from "../controllers/user";
router.post("/register-seller", RegisterSeller);
router.post("/register", Register);
router.get("/users", allusers);
router.post("/login", login);
router.post("/google-signup", GoogleSignup);
router.post("/google-signin", GoogleSignin);
router.put("/forgot", Forgotpassword);
router.put("/forgot/complete", forgotComplete);
router.put("/register/complete", RegisterComplete);

module.exports = router;
