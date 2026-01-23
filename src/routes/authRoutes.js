import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";

const router = Router();

//SignUp
router.post("/register", register);

//Login
router.post("/login", passport.authenticate("local"), login);

//Status
router.get("/status", authStatus);

//2FASetup
router.post("/2fa/setup", setup2FA);

//2FAVerify
router.post("/2fa/verify", verify2FA);

//reset 2fa
router.post("/2fa/reset", reset2FA);

//Logout
router.post("/logout", logout);

export default router;
