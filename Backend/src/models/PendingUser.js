import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  otpHash: String,
  otpExpiresAt: Date,
  otpMethod: String,
});

export default mongoose.model("PendingUser", pendingUserSchema);
