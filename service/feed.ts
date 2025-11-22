// src/service/feed.ts
import api from "./api";

export const FeedAPI = {
  list: async (page = 1, limit = 20, userIsPaid = false) => {
    return api.get(userIsPaid ? "/feed/premium" : "/feed/free", {
      params: { page, limit },
      headers: { "x-locale": "pt" },
    });
  },

  getOne: async (id: string, userIsPaid = false) => {
    return api.get(userIsPaid ? `/feed/premium/${id}` : `/feed/free/${id}`, {
      headers: { "x-locale": "pt" },
    });
  },
};

