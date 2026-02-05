import api from "./api";

export const register = async (username, password, email, phone, otpMethod) => {
  return await api.post("/auth/register", {
    username,
    password,
    email,
    phone,
    otpMethod,
  });
};

export const login = async (username, password) => {
  return await api.post(
    "/auth/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    },
  );
};

export const authStatus = async () => {
  return await api.get("/auth/status", {
    withCredentials: true,
  });
};

export const logout = async () => {
  return await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );
};

export const setup2FA = async () => {
  return await api.post(
    "/auth/2fa/setup",
    {},
    {
      withCredentials: true,
    },
  );
};

export const verify2FA = async (token) => {
  return await api.post(
    "/auth/2fa/verify",
    {token},
    {
      withCredentials: true,
    },
  );
};

export const reset2FA = async (token) => {
  return await api.post(
    "/auth/2fa/reset",
    { token },  
    {
      withCredentials: true,
    },
  );
};

export const verifyLoginOTP = async (username, otp) => {
  return await api.post("/auth/login/verify-otp", {
    username,
    otp,
  },
 { withCredentials: true });
};

export const verifyRegistrationOTP = async (username, otp) => {
  return await api.post("/auth/register/verify-otp", {
    username,
    otp,
  });
};

export const forgotPassword = async (username) => {
  return await api.post("/auth/forgot-password", { username });
};

export const resetPassword = async (token, newPassword) => {
  return await api.post(`/auth/reset-password/${token}`, {
    newPassword,
  });
};
