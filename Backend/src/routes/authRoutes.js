import { Router } from "express";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
  forgotPassword,
  resetPassword,
  verifyLoginOTP,
  verifyRegistrationOTP,
  verifyLoginMFA
} from "../controllers/authController.js";

const router = Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

// Registration
router.post("/register", register);
router.post("/register/verify-otp", verifyRegistrationOTP);

// Login
router.post("/login", login);
router.post("/login/verify-otp", verifyLoginOTP);

//Status
router.get("/status", authStatus);

//MFA
router.post("/2fa/setup", requireAuth, setup2FA);
router.post("/2fa/verify", requireAuth, verify2FA);
router.post("/2fa/reset", requireAuth, reset2FA);
router.post("/mfa/login/verify", verifyLoginMFA);

//password-request
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

//Logout
router.post("/logout", logout);

export default router;
