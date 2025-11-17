// src/service/passwordResetService.ts
import api from "./api";

export const passwordResetService = {
  forgotPassword(email: string) {
    return api.post("/password/forgot-password", { email });
  },

  resetPassword(token: string, newPassword: string) {
    return api.post("/password/reset-password", {
      token,
      newPassword,
    });
  }
};
