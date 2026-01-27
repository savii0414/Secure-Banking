import SecurityLog from "../models/securityLog.js";

export const createLog = async ({ userId, username, action, ip, userAgent, details }) => {
  try {
    await SecurityLog.create({
      userId,
      username,
      action,
      ip,
      userAgent,
      details,
    });
  } catch (err) {
    console.error("Failed to create security log:", err);
  }
};
