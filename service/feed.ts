import api from "./api";
import { PaginationResponse } from "@/types/api";
import { User } from "@/types/user";
import * as Localization from "expo-localization";
import { AuthContext } from "@/context/AuthContext";

export const FeedAPI = {
  list: async (page = 1, limit = 20, userIsPaid = false) => {
    const locale = Localization.getLocales()[0].languageTag.split("-")[0];

    const endpoint = userIsPaid ? "/feed/premium" : "/feed/free";

    return api.get<PaginationResponse<User>>(endpoint, {
      params: { page, limit, locale },
      headers: { "x-locale": locale },
    });
  },

  getOne: async (id: string, userIsPaid = false) => {
    const locale = Localization.getLocales()[0].languageTag.split("-")[0];

    const endpoint = userIsPaid 
      ? `/feed/premium/${id}` 
      : `/feed/free/${id}`;

    return api.get<User>(endpoint, {
      params: { locale },
      headers: { "x-locale": locale },
    });
  }
};
