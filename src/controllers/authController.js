import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedpassword,
      isMfaActive: false,
    });
    console.log("New User :", newUser);
    await newUser.save();
    res.status(201).json({ message: " User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error Registering User", message: error });
  }
};

export const login = async (req, res) => {
  console.log("Welcome", req.user.username);
  res
    .status(200)
    .json({
      message: " User Logged in",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
};
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: " User Logged in",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({message:"Unauthorized User"});
  }
};

// export const logout = async (req, res) => {
//     if(!req.user) res.status(401).json({message:"Unauthorized User"});
//     req.logout((err) => {
//         if (err) return res.status(400).json({message:"User not logged in"});
//         res.status(200).json({message:"Logout Successful"});
//     })
// };

export const logout = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }

      // VERY IMPORTANT: clear the session cookie
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });

      return res.status(200).json({ message: "Logout successful" });
    });
  });
};

// export const setup2FA = async (req, res) => {};
// export const verify2FA = async (req, res) => {};
// export const reset2FA = async (req, res) => {};
