import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    /* ---------- MFA (GOOGLE AUTHENTICATOR) ---------- */
    isMfaActive: {
      type: Boolean,
      required: false,
    },
    twoFactorSecret: {
      type: String,
    },
    otpHash: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    /* ---------- ACCOUNT VERIFICATION (REGISTRATION OTP) ---------- */
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpMethod: {
      type: String,
      enum: ["email", "sms"],
    },
    passwordChangedAt: {
      type: Date,
    },
    accStatus: {
      type: String,
      enum: ["ACTIVE", "LOCKED"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Customer"],
      default: "Customer",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
