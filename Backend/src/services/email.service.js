import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT, // 465 for secure SMTP
  secure: true,                 // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Fixes some Render SSL issues
  },
});

export const sendEmailOTP = async (to, otp) => {
  const html = `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`;
  await transporter.sendMail({
    from: `"Ceylon Trust" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Account Verification OTP",
    html,
  });
};

export const sendPasswordResetEmail = async (to, resetLink, username) => {
  const html = `
    <p>Hello ${username},</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link expires in 15 minutes.</p>
  `;
  await transporter.sendMail({
    from: `"Ceylon Trust" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    html,
  });
};
