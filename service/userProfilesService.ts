// src/service/userProfilesService.ts
import api from "./api";
import * as Localization from "expo-localization";

const locales = Localization.getLocales();
const deviceLocaleRaw = locales?.[0]?.languageCode || "en";

const deviceLocale =
  deviceLocaleRaw === "pt"
    ? "pt"
    : deviceLocaleRaw === "es"
    ? "es"
    : "en";

export const userProfilesService = {
  // ✅ GET PROFILE COM LOCALE DO DEVICE
  getMyProfile: () =>
    api.get("/user-profiles/me", {
      headers: { "x-locale": deviceLocale },
    }),

  // ✅ UPDATE FREE COM LOCALE DO DEVICE
  updateProfileFree: async (data: any) => {
    try {
      const res = await api.put("/user-profiles/free", data, {
        headers: { "x-locale": deviceLocale },
      });
      return { ok: true, data: res.data };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return { ok: false, error: "unauthorized" };
      }
      return { ok: false, error: "unknown" };
    }
  },

  // ✅ UPDATE PREMIUM COM LOCALE DO DEVICE
  updateProfilePremium: async (data: any) => {
    try {
      const res = await api.put("/user-profiles/premium", data, {
        headers: { "x-locale": deviceLocale },
      });
      return { ok: true, data: res.data };
    } catch (err: any) {
      if (err.response?.status === 403) {
        return { ok: false, error: "unauthorized" };
      }
      return { ok: false, error: "unknown" };
    }
  },

  // ✅ ENUMS TRADUZIDOS PELO IDIOMA DO DEVICE
  getProfileEnums: () =>
    api.get("/user-profiles/enums", {
      headers: { "x-locale": deviceLocale },
    }),
};
