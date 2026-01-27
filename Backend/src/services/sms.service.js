import Twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMSOTP = async (phone, otp) => {
  await client.messages.create({
    body: `Your OTP is ${otp}. It expires in 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};
