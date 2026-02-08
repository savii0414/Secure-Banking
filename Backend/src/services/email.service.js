import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error("SendGrid Email Error:", error.response?.body || error);
    throw error;
  }
};

export const sendEmailOTP = async (to, otp) => {
  const html = `
    <p>Your OTP is <b>${otp}</b>.</p>
    <p>This OTP expires in <b>10 minutes</b>.</p>
  `;
  await sendEmail(to, "Account Verification OTP", html);
};

export const sendPasswordResetEmail = async (to, resetLink, username) => {
  const html = `
    <p>Hello ${username},</p>
    <p>You requested to reset your password.</p>
    <p>
      <a href="${resetLink}">Reset Password</a>
    </p>
    <p>This link expires in 15 minutes.</p>
  `;
  await sendEmail(to, "Password Reset Request", html);
};
