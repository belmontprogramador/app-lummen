// src/service/feed.ts
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

export const FeedAPI = {
  list: async (page = 1, limit = 20, userIsPaid = false) => {
    return api.get(userIsPaid ? "/feed/premium" : "/feed/free", {
      params: { page, limit },
      headers: {
        "x-locale": deviceLocale, // ✅ agora IDENTICO ao profile
      },
    });
  },

  getOne: async (id: string, userIsPaid = false) => {
    return api.get(
      userIsPaid ? `/feed/premium/${id}` : `/feed/free/${id}`,
      {
        headers: {
          "x-locale": deviceLocale, // ✅ agora IDENTICO ao profile
        },
      }
    );
  },
};
