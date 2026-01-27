import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, 
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send any email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - email HTML content
 */
export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Ceylon Trust" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

/**
 * Send OTP
 */
export const sendEmailOTP = async (to, otp) => {
  const html = `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`;
  await sendEmail(to, "Account Verification OTP", html);
};

/**
 * Send password reset link
 */
export const sendPasswordResetEmail = async (to, resetLink, username) => {
  const html = `
    <p>Hello ${username},</p>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>This link will expire in 15 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
  `;
  await sendEmail(to, "Password Reset Request", html);
};
