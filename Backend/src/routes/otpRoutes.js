import { Router } from "express";
import { verifyRegistrationOTP, verifyRegistrationOTP } from "../controllers/otpController.js";

const router = Router();

// Send OTP (email or SMS)
router.post("/register/send-otp", verifyRegistrationOTP);

// Verify OTP
router.post("/register/verify-otp", verifyRegistrationOTP);

export default router;
