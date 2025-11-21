// src/service/userProfilesService.ts
import api from "./api";

export const userProfilesService = {
  getMyProfile: () =>
    api.get("/user-profiles/me", {
      headers: { "x-locale": "pt" },
    }),

  updateProfileFree: async (data: any) => {
    try {
      const res = await api.put("/user-profiles/free", data, {
        headers: { "x-locale": "pt" },
      });
      return { ok: true, data: res.data };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return { ok: false, error: "unauthorized" };
      }
      return { ok: false, error: "unknown" };
    }
  },

  updateProfilePremium: async (data: any) => {
    try {
      const res = await api.put("/user-profiles/premium", data, {
        headers: { "x-locale": "pt" },
      });
      return { ok: true, data: res.data };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return { ok: false, error: "unauthorized" };
      }
      return { ok: false, error: "unknown" };
    }
  },

  getProfileEnums: () =>
    api.get("/user-profiles/enums", {
      headers: { "x-locale": "pt" },
    }),
};
