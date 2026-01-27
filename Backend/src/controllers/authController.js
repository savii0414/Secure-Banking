import bcrypt from "bcryptjs";
import User from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import passport from "passport";
import { sendEmailOTP } from "../services/email.service.js";
import { sendSMSOTP } from "../services/sms.service.js";
import { sendPasswordResetEmail } from "../services/email.service.js";
import { createLog } from "../services/log.service.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits

// ------------------ REGISTER ------------------
export const register = async (req, res) => {
  try {
    const { username, password, email, phone, otpMethod } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      await createLog({
        username,
        action: "register-failed",
        details: { reason: "User exists" },
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpHash = await bcrypt.hash(otp, 10);

    if (otpMethod === "email") await sendEmailOTP(email, otp);
    else if (otpMethod === "sms") await sendSMSOTP(phone, otp);
    else return res.status(400).json({ message: "Invalid OTP method" });

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      isMfaActive,
      otpHash,
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      otpMethod: otpMethod,
      isVerified: false,
      passwordChangedAt,
      twoFactorSecret,
    });
    await newUser.save();

    await createLog({
      username,
      action: "register-success",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.status(200).json({ message: `OTP sent to your ${otpMethod}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) return next(err);
      if (!user) {
        await createLog({
          username: req.body.username,
          action: "login-failed",
          details: { reason: info?.message },
          ip: req.ip,
          userAgent: req.get("User-Agent"),
        });
        return res.status(400).json({ message: info?.message });
      }

      // Generate login OTP regardless of user verification
      const otp = generateOTP();
      user.otpHash = await bcrypt.hash(otp, 10);
      user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      await user.save();

      // Send OTP based on the method selected at registration
      if (user.otpMethod === "email") await sendEmailOTP(user.email, otp);
      else if (user.otpMethod === "sms") await sendSMSOTP(user.phone, otp);
      else return res.status(400).json({ message: "Invalid OTP method" });

      await createLog({
        userId: user._id,
        username: user.username,
        action: "login-otp-sent",
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        details: { method: user.otpMethod },
      });

      res.status(200).json({
        message: `OTP sent via ${user.otpMethod}. Verify to complete login.`,
        username: user.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Login failed" });
    }
  })(req, res, next);
};

// ------------------ VERIFY LOGIN OTP ------------------
export const verifyLoginOTP = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      await createLog({
        username,
        action: "login-otp-failed",
        details: { reason: "User not found" },
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otpHash || user.otpExpiresAt < new Date()) {
      await createLog({
        userId: user._id,
        username,
        action: "login-otp-failed",
        details: { reason: "OTP expired or missing" },
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });
      return res.status(400).json({ message: "OTP expired or not generated" });
    }

    const isValid = await bcrypt.compare(otp, user.otpHash);
    if (!isValid) {
      await createLog({
        userId: user._id,
        username,
        action: "login-otp-failed",
        details: { reason: "Invalid OTP" },
        ip: req.ip,
        userAgent: req.get("User-Agent"),
      });
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Clear OTP fields
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Passport login
    req.login(user, async (err) => {
      if (err) {
        return next(err);
        // Pass error to Express error handler
      }

      // security log  — login success
      await createLog({
        userId: user._id,
        username,
        action: "login-success",
        ip: req.ip,
        userAgent: req.get("User-Agent"),
        details: { method: "OTP" },
      });

      // ONLY send response here inside the callback
      res.status(200).json({
        message: "Login successful",
        username: user.username,
      });
    });
  } catch (err) {
    console.error(err);
    // Do NOT send response here if req.login has already called res
    if (!res.headersSent) {
      res.status(500).json({ message: "OTP verification failed" });
    }
  }
};

// ------------------ REGISTRATION OTP VERIFY ------------------
export const verifyRegistrationOTP = async (req, res) => {
  try {
    const { username, otp } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });
    if (user.otpExpiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const isValid = await bcrypt.compare(otp, user.otpHash);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: " User Logged in",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
      accStatus: req.user.accStatus,
      role: req.user.role,
    });
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export const logout = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { _id: userId, username } = req.user;

  req.logout(async (err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    await createLog({
      userId,
      username,
      action: "logout-success",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }

      // clear the session cookie
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });

      return res.status(200).json({ message: "Logout successful" });
    });
  });
};

export const setup2FA = async (req, res) => {
  try {
    const user = req.user;
    var secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.banking.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);

    await createLog({
      userId: user._id,
      username: user.username,
      action: "2fa-setup",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error Setting up 2FA", message: error });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      },
    );
    res
      .status(200)
      .json({ message: "OTP Setup successfully", token: jwtToken });
  } else {
    res.status(400).json({ message: "Invalid" });
  }
};

export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({ message: "OTP reset Succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Error reseting 2FA", message: error });
  }
};

// ------------------ FORGOT PASSWORD ------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    const message = "A reset link has been sent to your registered email";

    if (!user) {
      return res.json({ message });
    }

    // Generate time-limited JWT token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send password reset email using service
    await sendPasswordResetEmail(email, resetLink, user.username);

    await createLog({
      userId: user._id,
      username: user.username,
      action: "password-reset-request",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    return res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------ RESET PASSWORD ------------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Prevent reuse of old reset link
    if (
      user.passwordChangedAt &&
      user.passwordChangedAt.getTime() / 1000 > decoded.iat
    ) {
      return res
        .status(400)
        .json({ message: "This reset link has already been used" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordChangedAt = new Date();
    await user.save();

    await createLog({
      userId: user._id,
      username: user.username,
      action: "password-reset-success",
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });

    return res.json({
      message:
        "Password reset successful. If your account is locked, contact admin to unlock it.",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }
};
