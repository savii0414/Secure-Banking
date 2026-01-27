import mongoose from "mongoose";

const securityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  username: { type: String },
  action: { type: String, required: true }, // e.g., "login-success", "otp-failed"
  ip: { type: String },
  userAgent: { type: String },
  details: { type: Object }, // optional extra info
  createdAt: { type: Date, default: Date.now },
});

const SecurityLog = mongoose.model("SecurityLog", securityLogSchema);
export default SecurityLog;
