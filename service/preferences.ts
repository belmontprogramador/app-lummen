// src/service/preferences.ts
import api from "./api";

export const PreferencesAPI = {
  get: () => api.get("/user-preferences"),

  getOptions: () =>
    api.get("/user-preferences/options", {
      headers: { "x-locale": "pt" }
    }),

  update: async (data: any) => {
    try {
      const res = await api.patch("/user-preferences/premium", data);
      return { ok: true, data: res.data };
    } catch (err: any) {
      if (err.response?.status === 403) {
        // usuário não premium
        return { ok: false, error: "premium_required" };
      }

      return { ok: false, error: "unknown" };
    }
  }
};
