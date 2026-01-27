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
  verifyRegistrationOTP
} from "../controllers/authController.js";

const router = Router();

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

// Registration
router.post("/register", register);

// Registration OTP verification
router.post("/register/verify-otp", verifyRegistrationOTP);

// Login (generates login OTP)
router.post("/login", login);

// Login OTP verification
router.post("/login/verify-otp", verifyLoginOTP);

//Status
router.get("/status", authStatus);

router.post("/2fa/setup", requireAuth, setup2FA);
router.post("/2fa/verify", requireAuth, verify2FA);
router.post("/2fa/reset", requireAuth, reset2FA);

//forgot-password-request
router.post("/forgot-password", forgotPassword);

//reset-password
router.post("/reset-password/:token", resetPassword);

//Logout
router.post("/logout", logout);

export default router;
