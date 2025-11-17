import api from "./api";
import { PaginationResponse } from "@/types/api";
import { User } from "@/types/user";

export const FeedAPI = {
  list: (page = 1, limit = 20) =>
    api.get<PaginationResponse<User>>("/feed", {
      params: { page, limit },
    }),

  getOne: (id: string) =>
    api.get<User>(`/feed/${id}`),
};
