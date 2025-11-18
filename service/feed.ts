import api from "./api";
import { PaginationResponse } from "@/types/api";
import { User } from "@/types/user";
import * as Localization from "expo-localization";

export const FeedAPI = {
  list: (page = 1, limit = 20) => {
    const locale = Localization.getLocales()[0].languageTag.split("-")[0];

    return api.get<PaginationResponse<User>>("/feed", {
      params: { page, limit, locale },          // 👈 ENVIA PELA QUERY
      headers: { "x-locale": locale },          // 👈 ENVIA PELO HEADER
    });
  },

  getOne: (id: string) => {
    const locale = Localization.getLocales()[0].languageTag.split("-")[0];

    return api.get<User>(`/feed/${id}`, {
      params: { locale },                       // 👈 ENVIA PELA QUERY
      headers: { "x-locale": locale },          // 👈 ENVIA PELO HEADER
    });
  }
};
